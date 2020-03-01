defmodule PhoenixGraph.Repo.Migrations.CreateGraphs do
  use Ecto.Migration

  def change do
    create table(:graphs) do
      add :name, :string

      timestamps()
    end

  end
end
