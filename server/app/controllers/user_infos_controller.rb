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
        render json: show_user_info, status: :ok, serializer: UserInfosSerializer
      end
    else
      render json: { message: I18n.t("userNotExist") }, status: 404
    end
  end

  def update
    user = current_user

    if user.user_info.nil?
      user_inf = user.create_user_info(user_info_params)
      if user_inf.save
        render json: user_inf, status: 200, serializer: UserInfosSerializer
      else
        render json: user_inf.errors.full_messages, status: :unprocessable_entity
      end
    else
      if user.id == user.user_info.user_id
        if user.user_info.update(user_info_params)
          render json: user.user_info, status: 200, serializer: UserInfosSerializer
        else
          render json: user.user_info.errors.full_messages, status: :unprocessable_entity
        end
      else
        render json: { message: I18n.t("userInfoValidError") }, status: 403
      end
    end


  end

  def user_info_params
    params.require(:user_info).permit(
      :first_name,
      :last_name,
      :phone
    )
  end

end
