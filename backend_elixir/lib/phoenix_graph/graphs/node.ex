defmodule PhoenixGraph.Graphs.Node do
  use Ecto.Schema
  import Ecto.Changeset
  alias PhoenixGraph.Graphs.Graph
  alias PhoenixGraph.Graphs.Edge

  alias PhoenixGraph.{
    EctoEnums,
    EctoEnums.NodeTypeEnum,
    Graphs.Node.InputNode,
    Graphs.Node.OutputNode,
    Graphs.Node.NodeRefNode
    }

  schema "nodes" do
    field :type, NodeTypeEnum
    field :name, :string
    field :x, :float, default: 10 / 1
    field :y, :float, default: 10 / 1
    belongs_to :graph, Graph
    belongs_to :node_ref, PhoenixGraph.Graphs.Node
    has_many :from_edges, Edge, foreign_key: :from_node_id
    has_many :to_edges, Edge, foreign_key: :to_node_id

    timestamps()
  end

  @fields ~w(type name x y node_ref_id graph_id)a
  @required_fields ~w(type name x y graph_id)a

  @doc false
  def changeset(node, attrs) do
    node
    |> cast(attrs, @fields)
    |> validate_required(@required_fields)
    |> validate_data(attrs)
  end

  defp validate_data(changeset, attrs) do
    changeset
    |> build_data_changeset(attrs)
    |> case do
         %{valid?: true} ->
           changeset

         %{errors: errors} ->
           add_data_errors(changeset, errors)
       end
  end

  defp build_data_changeset(changeset, attrs) do
    type = get_field(changeset, :type)

    cond do
      type == EctoEnums.node_type_input_node() ->
        InputNode.changeset(attrs)

      type == EctoEnums.node_type_output_node() ->
        OutputNode.changeset(attrs)

      type == EctoEnums.node_type_node_ref_node() ->
        NodeRefNode.changeset(attrs)

      true ->
        attrs
    end
  end

  defp add_data_errors(changeset, errors) do
    Enum.reduce(errors, changeset, fn {key, {message, meta}}, acc -> add_error(acc, key, message, meta) end)
  end
end
