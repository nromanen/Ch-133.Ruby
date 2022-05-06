class CategoryPolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    is_admin
  end

  def update?
    is_admin
  end

  def destroy?
    is_admin
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
