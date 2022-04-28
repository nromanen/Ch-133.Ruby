# frozen_string_literal: true

class SubscribesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_subscriber

  def subscribed?
    render json: @subscribe.subscribed, status: :ok
  end

  def update
    if @subscribe.update(subscribe_params)
      render json: { message: I18n.t("updated", name: "subscribe") }, status: :created
    else
      render json: @subscribe.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def set_subscriber
    @subscribe = Subscribe.find_by(user_id: current_user.id)
  end

  def subscribe_params
    params.require(:subscribe).permit(:subscribed)
  end

end
