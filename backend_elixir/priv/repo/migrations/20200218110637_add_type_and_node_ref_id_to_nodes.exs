defmodule PhoenixGraph.Repo.Migrations.AddTypeAndNodeRefIdToNodes do
  use Ecto.Migration

  alias PhoenixGraph.EctoEnums.NodeTypeEnum

  def change do
    NodeTypeEnum.create_type()
    alter table("nodes") do
      add :type, :node_type, null: false
      add :node_ref_id, references(:nodes), null: true
    end
  end
end
