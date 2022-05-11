# frozen_string_literal: true

class SubscribesController < ApplicationController
  before_action :authenticate_user!#, except: %i[ pdf_info ]
  before_action :set_subscriber#, except: %i[ pdf_info ]

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

  def pdf_info
    @user = current_user
    @requested_at = @user.subscribe.pdf_requested_at
    if (@user.subscribe.pdf_requested_at).nil? || @user.subscribe.pdf_requested_at < Time.now-1.day
      puts @requested_at
      @types = params[:types]
      UserAdvertsMailer.pdf_info_send(@user, @types).deliver_now
      @subscribe.update(pdf_requested_at: Time.now)
      render json: { message: "success"}, status: :ok
    else
      render json: { message: (@requested_at + 1.day) }, status: :service_unavailable
    end
  end

  private

  def set_subscriber
    @subscribe = Subscribe.find_by(user_id: current_user.id)
  end

  def subscribe_params
    params.permit(:subscribed, :types)
  end

end
