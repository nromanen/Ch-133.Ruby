connection = ActiveRecord::Base.connection()
@roleUser = Role.create(name: "User")
@roleAdmin =  Role.create(name: "Admin")
User.create(
  password: ENV["USER_PASSWORD"],
  email: ENV["USER_EMAIL"],
  nick_name: "seedUser"
)
User.create(
  password: ENV["ADMIN_PASSWORD"],
  email: ENV["ADMIN_EMAIL"],
  nick_name: "admin"
)

comands = [
  "UPDATE \"users\" SET \"confirmed_at\"='2022-03-22 17:19:40.342358' WHERE \"nick_name\"='seedUser';",
  "UPDATE \"users\" SET \"confirmed_at\"='2022-03-22 17:19:40.342358' WHERE \"nick_name\"='admin';",
  "UPDATE \"users\" SET \"role_id\"='#{@roleAdmin.id}' WHERE \"nick_name\"='admin';"
]

comands.each do |i|
   connection.execute(i)
end