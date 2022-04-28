class UserPolicy < ApplicationPolicy
    def index?
      true
    end
  
    def update?
      is_admin
    end
  
    class Scope < Scope
      def resolve
        scope.all
      end
    end
end