class UserInfosController < ApplicationController
  before_action :authenticate_user!,
                only: [:index, :update, :create]

  def index
    show_user_info = current_user.user_info
    render json: show_user_info.to_json(:only => [ :id, :first_name,
                                                   :last_name, :phone, :user_id ])
  end

  def show
    if User.exists?(params[:id])
      user = User.find(params[:id])
      show_user_info = user.user_info
      render json: show_user_info.to_json(:only => [ :id, :first_name,
                                                     :last_name, :phone, :user_id ])
    else
      render json: { message: "Info doesn't exist" }, status: 404
    end
  end

  def create
    user = current_user
    user_info = user.build_user_info(create_user_info_params)
    if user_info.save
      render json: user_info, status: :created
    else
      render json: user_info.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    user = current_user
    user_inf = current_user.user_info
    if user.id != user_inf.user_id
      if user_inf.update(update_user_info_params)
        render json: user_inf, status: 200
      else
        render json: user_inf.errors.full_messages, status: :unprocessable_entity
      end
    else
      render json: { message: "U have no rights or info doesn't exist" }, status: 403
    end
  end

  def create_user_info_params
    params.require(:user_info).permit(
      :first_name,
      :last_name,
      :phone
    )
  end

  def update_user_info_params
    params.require(:user_info).permit(
      :first_name,
      :last_name,
      :phone
    )
  end

end
