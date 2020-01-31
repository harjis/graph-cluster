# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

tenant = Tenant.create(name: 'Tenant 1')
Current.tenant=tenant
graph = Graph.new(name: 'Tenant 1: Graph 1', tenant: tenant)
node1 = InputNode.new(name: 'InputNode 1', x: 50, y: 200, tenant: tenant)
node2 = OutputNode.new(name: 'OutputNode 1', x: 300, y: 400, tenant: tenant)

graph.nodes = [node1, node2]
graph.save
edge = Edge.new(from_node: node1, to_node: node2, tenant: tenant)
edge.save


graph2 = Graph.new(name: 'Tenant 1: Graph 2', tenant: tenant)
node3 = InputNode.new(name: 'InputNode 2', x: 10, y: 10, tenant: tenant)
node4 = OutputNode.new(name: 'OutputNode 2', x: 400, y: 200, tenant: tenant)
graph2.nodes = [node3, node4]
graph2.save
edge2 = Edge.new(from_node: node3, to_node: node4, tenant: tenant)
edge2.save

node_ref_node = NodeRefNode.new(name: 'Node reference node', x: 400, y: 200, node_ref: node4, graph: graph, tenant: tenant)
node_ref_node.save
edge2 = Edge.new(from_node: node_ref_node, to_node: node2, tenant: tenant)
edge2.save


tenant2 = Tenant.create(name: 'Tenant 2')
Current.tenant=tenant2
graph21 = Graph.new(name: 'Tenant 1: Graph 2', tenant: tenant2)
node21 = InputNode.new(name: 'InputNode 2', x: 10, y: 10, tenant: tenant2)
node22 = OutputNode.new(name: 'OutputNode 2', x: 400, y: 200, tenant: tenant2)
graph21.nodes = [node21, node22]
graph21.save
edge21 = Edge.new(from_node: node21, to_node: node22, tenant: tenant2)
edge21.save
