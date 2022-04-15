require 'rails_helper'

describe 'Categories', type: :request do
  include Warden::Test::Helpers

  context "when signed in as admin" do
    before do
      @user = FactoryBot.create(:user, email: "admin@q.qqeseq", nick_name: "awdwwsewew", confirmed_at: 1.day.ago)
      login_as @user
    end

    it 'create new category' do
      post '/categories', params: { category: { name: 'Test' } }
      expect(response).to have_http_status(:created)
    end

    let!(:category) { FactoryBot.create(:category, name: 'Cars') }

    # it 'update category' do
    # end

    it 'delete category' do
      expect{
        delete "/categories/#{category.id}"}.to change {Category.count}.from(1).to(0)
      expect(response).to have_http_status(:no_content)
    end

  end

  describe 'GET categories' do
    it 'return all categories' do
      FactoryBot.create(:category, name: 'Sports')
      FactoryBot.create(:category, name: 'Cars')

      get '/categories'

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end
end