import { Product } from 'src/app/models/product.model';
import { ShoppingCartItem } from './shopping-cart-item.model';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem}){
    this.itemsMap = itemsMap || {};
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      let x = new ShoppingCartItem();
      Object.assign(x, item);
      this.items.push(x);
    }
  }

  get productIds() {
    return Object.keys(this.itemsMap);
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.id];
    return item ? item.quantity : 0;
  }


  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  get totalItemsCount() {
      let count = 0;
      for (let productId in this.itemsMap) {
          count = count + this.itemsMap[productId].quantity;
      }
      return count;
  }
}
