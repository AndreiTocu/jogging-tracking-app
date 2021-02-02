class AddRoleToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :admin, :string, default: "NORMAL"
  end
end
