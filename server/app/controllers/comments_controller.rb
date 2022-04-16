# frozen_string_literal: true

class CommentsController < ApplicationController
  # before_action :authenticate_user!
  before_action :comment_params, except: %i[ create index show ]

  def index
    if params[:advert_id].present?
      @comments = Comment.find_by(advert_id: params[:advert_id])
      render json: @comment, serializer: CommentSerializer
    end
  end

  def show
    render json: @comment
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: { message: I18n.t("created", name: I18n.t("comment") ) }, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: { message: I18n.t("updated", name: I18n.t("comment")) }, status: :ok
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
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
