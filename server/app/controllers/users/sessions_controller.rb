# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json

    def new
      self.resource = resource_class.new(sign_in_params)
      clean_up_passwords(resource)
      yield resource if block_given?
      respond_with(resource, serialize_options(resource), unconfirmed: user_is_but_unconfirmed?)
    end

    def create # ok
      self.resource = warden.authenticate!(auth_options)
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
      respond_with resource, location: after_sign_in_path_for(resource), unconfirmed: user_is_but_unconfirmed?
    end

    private
      def respond_with(_resource, _opts = {}, unconfirmed) 
        unconfirmed = unconfirmed[:unconfirmed]
        if current_user
          render json: {"token": request.env["warden-jwt_auth.token"]}, status: :ok
        else
          if unconfirmed
            render json: { message: I18n.t("unconfirmed") }, status: :unprocessable_entity
          elsif unconfirmed.nil?
            render json: { message:  I18n.t("noauth") }, status: :unauthorized
          else
            render json: { message: I18n.t("wronglogin") }, status: :unprocessable_entity
          end
        end
      end

      def respond_to_on_destroy
        log_out_success && return if current_user

        log_out_failure
      end

      def log_out_success
        render json: { message: I18n.t("success") }, status: :ok
      end

      def log_out_failure
        render json: { message: I18n.t("wrongway") }, status: :unauthorized
      end

      def user_is_but_unconfirmed?
        if params.has_key?(:user)
          user = User.find_for_authentication(email: params[:user][:email])
          password = user.try(:valid_password?, params[:user][:password])
          if user.present? && user.confirmed_at.blank?
            true
          else
            false
          end
        end
      end 
  end
end
