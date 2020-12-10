# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     PhoenixGraph.Repo.insert!(%PhoenixGraph.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Ecto.Multi

Multi.new()
|> Multi.run(:graph, fn _, _ -> PhoenixGraph.Graphs.create_graph(%{name: "Graph 1"}) end)
|> Multi.run(:from_node, fn _, %{graph: graph} ->
  PhoenixGraph.Graphs.create_node(%{
    graph_id: graph.id,
    name: "Input node 1",
    type: PhoenixGraph.EctoEnums.node_type_input_node(),
    x: 50,
    y: 200
  })
end)
|> Multi.run(:to_node, fn _, %{graph: graph, from_node: from_node} ->
  PhoenixGraph.Graphs.create_node(%{
    graph_id: graph.id,
    name: "Output node 1",
    type: PhoenixGraph.EctoEnums.node_type_output_node(),
    x: 300,
    y: 400
  })
end)
|> Multi.run(:edge, fn _, %{graph: graph, from_node: from_node, to_node: to_node} ->
  PhoenixGraph.Graphs.create_edge(%{
    "from_node_id" => from_node.id,
    "to_node_id" => to_node.id
  })
end)
|> PhoenixGraph.Repo.transaction()
