# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :authenticate_user!, except: %i[index]
  before_action :set_category, except: %i[create index]

  def index
    response = []
    @categories =
      Category
        .paginate(page: params[:page], per_page: params[:per_page])
        .order('name ASC')

    @categories.each do |category|
      response <<
        ActiveModelSerializers::SerializableResource.new(
          category,
          serializer: CategorySerializer,
        )
    end
    render json: { categories: response, pages: @categories.total_pages }
  end

  def create
    @category = Category.new(category_params)
    authorize @category
    attach_64(@category)
    if @category.save
      render json: {
               message: I18n.t('created', name: I18n.t('category')),
             },
             status: :created
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def update
    authorize @category
    if @category.update(category_params)
      attach_64(@category)
      render json: {
               message: I18n.t('updated', name: I18n.t('category')),
             },
             status: :ok
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @category
    if @category.adverts.present?
      render json: {
               message: 'Can not delete',
             },
             status: :ok,
             status: :unprocessable_entity
    else
      @category.destroy
      render json: {
               message: 'Was destroyed',
             },
             status: :ok,
             status: :unprocessable_entity
    end
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  private

  def category_params
    params.permit(:name, :page, :per_page, :image)
  end

  def attach_64(category)
    if params[:image] != nil && params[:image] != 0 &&
         params[:image].kind_of?(Array)
      blob =
        ActiveStorage::Blob.create_and_upload!(
          io: StringIO.new((Base64.decode64(params[:image][2]))),
          filename: params[:image][1],
          content_type: params[:image][0],
        )
      category.image.attach(blob)
    end
  end
end
