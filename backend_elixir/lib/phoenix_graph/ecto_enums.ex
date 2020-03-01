defmodule PhoenixGraph.EctoEnums do
  import EctoEnum

  defenum NodeTypeEnum, :node_type, [:InputNode, :OutputNode, :NodeRefNode]

  def node_type_input_node, do: :InputNode
  def node_type_output_node, do: :OutputNode
  def node_type_node_ref_node, do: :NodeRefNode
end
