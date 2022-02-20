# frozen_string_literal: true

class AdvertsController < ApplicationController
  before_action :authenticate_user!, only: %i[update destroy create]

  # POST /adverts
  def create
    @advert = current_user.adverts.new(advert_params)
    authorize @advert
    if @advert.save
      render json: @advert
    else
      render json: @advert.errors, status: :unprocessable_entity
    end
  end

  # GET /adverts
  def index
    @adverts = Advert.all.includes(:user).order(created_at: :desc).limit(20)
    authorize @adverts
    render json: @adverts
  end

  # GET /adverts/1
  def show
    @advert = Advert.find(params[:id])
    authorize @advert
    render json: @advert
  end

  def myposts
    @user = current_user
    @adverts = @user.adverts
    render json: @adverts
  end

  def like
    @advert = Advert.find(params[:id])
    Like.create(user_id: current_user.id, advert_id: @advert.id)
    render json: @advert
  end

  def posts
    @user = User.find(params[:id])
    @posts = @user.adverts
    render json: @adverts
  end

  # PATCH/PUT /averts/1
  def update
    authorize @advert
    if advert.update(advert_params)
      render json: @advert
    else
      render json: @advert.errors, status: :unprocessable_entity
    end
  end

  # DELETE /adverts/1
  def destroy
    authorize @advert
    @advert = Advert.find(params[:id])
    @advert.destroy if @advert.present?
    render json: { message: "Post has been deleted successfully." }
  end

  private
    def advert_params
      params.permit(:title, :text, :category_id)
    end
end
