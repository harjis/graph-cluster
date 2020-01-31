class AddTenantToNodes < ActiveRecord::Migration[6.0]
  def change
    add_reference :nodes, :tenant, null: false, foreign_key: true
    add_index :nodes, [:id, :tenant_id]
    add_index :nodes, [:graph_id, :tenant_id]
  end
end
