defmodule PhoenixGraph.GraphsTest do
  use PhoenixGraph.DataCase

  alias PhoenixGraph.Graphs

  describe "graphs" do
    alias PhoenixGraph.Graphs.Graph

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def graph_fixture(attrs \\ %{}) do
      {:ok, graph} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Graphs.create_graph()

      graph
    end

    test "list_graphs/0 returns all graphs" do
      graph = graph_fixture()
      assert Graphs.list_graphs() == [graph]
    end

    test "get_graph!/1 returns the graph with given id" do
      graph = graph_fixture()
      assert Graphs.get_graph!(graph.id) == graph
    end

    test "create_graph/1 with valid data creates a graph" do
      assert {:ok, %Graph{} = graph} = Graphs.create_graph(@valid_attrs)
      assert graph.name == "some name"
    end

    test "create_graph/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Graphs.create_graph(@invalid_attrs)
    end

    test "update_graph/2 with valid data updates the graph" do
      graph = graph_fixture()
      assert {:ok, %Graph{} = graph} = Graphs.update_graph(graph, @update_attrs)
      assert graph.name == "some updated name"
    end

    test "update_graph/2 with invalid data returns error changeset" do
      graph = graph_fixture()
      assert {:error, %Ecto.Changeset{}} = Graphs.update_graph(graph, @invalid_attrs)
      assert graph == Graphs.get_graph!(graph.id)
    end

    test "delete_graph/1 deletes the graph" do
      graph = graph_fixture()
      assert {:ok, %Graph{}} = Graphs.delete_graph(graph)
      assert_raise Ecto.NoResultsError, fn -> Graphs.get_graph!(graph.id) end
    end

    test "change_graph/1 returns a graph changeset" do
      graph = graph_fixture()
      assert %Ecto.Changeset{} = Graphs.change_graph(graph)
    end
  end

  describe "nodes" do
    alias PhoenixGraph.Graphs.Node
    alias PhoenixGraph.EctoEnums

    @valid_node_ref_node_attrs %{
      name: "some name",
      type: EctoEnums.node_type_node_ref_node(),
      x: 120.5,
      y: 120.5
    }
    @valid_output_node_attrs %{name: "some name", type: EctoEnums.node_type_output_node(), x: 120.5, y: 120.5}
    @valid_attrs %{name: "some name", type: EctoEnums.node_type_input_node(), x: 120.5, y: 120.5}
    @update_attrs %{name: "some updated name", type: EctoEnums.node_type_input_node(), x: 456.7, y: 456.7}
    @invalid_attrs %{name: nil, type: EctoEnums.node_type_input_node(), x: nil, y: nil}

    defp with_graph(graph, attrs) do
      Map.merge(%{graph_id: graph.id}, attrs)
    end

    def node_fixture(attrs \\ %{}) do
      graph = graph_fixture()
      {:ok, node} = Graphs.create_node(Map.merge(@valid_attrs, with_graph(graph, attrs)))
      node
    end

    test "get_node!/1 returns the node with given id" do
      node = node_fixture()
      assert Graphs.get_node!(node.id) == node
    end

    test "create_node/1 with valid input node data creates a input node" do
      graph = graph_fixture()
      assert {:ok, %Node{} = node} = Graphs.create_node(with_graph(graph, @valid_attrs))
      assert node.name == "some name"
      assert node.x == 120.5
      assert node.y == 120.5
    end

    test "create_node/1 with invalid data returns error changeset" do
      graph = graph_fixture()
      assert {:error, %Ecto.Changeset{}} = Graphs.create_node(with_graph(graph, @invalid_attrs))
    end

    test "create_input/1 with valid output node data creates a output node" do
      graph = graph_fixture()
      assert {:ok, %Node{} = node} = Graphs.create_node(with_graph(graph, @valid_output_node_attrs))
      assert node.name == "some name"
      assert node.x == 120.5
      assert node.y == 120.5
    end

    test "create_input/1 with valid node ref node data creates a node ref node" do
      graph = graph_fixture()
      {:ok, output_node} = Graphs.create_node(with_graph(graph, @valid_node_ref_node_attrs))
      assert {:ok, %Node{} = node} = Graphs.create_node(
               with_graph(graph, Map.merge(@valid_node_ref_node_attrs, %{node_ref: output_node}))
             )
      assert node.name == "some name"
      assert node.x == 120.5
      assert node.y == 120.5
      node_ref = Graphs.get_node_ref_node!(node.id)
      assert node_ref.node_ref.id == output_node.id
    end

    test "update_node/2 with valid data updates the node" do
      node = node_fixture()
      assert {:ok, %Node{} = node} = Graphs.update_node(node, @update_attrs)
      assert node.name == "some updated name"
      assert node.x == 456.7
      assert node.y == 456.7
    end

    test "update_node/2 with invalid data returns error changeset" do
      node = node_fixture()
      assert {:error, %Ecto.Changeset{}} = Graphs.update_node(node, @invalid_attrs)
      assert node == Graphs.get_node!(node.id)
    end

    test "delete_node/1 deletes the node" do
      node = node_fixture()
      assert {:ok, %Node{}} = Graphs.delete_node(node)
      assert_raise Ecto.NoResultsError, fn -> Graphs.get_node!(node.id) end
    end

    test "change_node/1 returns a node changeset" do
      node = node_fixture()
      assert %Ecto.Changeset{} = Graphs.change_node(node)
    end
  end

  describe "edges" do
    alias PhoenixGraph.Graphs.Edge

    @valid_attrs %{}
    @update_attrs %{}

    def edge_fixture(attrs \\ %{}) do
      from_node = node_fixture()
      to_node = node_fixture()
      {:ok, edge} = Graphs.create_edge(
        attrs
        |> Map.merge(%{from_node_id: from_node.id, to_node_id: to_node.id})
      )

      edge
    end

    test "get_edge!/1 returns the edge with given id" do
      edge = edge_fixture()
      assert Graphs.get_edge!(edge.id) == edge
    end

    test "create_edge/1 with valid data creates a edge" do
      from_node = node_fixture()
      to_node = node_fixture()
      assert {:ok, %Edge{} = edge} = Graphs.create_edge(%{from_node_id: from_node.id, to_node_id: to_node.id})
    end

    test "update_edge/2 with valid data updates the edge" do
      edge = edge_fixture()
      assert {:ok, %Edge{} = edge} = Graphs.update_edge(edge, @update_attrs)
    end

    test "delete_edge/1 deletes the edge" do
      edge = edge_fixture()
      assert {:ok, %Edge{}} = Graphs.delete_edge(edge)
      assert_raise Ecto.NoResultsError, fn -> Graphs.get_edge!(edge.id) end
    end

    test "change_edge/1 returns a edge changeset" do
      edge = edge_fixture()
      assert %Ecto.Changeset{} = Graphs.change_edge(edge)
    end
  end
end
