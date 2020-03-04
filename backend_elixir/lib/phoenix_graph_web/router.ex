defmodule PhoenixGraphWeb.Router do
  use PhoenixGraphWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", PhoenixGraphWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
   scope "/api", PhoenixGraphWeb do
     pipe_through :api

     get "/tenants", TenantController, :index
     get "/tenants/current", TenantController, :current
     resources "/graphs", GraphController do
       resources "/nodes", NodeController
       resources "/edges", EdgeController
     end
   end
end
