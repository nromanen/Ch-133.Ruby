class UserInfosSerializer
  include FastJsonapi::ObjectSerializer

  attributes :first_name, :last_name, :phone, :user_id, :image, :image_url, :id

  def as_json
    super()
  end
end