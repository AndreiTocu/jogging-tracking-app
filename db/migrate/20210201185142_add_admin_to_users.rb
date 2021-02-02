class AddAdminToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :role, :string, default: 'NORMAL'
  end
end
