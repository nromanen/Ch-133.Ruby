# frozen_string_literal: true

class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :comment_params, except: %i[ create index show ]
  before_action :set_comment, only: [:show, :update, :destroy]

  def index
    if params[:advert_id].present?
      @comments = Comment.find_by(advert_id: params[:advert_id])
      authorize @comments
      render json: @comments, serializer: CommentSerializer
    end
  end

  def show
    authorize @comment
    render json: @comment
  end

  def create
    @comment = current_user.comments.build(comment_params)
    authorize @comment
    if @comment.save
      begin
        @advert = Advert.find(@comment.advert_id)
        UserAdvertsMailer.new_comment(@comment, @advert, current_user).deliver_now
      ensure
        render json: { message: I18n.t("created", name: I18n.t("comment")) }, status: :created
      end

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
      params.require(:comment).permit(:text, :page, :advert_id, :user_id)
    end
end
