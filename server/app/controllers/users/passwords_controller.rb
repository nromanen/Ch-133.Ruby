# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    before_action :require_no_authentication
    before_action :reset_path, only: [ :edit]

    def create
      user = User.find_by(user_params)
      user.send_reset_password_instructions
      if successfully_sent?(user)
        render json: { message: I18n.t("reset_password_email_send")}, status: :ok
      else
        render json: { message: I18n.t("reset_password_email_not_send") }, status: :bad_request
      end
    end

    def edit
      redirect_to reset_path
    end

    def update
      token = params[:reset_password_token].to_s
      @user = User.with_reset_password_token(token)
      if @user.persisted?
        if @user.reset_password_period_valid?
          @user.update(reset_params)
          render json: { message: I18n.t("reset_password_success")}, status: :ok
        else
          render json: @user.errors.full_message, status: :unprocessable_entity
        end
      else
        render json: { message: I18n.t("reset_password_failed")}, status: :forbidden
      end
    end

    def reset_path
      @token = params[:reset_password_token].to_s
      redirect_to "#{ENV["FRONT_RESET_PASSWORD"]}" + "/#{@token}"
    end

  private
     def user_params
      params.require(:user).permit(
        :email
      )
    end

    def reset_params
      params.require(:user).permit(
        :password,
        :password_confirmation
      )
    end
  end
end
