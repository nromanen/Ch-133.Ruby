# frozen_string_literal: true

class LikesController < ApplicationController
  before_action :authenticate_user!, only: %i[create destroy]

  def index
    render json: { message: self.liked? }
  end
  
  def create
    like = advert.likes.new(user_id: current_user.id)
    if like.valid?
      like.save
      current_user.likes << like
      render json: { message: "Was liked!" }
    else
      wrond_message
    end
  end

  def destroy
    like = advert.likes.where(user_id: current_user.id).first
    if self.liked?
      like.destroy()
      render json: { message: "Was unliked!" }
    else
      wrond_message
    end
  end

  def amount
    render json: { message: advert.likes.size }
  end

  private

  def advert_params
    params.permit(:id)
  end

  def advert
    Advert.find(advert_params[:id])
  end

  def wrond_message
    render json: { message: "Something went wrong" }
  end

  def liked?
    !advert.likes.where(user_id: current_user.id).blank? if current_user
  end
end
