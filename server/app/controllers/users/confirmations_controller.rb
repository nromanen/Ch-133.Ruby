# frozen_string_literal: true

module Users
  class ConfirmationsController < Devise:: ConfirmationsController
    def show
      self.resource = resource_class.confirm_by_token(params[:confirmation_token])
      yield resource if block_given?

      respond_with_navigational(resource) { redirect_to after_confirmation_path_for(resource_name, resource) }
    end

    protected
      def after_confirmation_path_for(resource_name, resource)
        "#{ENV["FRONT_SIGN_IN"]}"
      end
  end
end
