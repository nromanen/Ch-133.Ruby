# frozen_string_literal: true

class CommentsController < ApplicationController
  # before_action :authenticate_user!
  before_action :comment_params, except: %i[ create index show ]
  before_action :set_comment, only: [:show, :update, :destroy]

  def index
    if params[:advert_id].present?
      @comments = Comment.find_by(advert_id: params[:advert_id])
      authorize @comments
      render json: @comments
    end
  end

  def show
    authorize @comment
    render json: @comment
  end

  def create
    @comment = Comment.new(comment_params)
    authorize @comment
    if @comment.save
      render json: { message: I18n.t("created", name: I18n.t("comment")) }, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    authorize @comment
    if @comment.update(comment_params)
      render json: { message: I18n.t("updated", name: I18n.t("comment")) }, status: :ok
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @comment
    @comment.destroy
  end

  private
    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.permit(:text, :page, :advert_id, :user_id)
    end
end
