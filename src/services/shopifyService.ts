import Client from 'shopify-buy';

interface ShopifyConfig {
  domain: string;
  storefrontAccessToken: string;
}

class ShopifyService {
  private client: any;
  private cart: any = null;

  constructor(config: ShopifyConfig) {
    this.client = Client.buildClient({
      domain: config.domain,
      storefrontAccessToken: config.storefrontAccessToken
    });
  }

  async initializeCart() {
    if (!this.cart) {
      this.cart = await this.client.checkout.create();
    }
    return this.cart;
  }

  async addToCart(variantId: string, quantity: number = 1) {
    await this.initializeCart();
    
    const lineItemsToAdd = [{
      variantId: variantId,
      quantity: quantity
    }];

    const updatedCart = await this.client.checkout.addLineItems(this.cart.id, lineItemsToAdd);
    this.cart = updatedCart;
    return updatedCart;
  }

  async getCart() {
    if (!this.cart) {
      await this.initializeCart();
    }
    return this.cart;
  }

  getCheckoutUrl() {
    return this.cart?.webUrl || '';
  }

  getCartItemCount() {
    return this.cart?.lineItems?.length || 0;
  }
}

export const shopifyService = new ShopifyService({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN || 'your-shop.myshopify.com',
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN || 'your-token'
});
