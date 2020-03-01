defmodule PhoenixGraphWeb.GraphControllerTest do
  use PhoenixGraphWeb.ConnCase

  alias PhoenixGraph.Graphs

  @create_attrs %{
    name: "some name"
  }

  def fixture(:graph) do
    {:ok, graph} = Graphs.create_graph(@create_attrs)
    graph
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    setup [:create_graph]

    test "lists all graphs", %{conn: conn} do
      conn = get(conn, Routes.graph_path(conn, :index))
      response = json_response(conn, 200)
      expected = ["some name"]
      assert Enum.map(response, &(&1["name"])) == expected
    end
  end

  defp create_graph(_) do
    graph = fixture(:graph)
    {:ok, graph: graph}
  end
end
