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
        register_success(user) && return if user.persisted?

        register_failed(user)
      end

      def register_success(user)
        render json: { message: I18n.t('created', name: user.nick_name) }
      end

      def register_failed(user)
        render json: user.errors.full_messages, status: :unprocessable_entity
      end
  end
end
