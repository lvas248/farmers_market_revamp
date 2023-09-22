Rails.application.routes.draw do
  
  post '/cart', to: 'carts#add_to_cart'
  delete '/cart/:cart_item_id', to: 'carts#remove_from_cart'
  patch '/cart/:cart_item_id', to: 'carts#updateOrderItemQtyInCart'
  delete '/clear_cart', to: 'carts#clear_cart'

  get '/orders', to: 'orders#index'
  
  post '/submit_order', to: 'orders#submit_order'

  delete '/clear_cart', to: 'orders#clear_cart'

  get '/products', to: 'products#index'
  patch '/products', to: 'products#reset_inventory_levels'

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
