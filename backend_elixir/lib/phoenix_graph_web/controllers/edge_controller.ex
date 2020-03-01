defmodule PhoenixGraphWeb.EdgeController do
  use PhoenixGraphWeb, :controller

  alias PhoenixGraph.Graphs

  action_fallback PhoenixGraphWeb.FallbackController

  def index(conn, %{"graph_id" => graph_id}) do
    edges = Graphs.list_edges(graph_id)
    render(conn, "index.json", edges: edges)
  end

  def create(conn,%{"from_node_id" => _from_node_id, "to_node_id" => _to_node_id} = attrs) do
    {:ok, edge} = Graphs.create_edge(attrs)
    render(conn, "create.json", edge: edge)
  end

  def delete(conn, %{"id" => id}) do
    {:ok, edge} = Graphs.delete_edge(id)
    render(conn, "delete.json", success: true)
  end
end
