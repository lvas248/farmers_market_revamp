class ProductsController < ApplicationController

    def index
        render json: Product.all.order(:name), status: :ok
    end

    def reset_inventory_levels
        Product.update_all(qty_avail: 10)
        head :ok
    end


end