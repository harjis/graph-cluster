defmodule PhoenixGraphWeb.TenantController do
  use PhoenixGraphWeb, :controller

  action_fallback PhoenixGraphWeb.FallbackController

  def index(conn, _params) do
    tenants = [%{id: 1, name: "Tenant 1"}, %{id: 2, name: "Tenant 2"}]
    render(conn, "index,json", tenants: tenants)
  end

  def current(conn, _params) do
    tenant = %{id: 1, name: "Tenant 1"}
    render(conn, "current.json", tenant: tenant)
  end
end
