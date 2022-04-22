FactoryBot.define do

  factory :category do
    name { "Sport" }
  end

  factory :user do |user|
    user.nick_name {'Testuser'}
    user.email { 'testuser@gmail.com' }
    user.password { 'Qwerty123' }
    user.password_confirmation {'Qwerty123'}
  end

end
