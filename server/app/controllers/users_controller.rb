# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end
end
