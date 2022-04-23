# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!, only: %i[update]
  rescue_from Pundit::NotAuthorizedError, :with => :handle_exception

  def index
    @users = User.all
    render json: @users
  end

  def update
    @user = User.find(params[:id])
    @role = Role.find_by(name: params[:role_name])
    authorize @user
    if @role.present?
      change_role(@user, @role)
    end
  end

  private
  def advert_params
    params.permit(:id, :role_name)
  end

  def handle_exception(error)
    render json: { message: I18n.t("wrongrole") }, status: :unauthorized
  end

  def admin_check
    if params[:role_name] == current_user.role_name
      User.where(role_id: current_user.role_id).count > 1
    else
      true
    end
  end

  def change_role(user, role)
    if admin_check
      user.update_attribute(:role_id, role)
      user.role = role
      render json: { message: I18n.t("rolechange") }, status: :ok
    else
      render json: { message: I18n.t("wrongrole") }, status: :unauthorized
    end
  end
end
