defmodule PhoenixGraphWeb.EdgeView do
  use PhoenixGraphWeb, :view
  alias PhoenixGraphWeb.EdgeView

  def render("index.json", %{edges: edges}) do
    render_many(edges, EdgeView, "edge.json")
  end

  def render("create.json", %{edge: edge}) do
    render_one(edge, EdgeView, "edge.json")
  end

  def render("delete.json", %{success: success}) do
    success
  end

  def render("edge.json", %{edge: edge}) do
    %{
      id: edge.id,
      from_node_id: edge.from_node_id,
      to_node_id: edge.to_node_id
    }
  end
end
