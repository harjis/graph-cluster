defmodule PhoenixGraphWeb.TenantView do
  use PhoenixGraphWeb, :view
  alias PhoenixGraphWeb.TenantView

  def render("index.json", %{tenants: tenants}) do
    render_many(tenants, TenantView, "show.json")
  end

  def render("current.json", %{tenant: tenant}) do
    render_one(tenant, TenantView, "show.json")
  end

  def render("show.json", %{tenant: tenant}) do
    %{
      id: tenant.id,
      name: tenant.name
    }
  end
end
