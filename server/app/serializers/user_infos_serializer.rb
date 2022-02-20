class UserInfosSerializer < ActiveModel::Serializer
  attributes  :first_name, :last_name, :phone, :user_id, :id
end