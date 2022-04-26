# frozen_string_literal: true

class SubscribesController < ApplicationController
  before_action :authenticate_user!

  def subscribed?
    @subscribe = Subscribe.find_by(user_id: current_user.id, advert_id: params[:advert_id])
    unless @subscribe.nil?
      render json: true, status: :ok
    end
  end

  def create
    @subscribe = current_user.subscribes.new(subscribe_params)
    if @subscribe.save
      render json: { message: I18n.t("created", name: "subscribe") }, status: :created
    else
      render json: @subscribe.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @subscribe = Subscribe.find_by(user_id: current_user.id, advert_id: params[:advert_id])
    @subscribe.destroy
  end

  private

  def subscribe_params
    params.require(:subscribe).permit(:advert_id)
  end

end
