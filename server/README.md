Ruby version - 3.0.3
Rails version -  7.0.1
Postgres version - 14

For using project:
- clone the repository
- $ cd server
- $ bundle install
- $ bundle exec rake secret
- $ EDITOR=nano rails credentials:edit
    devise:
      jwt_secret_key: <generated key>
- $ rails db:create
- $ rails db:migrate
- $ rails db:seed
- $ rails s
Don't forget to put your environment variables in .env.local.example!
