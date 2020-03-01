defmodule PhoenixGraphWeb.NodeController do
  use PhoenixGraphWeb, :controller

  alias PhoenixGraph.Graphs

  action_fallback PhoenixGraphWeb.FallbackController

  def index(conn, %{"graph_id" => id}) do
    nodes = Graphs.list_nodes(id)
    render(conn, "index.json", nodes: nodes)
  end

  def create(conn, attrs) do
    node = Graphs.create_node!(attrs)
    render(conn, "create.json", node: node)
  end

  def update(conn, %{"id" => id} = attrs) do
    node = Graphs.update_node!(id, attrs)
    render(conn, "create.json", node: node)
  end
end
