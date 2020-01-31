class AddTenantToEdges < ActiveRecord::Migration[6.0]
  def change
    add_reference :edges, :tenant, null: false, foreign_key: true
  end
end
