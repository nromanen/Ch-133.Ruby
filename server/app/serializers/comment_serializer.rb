# frozen_string_literal: true

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :author

  def as_json
    super()
  end
end
