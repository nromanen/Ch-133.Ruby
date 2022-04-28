class UserAdvertsMailer < ApplicationMailer

  def new_comment(comment)
    @comment = comment
    @advert = Advert.find(@comment.advert_id)
    @user_author = User.find(@advert.user_id)
    if @user_author.subscribe.subscribed
      @user_comment = User.find(@comment.user_id)

      mail(to: @user_author.email, subject: "Advert activity")
    end

    # @subscribers = Subscribe.where(advert_id: @advert.id)
    # @subscribers.each do |subscriber|
    #   @mail_target = User.find(subscriber.user_id)
    #   mail(to: @mail_target.email, subject: "Advert activity")
    # end
  end

end
