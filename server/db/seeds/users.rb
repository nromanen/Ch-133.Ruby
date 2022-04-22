admin_nick = 'admin'
user_nick = 'seedUser'
admin_id = Role.where(name: 'Admin').first&.id

User.create!(
  password: ENV["ADMIN_PASSWORD"],
  email: ENV["ADMIN_EMAIL"],
  nick_name: admin_nick,
  password_confirmation: ENV["ADMIN_PASSWORD"]
);

User.where(nick_name: admin_nick).first&.update_columns(role_id: admin_id, confirmed_at: Time.now.utc)
User.where(nick_name: user_nick).first&.update_attribute(:confirmed_at, Time.now.utc);
