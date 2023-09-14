class ProductsController < ApplicationController

    def index
        render json: Product.all.where('qty_avail > 0'), status: :ok
    end

    def reset_inventory_levels
        Product.update_all(qty_avail: 10)
        head :ok
    end


end