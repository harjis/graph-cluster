Rails.application.routes.draw do
  scope :api do
    get 'tenants/', to: 'tenants#index'
    get 'tenants/current', to: 'tenants#get_current'
    put 'tenants/current', to: 'tenants#set_current'
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    get 'graphs/:id/reset', to: 'graphs#reset'
    get 'graphs/:id/undo', to: 'graphs#undo'
    get 'graphs/:id/calculate_node_count', to: 'graphs#calculate_node_count'
    get 'graphs/get_node_count', to: 'graphs#get_node_count'
    resources :graphs do
      resources :nodes
      resources :edges
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
