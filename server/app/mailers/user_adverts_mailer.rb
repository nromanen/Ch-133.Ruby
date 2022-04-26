class UserAdvertsMailer < ApplicationMailer

  def new_comment(comment, advert, user)
    @advert = advert
    @comment = comment
    @user = user
    @subscribers = Subscribe.where(advert_id: @advert.id)
    @subscribers.each do |subscriber|
      @mail_target = User.find(subscriber.user_id)
      mail(to: @mail_target.email, subject: "Advert activity")
    end
  end

end
