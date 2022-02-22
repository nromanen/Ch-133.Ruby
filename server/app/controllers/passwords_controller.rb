# frozen_string_literal: true

class PasswordsController < Devise::PasswordsController
  before_action :require_no_authentication
  before_action :token_valid?, only: [:update]

  def create
    user = User.find_by(params[user: :email])
    user.send_reset_password_instructions
    if successfully_sent?(user) == true
      render json: { message: "Reset instruction sent" }, status: :ok
    else
      render json: { message: "Can't send reset instructions" }, status: :bad_request
    end
  end

  def update
    if @user.update(reset_params)
      render json: @user, status: :ok
    else
      render json: @user.errors.full_message, status: :bad_request
    end
  end

  private
    def token_valid?
      @user = User.find_by(params[user: :reset_password_token])
      if @user.reset_password_token.present?
        nil
      else
        render json: { message: "Reset period expired" }, status: :forbidden
      end
    end

    def reset_params
      params.permit(
        :password,
        :password_confirmation
      )
    end
end
