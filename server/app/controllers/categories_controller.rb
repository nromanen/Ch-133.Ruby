# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :authenticate_user!, except: %i[ index show all ]
  before_action :set_category, except: %i[ create index all ]


  def index
    @categories = Category.paginate(page: params[:page], per_page: params[:per_page]).order('name ASC')
    if params[:page]!=nil
      render json: { categories: @categories, pages: @categories.total_pages }
    else
      render json: { categories: @categories}
    end
  end

  def show
    render json: @category
  end
  def all
    response = []
    @categories = Category.all.order('name ASC')
    @categories.each do |category|
      response << { 'key': category.name, 'text': category.name, 'value': category.id}
    end
    render json: response
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      render json: { message: I18n.t("created", name: I18n.t("category")) }, status: :created
    else
      render json: {message: @category.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    if @category.update(category_params)
      render json: { message: I18n.t("updated", name: I18n.t("category")) }, status: :ok
    else
      render json: {message: @category.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @category.destroy
  end

  private
    def set_category
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name, :page, :per_page, :category_id)
    end
end
