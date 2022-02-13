# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json

    private
      def respond_with(_resource, _opts = {})
        if current_user.nil?
          render json: {
            message: "Wrong email or password"
          }, status: :unprocessable_entity
        else
          render json: request.env["warden-jwt_auth.token"], status: :ok
        end
      end

      def respond_to_on_destroy
        log_out_success && return if current_user

        log_out_failure
      end

      def log_out_success
        render json: { message: "You are logged out." }, status: :ok
      end

      def log_out_failure
        render json: { message: "Hmm nothing happened." }, status: :unauthorized
      end
  end
end
