# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!, only: %i[update]
  rescue_from Pundit::NotAuthorizedError, :with => :handle_exception

  def index
    @users = User.all.sort_by{ |user| ActiveSupport::Inflector.transliterate(user.nick_name.downcase) }
    render json: @users
  end

  def update
    @user = User.find(params[:id])
    authorize @user
    if @user&.change_role(params[:role_name])
      render json: { message: I18n.t("rolechange") }, status: :ok
    else
      render json: { message: I18n.t("lastadmin") }, status: :unprocessable_entity
    end
  end

  private
  def advert_params
    params.permit(:id, :role_name)
  end

  def handle_exception(error)
    render json: { message: I18n.t("wrongrole") }, status: :unauthorized
  end
end
