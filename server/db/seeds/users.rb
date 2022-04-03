connection = ActiveRecord::Base.connection()
@adminRole = Role.where(name: 'Admin').first&.id

User.create!(
  password: ENV["USER_PASSWORD"],
  email: ENV["USER_EMAIL"],
  nick_name: "seedUser",
  password_confirmation: ENV["USER_PASSWORD"]
)

User.create!(
  password: ENV["ADMIN_PASSWORD"],
  email: ENV["ADMIN_EMAIL"],
  nick_name: "admin",
  password_confirmation: ENV["ADMIN_PASSWORD"]
)

comands = [
  "UPDATE \"users\" SET \"confirmed_at\"='2022-03-22 17:19:40.342358' WHERE \"nick_name\"='seedUser';",
  "UPDATE \"users\" SET \"confirmed_at\"='2022-03-22 17:19:40.342358' WHERE \"nick_name\"='admin';",
  "UPDATE \"users\" SET \"role_id\"='#{@adminRole}' WHERE \"nick_name\"='admin';"
]

comands.each do |i|
  connection.execute(i)
end
