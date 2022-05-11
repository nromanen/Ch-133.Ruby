class UserPdf
  include Prawn::View

  def initialize(user, methods)
    allowed_methods = ["user_info", "user_adverts", "user_comments", "user_general"]
    @methods = methods.select {|item| allowed_methods.include? item}
    @methods.each do |m|
      send m, user
      move_down 20
    end
  end

  def user_general(user)
    @user = user

    text "#{@user.nick_name} main data that we are allowed to send"

    table_data = Array.new
    table_data << ["Email","NickName", "Role"]
    table_data << [@user.email, @user.nick_name, @user.role.name]

    table_format(table_data)
  end

  def user_info(user)
    @user_info = user.user_info

    text "#{user.nick_name} info"

    table_data = Array.new
    table_data << ["Firstname","Lastname", "Phone"]
    table_data << [@user_info.first_name, @user_info.last_name, @user_info.phone]

    table_format(table_data)
  end

  def table_format(table_data)
    table(table_data, :header => true,
          :width => bounds.width,
          :cell_style => {:size => 10, :inline_format => true},
          :row_colors => ["F0F0F0", "FFFFFF"])
  end

  def user_adverts(user)
    @user = user
    @user_adverts = @user.adverts

    text "All adverts created by #{@user.nick_name}"

    table_data = Array.new
    table_data << ["Advert","Text", "Created"]
    p "="*80
    @user_adverts.each do |u|
      test = "#{ENV["FRONT_LINK"]}/adverts/#{u.id}"
      href = "<link href='#{test}'>"
      link = make_cell(content: "<color rgb='0000FF'> <u> #{href} #{u.title} </link></u> </color>", inline_format: true)
      table_data << [link, u.text, u.created_at.to_formatted_s(:db)]
    end

    table_format(table_data)
  end

  def user_comments(user)
    @user = user
    @user_comments = @user.comments

    text "All comments added by #{@user.nick_name}, (the link leads to the post to which the comment belongs)"

    table_data = Array.new
    table_data << ["Comment","Added"]

    href = "<link href='google.com'>"
    @user_comments.each do |u|
      link = make_cell(content: "<color rgb='0000FF'> <u> #{href} #{u.text} </link></u> </color>", inline_format: true)
      table_data << [link, u.created_at.to_formatted_s(:db)]
    end

    table_format(table_data)
  end
end