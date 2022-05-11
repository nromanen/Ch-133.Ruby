class UserInfosController < ApplicationController
  before_action :authenticate_user!,
                only: [:update]

  def show
    if User.exists?(params[:user_id])
      user = User.find(params[:user_id])
      show_user_info = user.user_info
      if show_user_info.nil?
        render json: { message: I18n.t("infoNotExist") }, status: 404
      else
        render json: { info: UserInfosSerializer.new(show_user_info).as_json }, status: 200
      end
    else
      render json: { message: I18n.t("userNotExist") }, status: 404
    end
  end

  def update
    user = current_user

    if user.user_info.nil?
      user_inf = user.create_user_info(user_info_params)
      attach_img
      if user_inf.save
        render json: { info: UserInfosSerializer.new(user.user_info).as_json }, status: 200
      else
        render json: user_inf.errors.full_messages, status: :unprocessable_entity
      end
    else
      if User.find(params[:user_id]).id != user.user_info.user_id
        render json: { message: I18n.t("userInfoValidError") }, status: 403
      else
        if user.user_info.update(user_info_params)
          attach_img
          render json: { info: UserInfosSerializer.new(user.user_info).as_json }, status: 200
        else
          render json: user.user_info.errors.full_messages, status: :unprocessable_entity
        end
      end
    end

  end

  def attach_img
    unless params[:image].nil?
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new((Base64.decode64(params[:image][2]))),
        filename: params[:image][1],
        content_type: params[:image][0],)
      current_user.user_info.image.attach(blob)
    end
  end

  private
  def user_info_params
    params.require(:user_info).permit(
      :first_name,
      :last_name,
      :phone,
      :image
    )
  end

end