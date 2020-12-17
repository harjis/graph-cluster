defmodule PhoenixGraphWeb.GraphView do
  use PhoenixGraphWeb, :view
  alias PhoenixGraphWeb.GraphView

  def render("index.json", %{graphs: graphs}) do
    render_many(graphs, GraphView, "graph.json")
  end

  def render("show.json", %{graph: graph}) do
    render_one(graph, GraphView, "graph.json")
  end

  def render("graph.json", %{graph: graph}) do
    %{
      id: graph.id,
      name: graph.name
    }
  end
end
