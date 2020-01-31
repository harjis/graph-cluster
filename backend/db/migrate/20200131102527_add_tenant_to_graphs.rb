class AddTenantToGraphs < ActiveRecord::Migration[6.0]
  def change
    add_reference :graphs, :tenant, null: false, foreign_key: true
    add_index :graphs, [:id, :tenant_id]
  end
end
