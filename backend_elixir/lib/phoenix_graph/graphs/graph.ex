defmodule PhoenixGraph.Graphs.Graph do
  use Ecto.Schema
  import Ecto.Changeset
  alias PhoenixGraph.Graphs.Node

  schema "graphs" do
    field :name, :string
    has_many :nodes, Node
    has_many :from_edges, through: [:nodes, :from_edges]

    timestamps()
  end

  @doc false
  def changeset(graph, attrs) do
    graph
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
