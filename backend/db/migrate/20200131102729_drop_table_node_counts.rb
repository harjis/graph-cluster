class DropTableNodeCounts < ActiveRecord::Migration[6.0]
  def change
    drop_table :node_counts
  end
end
