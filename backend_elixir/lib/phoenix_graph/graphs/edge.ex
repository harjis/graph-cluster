defmodule PhoenixGraph.Graphs.Edge do
  use Ecto.Schema
  import Ecto.Changeset
  alias PhoenixGraph.Graphs.Node

  schema "edges" do
    belongs_to :from_node, Node
    belongs_to :to_node, Node

    timestamps()
  end

  @fields ~w(from_node_id to_node_id)a

  @doc false
  def changeset(edge, attrs) do
    edge
    |> cast(attrs, @fields)
    |> validate_required(@fields)
  end
end
