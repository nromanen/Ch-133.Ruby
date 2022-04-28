require 'rails_helper'

describe 'Categories', type: :request do
  include Warden::Test::Helpers

  context "when signed in as admin" do

    before do
      @role = Role.where(name: "Admin").first
      @user = FactoryBot.create(:user, email: "admin@rspec.fctrbt", nick_name: "rspaecadmin", confirmed_at: 1.day.ago, role: @role)
      login_as @user
    end

    it 'create new category' do
      post '/categories', params: { category: { name: 'ASDASDASD' } }
      expect(response).to have_http_status(:created)
    end

    let!(:category) { FactoryBot.create(:category, name: 'KLJLKJKLJL') }

    it 'update category' do
      patch "/categories/#{category.id}", params: { category: { name: 'ASDASDASD' } }
      expect(response).to have_http_status(:ok)
    end

    it 'delete category' do
      expect{
        delete "/categories/#{category.id}"}.to change {Category.count}.by(-1)
      expect(response).to have_http_status(:no_content)
    end

    context 'error statuses raise' do

      it 'create return error' do
        post '/categories', params: { category: {name: ""}}
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'update return error' do
        patch "/categories/#{category.id}", params: { category: { name: "" } }
        expect(response).to have_http_status(:unprocessable_entity)
      end

    end

  end

  context 'when signed in as user' do

    before(:each) do
      @role = Role.where(name: "User").first
      @user = FactoryBot.create(:user, email: "usesr@rspec.fctrbt", nick_name: "usASDASDASDer", confirmed_at: 1.day.ago, role: @role)
      login_as @user
    end

    it 'not allowed to create' do
      post '/categories', params: { category: { name: 'ASDASDASDawdwa' } }
      expect(response).to have_http_status(:forbidden)
    end

    it 'return all categories' do
      FactoryBot.create(:category, name: 'ASDASDASDa')
      get '/categories'
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(2)
    end

    it 'return single category' do
      category = FactoryBot.create(:category, name: 'ASDASDASDa')
      get "/categories/#{category.id}"
      expect(response).to have_http_status(:ok)
    end

    it 'return first page of categories' do
      FactoryBot.create(:category, name: 'ASDASDASDasww')
      get '/categories', params: {page: 1}
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(2)
    end

  end


end