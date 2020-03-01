defmodule PhoenixGraph.Graphs do
  @moduledoc """
  The Graphs context.
  """

  import Ecto.Query, warn: false
  alias PhoenixGraph.Repo

  alias PhoenixGraph.Graphs.Graph
  alias PhoenixGraph.Graphs.Node

  @doc """
  Returns the list of graphs.

  ## Examples

      iex> list_graphs()
      [%Graph{}, ...]

  """
  def list_graphs do
    Repo.all(Graph)
  end

  @doc """
  Gets a single graph.

  Raises `Ecto.NoResultsError` if the Graph does not exist.

  ## Examples

      iex> get_graph!(123)
      %Graph{}

      iex> get_graph!(456)
      ** (Ecto.NoResultsError)

  """
  def get_graph!(id) do
    Repo.get!(Graph, id)
  end

  @doc """
  Creates a graph.

  ## Examples

      iex> create_graph(%{field: value})
      {:ok, %Graph{}}

      iex> create_graph(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_graph(attrs \\ %{}) do
    %Graph{}
    |> Graph.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a graph.

  ## Examples

      iex> update_graph(graph, %{field: new_value})
      {:ok, %Graph{}}

      iex> update_graph(graph, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_graph(%Graph{} = graph, attrs) do
    graph
    |> Graph.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Graph.

  ## Examples

      iex> delete_graph(graph)
      {:ok, %Graph{}}

      iex> delete_graph(graph)
      {:error, %Ecto.Changeset{}}

  """
  def delete_graph(%Graph{} = graph) do
    Repo.delete(graph)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking graph changes.

  ## Examples

      iex> change_graph(graph)
      %Ecto.Changeset{source: %Graph{}}

  """
  def change_graph(%Graph{} = graph) do
    Graph.changeset(graph, %{})
  end

  alias PhoenixGraph.Graphs.Node

  def list_nodes(graph_id) do
    Repo.all(from n in Node, where: n.graph_id == ^graph_id)
    |> Repo.preload(:to_edges)
  end

  @doc """
  Gets a single node.

  Raises `Ecto.NoResultsError` if the Node does not exist.

  ## Examples

      iex> get_node!(123)
      %Node{}

      iex> get_node!(456)
      ** (Ecto.NoResultsError)

  """
  def get_node!(id), do: Repo.get!(Node, id)
  def get_node_ref_node!(id),
      do: Repo.get!(Node, id)
          |> Repo.preload(:node_ref)

  @doc """
  Creates a node.

  ## Examples

      iex> create_node(%{field: value})
      {:ok, %Node{}}

      iex> create_node(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_node(attrs \\ %{}) do
    changeset = %Node{}
        |> Node.changeset(attrs)
    changeset
    |> Ecto.Changeset.put_change(:graph_id, changeset.changes.graph_id)
    |> put_node_ref_id_if_present(Map.has_key?(attrs, :node_ref), attrs)
    |> Repo.insert()
  end

  def create_node!(attrs \\ %{}) do
    {:ok, node} = create_node(attrs)
    node |> Repo.preload(:to_edges)
  end

  defp put_node_ref_id_if_present(changeset, false, _attrs), do: changeset
  defp put_node_ref_id_if_present(changeset, true, attrs) do
    changeset
    |> Ecto.Changeset.put_change(:node_ref_id, attrs.node_ref.id)
  end

  @doc """
  Updates a node.

  ## Examples

      iex> update_node(node, %{field: new_value})
      {:ok, %Node{}}

      iex> update_node(node, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_node(%Node{} = node, attrs) do
    node
    |> Node.changeset(attrs)
    |> Repo.update()
  end

  def update_node!(id, attrs) do
    node = get_node!(id)
    {:ok, node} = update_node(node, attrs)
    node |> Repo.preload(:to_edges)
  end

  @doc """
  Deletes a Node.

  ## Examples

      iex> delete_node(node)
      {:ok, %Node{}}

      iex> delete_node(node)
      {:error, %Ecto.Changeset{}}

  """
  def delete_node(%Node{} = node) do
    Repo.delete(node)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking node changes.

  ## Examples

      iex> change_node(node)
      %Ecto.Changeset{source: %Node{}}

  """
  def change_node(%Node{} = node) do
    Node.changeset(node, %{})
  end

  alias PhoenixGraph.Graphs.Edge

  def list_edges(graph_id) do
    Repo.all(from e in Edge, join: n in assoc(e, :from_node), where: n.graph_id == ^graph_id)
  end

  @doc """
  Gets a single edge.

  Raises `Ecto.NoResultsError` if the Edge does not exist.

  ## Examples

      iex> get_edge!(123)
      %Edge{}

      iex> get_edge!(456)
      ** (Ecto.NoResultsError)

  """
  def get_edge!(id), do: Repo.get!(Edge, id)

  @doc """
  Creates a edge.

  ## Examples

      iex> create_edge(%{field: value})
      {:ok, %Edge{}}

      iex> create_edge(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_edge(attrs) do
    %Edge{}
    |> Edge.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a edge.

  ## Examples

      iex> update_edge(edge, %{field: new_value})
      {:ok, %Edge{}}

      iex> update_edge(edge, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_edge(%Edge{} = edge, attrs) do
    edge
    |> Edge.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Edge.

  ## Examples

      iex> delete_edge(edge)
      {:ok, %Edge{}}

      iex> delete_edge(edge)
      {:error, %Ecto.Changeset{}}

  """
  def delete_edge(%Edge{} = edge) do
    Repo.delete(edge)
  end

  def delete_edge(id) do
    edge = get_edge! id
    delete_edge edge
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking edge changes.

  ## Examples

      iex> change_edge(edge)
      %Ecto.Changeset{source: %Edge{}}

  """
  def change_edge(%Edge{} = edge) do
    Edge.changeset(edge, %{})
  end
end
