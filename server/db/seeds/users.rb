connection = ActiveRecord::Base.connection()
@adminRole = Role.where(name: 'Admin').first&.id
admin_nick = 'admin'
user_nick = 'seedUser'

User.create!(
  password: ENV["USER_PASSWORD"],
  email: ENV["USER_EMAIL"],
  nick_name: user_nick,
  password_confirmation: ENV["USER_PASSWORD"]
)

User.create!(
  password: ENV["ADMIN_PASSWORD"],
  email: ENV["ADMIN_EMAIL"],
  nick_name: admin_nick,
  password_confirmation: ENV["ADMIN_PASSWORD"]
)

User.where(nick_name: admin_nick).first&.update(confirmed_at: 5.days.ago)
User.where(nick_name: user_nick).first&.update(confirmed_at: 5.days.ago)
