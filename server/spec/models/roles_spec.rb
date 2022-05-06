RSpec.describe Role, type: :model do
    it 'uniq name' do
        role = Role.new(name: "User")
        role.save
        expect(role.save).to eq(false)
        puts role.save
    end
end
