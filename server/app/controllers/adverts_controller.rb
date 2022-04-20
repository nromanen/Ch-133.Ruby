# frozen_string_literal: true

class AdvertsController < ApplicationController
  require "api-pagination"
  before_action :authenticate_user!, only: %i[update destroy create]

  # POST /adverts
  def create
    @advert = current_user.adverts.new(advert_params)
    if params[:image] != nil && params[:image] != 0
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new((Base64.decode64(params[:image][2]))),
        filename: params[:image][1],
        content_type: params[:image][0],)
      @advert.image.attach(blob)
    end
    authorize @advert
    if @advert.save
      render json: { message: I18n.t("created", name: I18n.t("advert"))
      }, status: 200
    else
      render json: @advert.errors.full_messages, status: :unprocessable_entity
    end
  end

  # GET /adverts
  def index
    response = []
    @adverts = paginate Advert.all.order("created_at ASC")
    @adverts.each do |advert|
      response << { title: advert.title, body: advert.text, imgUrl: advert.image_url, author: advert.user.nick_name, id: advert.id }
    end
    render json: response
  end

  # GET /adverts/1
  def show
    @advert = Advert.find(params[:id])
    authorize @advert
    render json: { advert: AdvertSerializer.new(@advert).as_json }
  end

  def like
    @advert = Advert.find(params[:id])
    Like.create(user_id: current_user.id, advert_id: @advert.id)
    render json: @advert
  end

  # PATCH/PUT /averts/1
  def update
    @advert = Advert.find(params[:id])
    authorize @advert
    if advert.update(advert_params)
      render json: { message: I18n.t("updated", name: I18n.t("advert")) }, status: :ok
    else
      render json: @advert.errors, status: :unprocessable_entity
    end
  end

  # DELETE /adverts/1
  def destroy
    @advert = Advert.find(params[:id])
    authorize @advert
    @advert.destroy if @advert.present?
    render json: { message: I18n.t("deleted", name: I18n.t("advert")) }
  end

  private
    def advert_params
      params.require(:advert).permit(:title, :text, :category_id, :image, :page, :per_page)
    end
    def as_json
      super()
    end
end
