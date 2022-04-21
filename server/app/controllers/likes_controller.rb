# frozen_string_literal: true

class LikesController < ApplicationController
  before_action :authenticate_user!, only: %i[create destroy]

  def index
    like = advert.likes.where(user_id: current_user.try(:id)).first 
    render json: { message: like.try(:id), amount: advert.likes.size }
  end

  def create
    like = advert.likes.new(user_id: current_user.id)
    if like.valid?
      like.save
      current_user.likes << like
      render json: { message: I18n.t("liked"), amount: advert.likes.size, id: like.id }
    else
      wrond_message
    end
  end

  def destroy
    like = advert.likes.where(id: params[:id]).first
    if like.present?
      like.destroy()
      render json: { message: I18n.t("unliked"), amount: advert.likes.size }
    else
      wrond_message
    end
  end

  private

  def advert_params
    params.permit(:advert_id, :id)
  end

  def advert
    Advert.find(advert_params[:advert_id])
  end

  def wrond_message
    render json: { message: I18n.t("wrongway"), amount: advert.likes.size }
  end
  
  def liked?
    !advert.likes.where(user_id: current_user.try(:id)).blank?
  end
end
