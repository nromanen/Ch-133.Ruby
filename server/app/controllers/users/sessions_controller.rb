# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json

    private
      def respond_with(_resource, _opts = {})
        unconfirmed = params[:user]
        if unconfirmed.nil?
          render json: {
            message: I18n.t("unconfirmed")
          }, status: :unprocessable_entity
        elsif current_user.nil?
          render json: {
            message: I18n.t("wronglogin")
          }, status: :unprocessable_entity
        else
          render json: {"token": request.env["warden-jwt_auth.token"]}, status: :ok
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
  end
end
