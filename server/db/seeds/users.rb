
admin_id = Role.where(name: 'Admin').first&.id
admin = User.new(
  password: ENV["ADMIN_PASSWORD"],
  email: ENV["ADMIN_EMAIL"],
  nick_name: "admin",
  password_confirmation: ENV["ADMIN_PASSWORD"]
);

if admin.valid? 
  admin.save
  admin.update_columns(role_id: admin_id, confirmed_at: Time.now.utc)
end


