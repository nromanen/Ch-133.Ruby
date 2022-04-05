# frozen_string_literal: true

class ApplicationPolicy
  attr_reader :current_user, :resource
  ADMIN = "Admin"
  MODERATOR = "Moderator"

  def initialize(current_user:, resource:)
    @user = current_user
    @record = resource
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
    @user.role_id == '95be3e88-4ca1-4d12-b3ba-ddfb32103756'
  end

  def is_moderator
    @user.role_id == '4b34fc35-72c5-4a23-a713-64308eea1c1f'
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
