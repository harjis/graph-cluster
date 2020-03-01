defmodule PhoenixGraph.Repo.Migrations.CreateEdges do
  use Ecto.Migration

  def change do
    create table(:edges) do
      add :from_node_id, references(:nodes, on_delete: :delete_all), null: false
      add :to_node_id, references(:nodes, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:edges, [:from_node_id])
    create index(:edges, [:to_node_id])
  end
end
