defmodule PhoenixGraphWeb.GraphController do
  use PhoenixGraphWeb, :controller

  alias PhoenixGraph.Graphs

  action_fallback PhoenixGraphWeb.FallbackController

  def index(conn, _params) do
    graphs = Graphs.list_graphs()
    render(conn, "index.json", graphs: graphs)
  end

  def data(conn, %{"id" => id}) do
    graph = Graphs.get_graph!(id)
    render(conn, "data.json", graph: graph)
  end
end
