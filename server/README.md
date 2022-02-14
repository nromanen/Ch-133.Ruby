Ruby version - 3.0.0
Rails version -  7
Postgres version - 12-13-14

For using project:
- clone repository
- open folder "server" in terminal
- run bundle install
- change password in file "database.yml"
- comment
  "config.jwt do |jwt|
  jwt.secret = Rails.application.credentials.devise[:jwt_secret_key]
  end" in file "devise.rb"
- run in terminal "rails db:create" and "rails db:migrate"
#- write this in file "devise.rb" if you have problems with
#config.jwt:
# config.jwt do |jwt|
#   jwt.secret = ENV['DEVISE_JWT_SECRET_KEY']
#end
