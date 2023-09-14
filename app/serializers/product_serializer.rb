class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image, :price, :qty_avail, :season, :produce_type
end
