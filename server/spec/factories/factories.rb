FactoryBot.define do

  factory :category do
    name { "Sport" }
  end

  factory :role do
    name {'Admin'}
  end

  factory :user do
    nick_name {'Testuser'}
    email { 'testuser@gmail.com' }
    password { 'Qwerty123' }
    password_confirmation {'Qwerty123'}
  end

end
