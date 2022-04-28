class UserSerializer < ActiveModel::Serializer
    attributes :id, :nick_name, :email, :role_name, :created_at

    def role_name
        self.object.role_name
    end
end
