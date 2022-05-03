
require "active_support/core_ext/integer/time"

Rails.application.configure do

  config.cache_classes = false
  config.eager_load = false
  config.consider_all_requests_local = true
  config.server_timing = true

  if Rails.root.join("tmp/caching-dev.txt").exist?
    config.cache_store = :memory_store
    config.public_file_server.headers = {
      "Cache-Control" => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  config.active_storage.service = :cloudinary
  config.action_mailer.default_url_options = { host: "localhost", port: 3000 }

  config.action_mailer.perform_caching = false

  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.asset_host = 'http://localhost:3000'
  config.action_mailer.default charset: "utf-8"
  config.action_mailer.perform_deliveries = true
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    user_name: "#{ENV["SMTP_EMAIL"]}",
    password: "#{ENV["SMTP_EMAIL_PASSWORD"]}",
    domain: "localhost:3000",
    address: "smtp.gmail.com",
    port: "587",
    authentication: :plain,
    enable_starttls_auto: true
  }

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise exceptions for disallowed deprecations.
  config.active_support.disallowed_deprecation = :raise

  # Tell Active Support which deprecation messages to disallow.
  config.active_support.disallowed_deprecation_warnings = []

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Raises error for missing translations.
  # config.i18n.raise_on_missing_translations = true

  # Annotate rendered view with file names.
  # config.action_view.annotate_rendered_view_with_filenames = true

  # Uncomment if you wish to allow Action Cable access from any origin.
  # config.action_cable.disable_request_forgery_protection = true

  Rails.application.routes.default_url_options = { host: "http://localhost:3000" }
end
