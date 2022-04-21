# frozen_string_literal: true

class LikesController < ApplicationController
  before_action :authenticate_user!
  
  def create
    like = advert.likes.new(user_id: current_user.id)
    if like.valid?
      like.save
      current_user.likes << like
      render json: { message: "Was liked!", amount: advert.likes.size }
    else
      wrond_message
    end
  end

  def destroy
    like = advert.likes.where(user_id: current_user.id).first 
    if self.liked?
      like.destroy()
      render json: { message: "Was unliked!", amount: advert.likes.size }
    else
      wrond_message
    end
  end

  private

  def advert_params
    params.permit(:id)
  end

  def advert
    Advert.find(advert_params[:id])
  end

  def wrond_message
    render json: { message: "Something went wrong", amount: current_user }
  end
  
  def liked?
    !advert.likes.where(user_id: current_user.id).blank? if current_user
  end
end
