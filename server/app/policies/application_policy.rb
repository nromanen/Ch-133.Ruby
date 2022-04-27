# frozen_string_literal: true

class ApplicationPolicy
  attr_reader :user, :record
  ADMIN = "Admin"
  MODERATOR = "Moderator"

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    false
  end

  def show?
    false
  end

  def create?
    false
  end

  def new?
    create?
  end

  def update?
    false
  end

  def edit?
    update?
  end

  def destroy?
    false
  end

  def is_admin
    @user.role.name == ADMIN
  end

  def is_moderator
    @user.role.name == MODERATOR
  end

  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      raise NotImplementedError, "You must define #resolve in #{self.class}"
    end

    private
    attr_reader :user, :scope
  end
end