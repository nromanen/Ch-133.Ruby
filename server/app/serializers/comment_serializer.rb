# frozen_string_literal: true

class CommentSerializer < ActiveModel::Serializer
  #include JSONAPI::Serializer

  attributes :id, :text, :author
  # options = {
  #   include: [:author.name]
  # }
  # belongs_to :user
  # def as_json
  #   super()
  # end
end
