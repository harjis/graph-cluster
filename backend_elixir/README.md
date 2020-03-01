# PhoenixGraph

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

## Gens

* Graph: `mix phx.gen.json Graphs Graph graphs name:string`
* Nodes: `mix phx.gen.context Graphs Node nodes name:string x:float y:float graph_id:references:graphs`
* Edges: `mix phx.gen.context Graphs Edge edges from_node_id:references:nodes to_node_id:references:nodes`


# Rand

* Start console `iex -S mix`
