class AddCartItemToOrders < ActiveRecord::Migration[5.2]
  def change
    add_reference :cart_items, :order
  end
end
