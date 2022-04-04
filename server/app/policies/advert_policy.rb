# frozen_string_literal: true
class AdvertPolicy < ApplicationPolicy

  def create?
    @user.present?
  end

  def index?
    true
  end

  def show?
    true
  end

  def update?
    is_admin or is_moderator or @record.user == @user
  end

  def destroy?
    is_admin or is_moderator or @record.user == @user
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
