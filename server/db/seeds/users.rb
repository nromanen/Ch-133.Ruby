connection = ActiveRecord::Base.connection()
@adminRole = connection.execute("SELECT id FROM roles WHERE \"name\"='Admin'")
User.create(
  password: ENV["USER_PASSWORD"],
  email: ENV["USER_EMAIL"],
  nick_name: "seedUser",
  password_confirmation: ENV["USER_PASSWORD"]
)
User.create(
  password: ENV["ADMIN_PASSWORD"],
  email: ENV["ADMIN_EMAIL"],
  nick_name: "admin",
  password_confirmation: ENV["ADMIN_PASSWORD"]
)
comands = [
  "UPDATE \"users\" SET \"confirmed_at\"='2022-03-22 17:19:40.342358' WHERE \"nick_name\"='seedUser';",
  "UPDATE \"users\" SET \"confirmed_at\"='2022-03-22 17:19:40.342358' WHERE \"nick_name\"='admin';",
  "UPDATE \"users\" SET \"role_id\"='#{@adminRole.entries[0]['id']}' WHERE \"nick_name\"='admin';"
]

comands.each do |i|
   connection.execute(i)
end
#UPDATE "users" SET "confirmed_at"='2022-03-22 17:19:40.342358' WHERE "nick_name"='seed0';
#SELECT id FROM roles WHERE "name"='Admin'
