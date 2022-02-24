# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def create
      user = User.create(user_params)
      respond_with(user)
    end

    private
      def user_params
        params.require(:user).permit(
          :password,
          :email,
          :nick_name
        )
      end

      def respond_with(user, _opts = {})
        register_success && return if user.persisted?

        register_failed(user)
      end

      def register_success
        render json: { message: "Signed up successfully. Please confirm your email." }
      end

      def register_failed(user)
        render json: { message: "Data is not valid, please, change" }, status: :unprocessable_entity
      end
  end
end
