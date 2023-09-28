
# Farmer's Market



WALKTHROUGH: 

DEMO: https://farmers-market-c6jl.onrender.com




## Overview
Welcome to Farmer's Market, an e-commerce application that brings the convenience of online shopping to the world of fresh, locally sourced produce and artisanal goods. Explore a diverse selection of high-quality products and shop with ease, all from the comfort of your home.



## Installation

Install Farmer's Market by visiting the github repo and cloning:


```bash
$ git clone git@github.com:lvas248/farmers_market_revamp.git
$ cd project_name
$ bundle install
```

cd into the root of the react app (client folder) and install packages using npm

```bash
$ cd client
$ npm install
``` 



Now create the db and seed the data, in the root of the rails app:

```bash
$ rails db:create db:migrate db:seed
```

This app requires an apikey for address validation.  [GeoApify](https://www.geoapify.com/pricing) offers free apikeys for this service without having to sign up.  Once the apikey has been obtained, create a .env.local file in the route of the react app and include the following:
```bash
REACT_APP_GEOAPIFY_API_KEY= geoapify_api_key
```
## Features

#### 1. Product Listing
Easily browse through a diverse range of farm-fresh fruits and vegetables. Each product listing comes with detailed descriptions and high-quality images to help you make informed choices.

#### 2. Search and Filter
Effortlessly find the products you're looking for using our robust search and filtering system. 

#### 3. Secure User Accounts
Create your own secure account to view order history, save shipping addresses, save shopping carts.

#### 4. Saved Shopping carts
Shopping carts can be saved by both guests and registered users. This feature eliminates concerns about losing selected items, allowing for a convenient completion of purchases at a later time. Even if an account hasn't been created, products can still be stored in the cart. For registered users, these saved carts can be accessed seamlessly across different devices.

#### 5. Responsive Design
The app is designed with responsiveness in mind. Whether you're using a desktop, tablet, or smartphone, you can enjoy a smooth shopping experience on any device and screen size.

#### 6. Address Validation
Enhance the precision of your delivery information using our address validation feature, which helps prevent issues related to typographical errors or inaccurate addresses.
## Backend




### API Endpoints

**Authentication**:  
- `POST /signup`: Create a new user account.
- `POST /login`: Log in with an existing user account.

**Session**
- `GET /me`: Retrieve the user that is currently in session.
- `DELETE /logout`: Remove current user from session.

**Products**:
- `GET /products`: Fetch a list of all products.
- `PATCH /products`: Resets inventory levels.

**Cart**:
- `POST /cart`: Add item to cart.
- `DELETE /cart/:cart_item_id`: Remove an item from cart.
- `PATCH /cart/:cart_item_id`: Update the order quantity of a cart item.
- `DELETE /clear_cart`: Delete all cart items in cart.

**Order**
- `POST /submit_order`: Place an order.




### Database

The backend uses the following data models:

Users
- `_id`
- `name`
- `phone`
- `email`
- `password_digest`


Guests
- `_id`

Products
- `_id`
- `name`
- `description`
- `price`
- `image`
- `qty_avail`
- `season`
- `produce_type`

Carts (polymorphic)
- `_id`
- `cartable_id`
- `cartable_type`

Cart_Items
- `_id`
- `cart_id`
- `product_id`
- `order_qty`

Orders (polymorphic)
- `_id`
- `orderable_id`
- `orderable_type`
- `shipping_detail_id`

Order_Items
- `_id`
- `order_id`
- `product_id`
- `order_qty`

Shipping_Details
- `_id`
- `name`
- `email`
- `phone`
- `street`
- `apartment`
- `city`
- `state`
- `country`
- `zipcode`


### Table Associations

USER
- user has_many :orders, as: :orderable
- user has_many :shipping_details, through: :orders
- user has_one :cart as: :cartable

GUEST
- guest has_many :orders, as: :orderable
- guest has_one :cart, as: :cartable

CART 
- belongs_to :cartable (polymorphic)
- has_many :cart_items
- has_many :products, through: :cart_items

CART_ITEM
- belongs_to :cart
- belongs_to :product

ORDER 
- belongs_to :orderable (polymorphic)
- has_many :order_items
- belongs_to :shipping_detail

ORDER_ITEM
- belongs_to :order
- belongs_to :product







## License

[MIT](https://choosealicense.com/licenses/mit/)

