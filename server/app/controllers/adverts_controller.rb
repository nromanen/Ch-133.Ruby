# frozen_string_literal: true

class AdvertsController < ApplicationController

  before_action :authenticate_user!, only: %i[update destroy create liked]

  # POST /adverts
  def create
    @advert = current_user.adverts.new(advert_params)
    authorize @advert
    if @advert.save
      render json: @advert
    else
      render json: current_user, status: :unprocessable_entity
    end
  end

  # GET /adverts
  def index
    @adverts = Advert.all.includes(:user).order(created_at: :desc)
    authorize @adverts
    render json: { adverts: AdvertsSerializer.new(@adverts).as_json }
  end

  # GET /adverts/1
  def show
    @advert = Advert.find(params[:id])
    authorize @advert
    render json: { advert: AdvertSerializer.new(@advert).as_json }
  end

  # PATCH/PUT /averts/1
  def update
    @advert = Advert.find(params[:id])
    authorize @advert
    if advert.update(advert_params)
      render json: @advert, serializer: AdvertSerializer
    else
      render json: @advert.errors, status: :unprocessable_entity
    end
  end

  # DELETE /adverts/1
  def destroy
    @advert = Advert.find(params[:id])
    authorize @advert
    @advert.destroy if @advert.present?
    render json: { message: "Post has been deleted successfully." }
  end

  def liked
    @advert = Advert.find(params[:id])
    was_liked = !@advert.likes.where(user_id: current_user.id).blank? if current_user
    render json: {  message: was_liked, amount: @advert.likes.size }
  end

  private
    def advert_params
      params.permit(:title, :text, :category_id, :image)
    end
end