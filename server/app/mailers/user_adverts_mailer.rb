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

  def pdf_info_send(user, types)
    @types = types
    @types_print = types.join(", ")
    @user = user
    attachments['all_user_info.pdf'] = generate_pdf_content(@user, @types)
    mail(to: "dashkosanya@gmail.com", subject: "All your info")
  end

  private

  def generate_pdf_content(user, methods)
    pdf = UserPdf.new(user, methods)
    Tempfile.create do |t|
      pdf.render_file t
      t.flush
      File.read(t)
    end
  end

end
