class ShippingDetailSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :street, :apartment, :city, :state, :zipcode, :country
end
