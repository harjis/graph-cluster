defmodule PhoenixGraph.Repo do
  use Ecto.Repo,
    otp_app: :phoenix_graph,
    adapter: Ecto.Adapters.Postgres
end
