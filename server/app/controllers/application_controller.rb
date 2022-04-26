# frozen_string_literal: true

class ApplicationController < ActionController::API
  include Pundit::Authorization
  before_action :set_locale

  private
    def set_locale
      # locale = locale_from_url || I18n.default_locale
      # use this with routes.rb: scope "(:locale)", locale /#{I18n.available_locales.join("|")}/ do
      I18n.locale = request.headers["X-Lang"] || I18n.default_locale
    end

    def locale_from_url
      locale = params[:locale]
      return locale if I18n.available_locales.map(&:to_s).include?(locale)
    end

    def default_url_options(options = {})
      { locale: I18n.locale }
    end
end
