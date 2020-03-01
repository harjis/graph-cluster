defmodule PhoenixGraph.Graphs.Node.InputNode do
  use Ecto.Schema
  import Ecto.Changeset

  embedded_schema do
  end

  @fields ~w()a

  def changeset(attrs), do: changeset(%__MODULE__{}, attrs)
  def changeset(%__MODULE__{} = input_node, attrs) do
    input_node
    |> cast(attrs, @fields)
    |> validate_required(@fields)
  end
end
