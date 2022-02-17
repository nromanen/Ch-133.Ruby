class CategoriesController < ApplicationController
  #before_action :authenticate_user!
  before_action :set_category, except: %i[ create index ]

  def index
    @categories = Category.all
    render json: @categories
  end


  def create
    @category = Category.new(category_params)
    if @category.save
      render json: { message: I18n.t("created", name: @category.name) }, status: :created
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def update
    if @category.update(advert_params)
      render json: { message: I18n.t("updated", name: @category.name) }, status: :ok
    else
      render json: @category.errors, status: :unprocessable_entity
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
    params.require(:category).permit(:name)
  end

end
