class CategoriesController < ApplicationController
  before_action :authenticate_user!, except: %i[ index ]
  before_action :set_category, except: %i[ create index ]


  def index
    @categories = Category.paginate(page: params[:page], per_page: params[:per_page]).order('name ASC')
    render json: { categories: @categories, pages: @categories.total_pages }
  end


  def create
    if current_user.has_role?(:admin)
      @category = Category.new(category_params)
      if @category.save
        render json: { message: I18n.t("created", name: I18n.t("category")) }, status: :created
      else
        render json: {message: @category.errors.full_messages[0]}, status: :unprocessable_entity
      end
    else
      render json: {message: I18n.t("not_allowed")}, status: :method_not_allowed
    end
  end

  def update
    if @category.update(category_params)
      render json: { message: I18n.t("updated", name: I18n.t("category")) }, status: :ok
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
      params.require(:category).permit(:name, :page, :per_page)
    end
end
