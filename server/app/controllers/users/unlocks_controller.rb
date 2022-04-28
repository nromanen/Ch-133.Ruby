# frozen_string_literal: true

module Users
  class UnlocksController < Devise::UnlocksController
    def show
      self.resource = resource_class.unlock_access_by_token(params[:unlock_token])
      yield resource if block_given?

      respond_with_navigational(resource) { redirect_to after_unlock_path_for(resource), allow_other_host: true }
    end

    protected
      def after_unlock_path_for(resource)
        "#{ENV["FRONT_SIGN_IN"]}"
      end
  end
end
