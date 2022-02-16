Ruby version - 3.0.3
Rails version -  7.0.1
Postgres version - 14

For using project:
- $git clone https://github.com/nromanen/Ch-133.Ruby.git
- $cd server
- $bundle install
- put password in file "database.yml"
- $bundle exec rake secret
- copy key -> $EDITOR=nano rails credentials:edit -> add to file
  devise:
  jwt_secret_key: <rake secret key>
- $rails db:create and $rails db:migrate

