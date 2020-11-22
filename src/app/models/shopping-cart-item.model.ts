import { Product } from 'src/app/models/product.model';

export interface ShoppingCartItem {
  product: Product;
  quantity: number;
}
