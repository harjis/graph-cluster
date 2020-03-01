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

case PhoenixGraph.Graphs.create_graph(%{name: "Graph 1"}) do
  {:ok, graph} ->
    case PhoenixGraph.Graphs.create_node(
           %{
             graph_id: graph.id,
             name: "Input node 1",
             type: PhoenixGraph.EctoEnums.node_type_input_node(),
             x: 50,
             y: 200
           }
         ) do
      {:ok, from_node} ->
        case PhoenixGraph.Graphs.create_node(
               %{
                 graph_id: graph.id,
                 name: "Output node 1",
                 type: PhoenixGraph.EctoEnums.node_type_output_node(),
                 x: 300,
                 y: 400
               }
             ) do
          {:ok, to_node} ->
            PhoenixGraph.Graphs.create_edge(from_node, to_node)
          {:error, %Ecto.Changeset{}} ->
            IO.puts "To node Error"
        end
      {:error, %Ecto.Changeset{}} ->
        IO.puts "From node Error"
    end
  {:error, %Ecto.Changeset{}} ->
    IO.puts "Graph Error"
end
