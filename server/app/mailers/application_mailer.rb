# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "admin"
  layout "mailer"
end
