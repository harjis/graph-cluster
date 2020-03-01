defmodule PhoenixGraph.Repo.Migrations.CreateNodes do
  use Ecto.Migration

  def change do
    create table(:nodes) do
      add :name, :string
      add :x, :float
      add :y, :float
      add :graph_id, references(:graphs, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:nodes, [:graph_id])
  end
end
