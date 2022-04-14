# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  subject do
    described_class.new(
      nick_name: "tom",
      email: "t@example.com",
      password: "Qwerty123",
      password_confirmation: "Qwerty123"
    )
  end

  it "sends a confirmation email" do
    expect { subject.save }.to change(ActionMailer::Base.deliveries, :count).by(1)
  end

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end


  it "is not valid without a nick_name" do
    subject.nick_name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid with short nick_name" do
    subject.nick_name = "q1"
    expect(subject).to_not be_valid
  end

  it "is not valid without an email" do
    subject.email = nil
    expect(subject).to_not be_valid
  end

  it "is not valid with wrong format of email" do
    subject.email = "nil.v"
    expect(subject).to_not be_valid
  end

  it "is not valid without a password" do
    subject.password = nil
    expect(subject).to_not be_valid
  end

  it "is not valid password format" do
    subject.password = "nilnilnil"
    expect(subject).to_not be_valid
  end

  it "is not valid password_confirmation format" do
    subject.password = "nilnil"
    expect(subject).to_not be_valid
  end

  it "is not valid password length" do
    subject.password = "nil"
    expect(subject).to_not be_valid
  end

  it "can't send confirmation email" do
    subject.email = "nil"
    expect { subject.save }.to change(ActionMailer::Base.deliveries, :count).by(0)
  end
end