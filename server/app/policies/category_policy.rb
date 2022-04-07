# frozen_string_literal: true
class CategoryPolicy < ApplicationPolicy

  def create?
    is_admin or is_moderator
  end

  def index?
    true
  end

  def show?
    true
  end

  def update?
    is_admin or is_moderator
  end

  def destroy?
    is_admin or is_moderator
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end