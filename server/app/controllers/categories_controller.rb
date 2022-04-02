class CategoriesController < ApplicationController
  before_action :authenticate_user!, except: %i[ index show ]
  before_action :set_category, except: %i[ create index ]


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
    if current_user.role_id == Role.find_by(name: "Admin").id
      @category.destroy
    else
      render json: {message: I18n.t("not_allowed")}, status: :method_not_allowed
    end
  end

  private
    def set_category
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name, :page, :per_page, :category_id)
    end
end
