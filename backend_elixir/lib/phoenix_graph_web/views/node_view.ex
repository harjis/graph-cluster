defmodule PhoenixGraphWeb.NodeView do
  use PhoenixGraphWeb, :view
  alias PhoenixGraphWeb.NodeView

  def render("index.json", %{nodes: nodes}) do
    render_many(nodes, NodeView, "node.json")
  end

  def render("create.json", %{node: node}) do
    render_one(node, NodeView, "node.json")
  end

  def render("node.json", %{node: node}) do
    %{
      id: node.id,
      name: node.name,
      type: node.type,
      graph_id: node.graph_id,
      to_edge_ids: Enum.map(node.to_edges, fn edge -> edge.id end),
      x: node.x,
      y: node.y
    }
  end
end
