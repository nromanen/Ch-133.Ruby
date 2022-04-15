require "rails_helper"

describe Category, type: :model do
  subject do
    FactoryBot.create(:category, name: 'Sports')
    FactoryBot.create(:category, name: 'Cars')
  end

  it "Has valid name" do
    subject.name = "qqweer"
    expect(subject).to be_valid
  end

  it "Is no valid without the name" do
    subject.name = nil
    expect(subject).to_not be_valid
  end

  it "Too short" do
    subject.name = "qq"
    expect(subject).to_not be_valid
  end

  it "Too long" do
    subject.name = "q"*21
    expect(subject).to_not be_valid
  end

  it "Only latin letters" do
    subject.name = "qqwфвцфы"
    expect(subject).to_not be_valid
  end

end
