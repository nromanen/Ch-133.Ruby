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
        # render json: show_user_info, status: :ok, serializer: UserInfosSerializer
        render json: { info: UserInfosSerializer.new(show_user_info).as_json }
      end
    else
      render json: { message: I18n.t("userNotExist") }, status: 404
    end
  end

  def update
    user = current_user

    if user.user_info.nil?
      p '------ use block1'
      p user_info_params
      user_inf = user.create_user_info(user_info_params)

      p "----------> img"
      p params[:image]
      p !params[:image].nil?
      p "----------> img"
      if !params[:image].nil?
        blob = ActiveStorage::Blob.create_and_upload!(
            io: StringIO.new((Base64.decode64(params[:image][2]))),
            filename: params[:image][1],
            content_type: params[:image][0],)
        user_inf.image.attach(blob)
      end
      if user_inf.save

        render json: user_inf, status: 200
      else
        render json: user_inf.errors.full_messages, status: :unprocessable_entity
      end
    else
      p '------ use block2'
      if user.id == user.user_info.user_id

        if user.user_info.update(user_info_params)
          p '----------------------------'
          p user_info_params
          if !params[:image].nil?
            blob = ActiveStorage::Blob.create_and_upload!(
                io: StringIO.new((Base64.decode64(params[:image][2]))),
                filename: params[:image][1],
                content_type: params[:image][0],)
            user.user_info.image.attach(blob)
          end

          # render json: user.user_info, status: 200, serializer: UserInfosSerializer
          render json: { info: UserInfosSerializer.new(user.user_info).as_json }
        else
          render json: user.user_info.errors.full_messages, status: :unprocessable_entity
        end
      else
        render json: { message: I18n.t("userInfoValidError") }, status: 403
      end
    end

  end

  private
    # def user_info_params
    #   params.permit(:first_name,
    #                 :last_name,
    #                 :phone,
    #                 :image,
    #                 :user_id)
    # end
    def user_info_params
      params.require(:user_info).permit(
        :first_name,
        :last_name,
        :phone,
        :image
      )
    end

end
