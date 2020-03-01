defmodule PhoenixGraph.Graphs.Node.NodeRefNode do
  use Ecto.Schema
  import Ecto.Changeset

  embedded_schema do
  end

  @fields ~w()a

  def changeset(attrs), do: changeset(%__MODULE__{}, attrs)
  def changeset(%__MODULE__{} = event, attrs) do
    event
    |> cast(attrs, @fields)
    |> validate_required(@fields)
  end
end
