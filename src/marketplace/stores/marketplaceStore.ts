/**
 * MARKETPLACE ZUSTAND STORE
 * 
 * Central state management for the creator marketplace.
 * Handles products, services, cart, orders, and user marketplace profile.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  Product,
  Service,
  CreatorProfile,
  Order,
  CartItem,
  MarketplaceFilters,
  ProgrammeId,
  Review,
  ProductVariant,
  ItemType
} from '../types';

// ============================================
// STATE INTERFACE
// ============================================

interface MarketplaceState {
  // Listings
  products: Product[];
  services: Service[];
  creators: CreatorProfile[];
  
  // User's marketplace data
  userProfile: CreatorProfile | null;
  userProducts: Product[];
  userServices: Service[];
  userOrders: Order[];
  
  // Cart
  cart: CartItem[];
  
  // Filters & Search
  filters: MarketplaceFilters;
  searchResults: {
    products: Product[];
    services: Service[];
    creators: CreatorProfile[];
  };
  
  // UI State
  isLoading: boolean;
  error: string | null;
  
  // Selected items for detail views
  selectedProduct: Product | null;
  selectedService: Service | null;
  selectedCreator: CreatorProfile | null;
  selectedOrder: Order | null;
}

interface MarketplaceActions {
  // Product actions
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  
  // Service actions
  setServices: (services: Service[]) => void;
  addService: (service: Service) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  setSelectedService: (service: Service | null) => void;
  
  // Creator actions
  setCreators: (creators: CreatorProfile[]) => void;
  setSelectedCreator: (creator: CreatorProfile | null) => void;
  
  // User profile actions
  setUserProfile: (profile: CreatorProfile | null) => void;
  updateUserProfile: (updates: Partial<CreatorProfile>) => void;
  setUserProducts: (products: Product[]) => void;
  setUserServices: (services: Service[]) => void;
  
  // Cart actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartRevenueSplit: () => {
    creators: { id: string; name: string; amount: number }[];
    community: number;
    operations: number;
  };
  
  // Order actions
  setUserOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  setSelectedOrder: (order: Order | null) => void;
  
  // Filter actions
  setFilters: (filters: Partial<MarketplaceFilters>) => void;
  clearFilters: () => void;
  setSearchQuery: (query: string) => void;
  
  // Search
  search: (query: string) => void;
  
  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Utility
  getProductById: (id: string) => Product | undefined;
  getServiceById: (id: string) => Service | undefined;
  getCreatorById: (id: string) => CreatorProfile | undefined;
  getProductsByCreator: (creatorId: string) => Product[];
  getServicesByCreator: (creatorId: string) => Service[];
  getProductsByProgramme: (programmeId: ProgrammeId) => Product[];
  getServicesByProgramme: (programmeId: ProgrammeId) => Service[];
  
  // Reviews
  addReview: (productOrServiceId: string, type: ItemType, review: Review) => void;
}

// ============================================
// DEFAULT STATE
// ============================================

const defaultFilters: MarketplaceFilters = {
  search: '',
  category: undefined,
  programmeId: undefined,
  priceRange: undefined,
  location: undefined,
  deliveryMethod: undefined,
  rating: undefined,
  sortBy: 'newest'
};

const initialState: MarketplaceState = {
  products: [],
  services: [],
  creators: [],
  userProfile: null,
  userProducts: [],
  userServices: [],
  userOrders: [],
  cart: [],
  filters: defaultFilters,
  searchResults: {
    products: [],
    services: [],
    creators: []
  },
  isLoading: false,
  error: null,
  selectedProduct: null,
  selectedService: null,
  selectedCreator: null,
  selectedOrder: null
};

// ============================================
// STORE
// ============================================

export const useMarketplaceStore = create<MarketplaceState & MarketplaceActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // ==========================================
      // PRODUCT ACTIONS
      // ==========================================
      
      setProducts: (products) => set({ products }),
      
      addProduct: (product) => set((state) => ({
        products: [...state.products, product],
        userProducts: product.creatorId === state.userProfile?.id 
          ? [...state.userProducts, product]
          : state.userProducts
      })),
      
      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, ...updates, lastUpdated: new Date() } : p
        ),
        userProducts: state.userProducts.map((p) =>
          p.id === id ? { ...p, ...updates, lastUpdated: new Date() } : p
        ),
        selectedProduct: state.selectedProduct?.id === id
          ? { ...state.selectedProduct, ...updates, lastUpdated: new Date() }
          : state.selectedProduct
      })),
      
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        userProducts: state.userProducts.filter((p) => p.id !== id),
        selectedProduct: state.selectedProduct?.id === id ? null : state.selectedProduct
      })),
      
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      
      // ==========================================
      // SERVICE ACTIONS
      // ==========================================
      
      setServices: (services) => set({ services }),
      
      addService: (service) => set((state) => ({
        services: [...state.services, service],
        userServices: service.creatorId === state.userProfile?.id
          ? [...state.userServices, service]
          : state.userServices
      })),
      
      updateService: (id, updates) => set((state) => ({
        services: state.services.map((s) =>
          s.id === id ? { ...s, ...updates, lastUpdated: new Date() } : s
        ),
        userServices: state.userServices.map((s) =>
          s.id === id ? { ...s, ...updates, lastUpdated: new Date() } : s
        ),
        selectedService: state.selectedService?.id === id
          ? { ...state.selectedService, ...updates, lastUpdated: new Date() }
          : state.selectedService
      })),
      
      deleteService: (id) => set((state) => ({
        services: state.services.filter((s) => s.id !== id),
        userServices: state.userServices.filter((s) => s.id !== id),
        selectedService: state.selectedService?.id === id ? null : state.selectedService
      })),
      
      setSelectedService: (service) => set({ selectedService: service }),
      
      // ==========================================
      // CREATOR ACTIONS
      // ==========================================
      
      setCreators: (creators) => set({ creators }),
      
      setSelectedCreator: (creator) => set({ selectedCreator: creator }),
      
      // ==========================================
      // USER PROFILE ACTIONS
      // ==========================================
      
      setUserProfile: (profile) => set({ userProfile: profile }),
      
      updateUserProfile: (updates) => set((state) => ({
        userProfile: state.userProfile
          ? { ...state.userProfile, ...updates, lastActive: new Date() }
          : null
      })),
      
      setUserProducts: (products) => set({ userProducts: products }),
      
      setUserServices: (services) => set({ userServices: services }),
      
      // ==========================================
      // CART ACTIONS
      // ==========================================
      
      addToCart: (item) => set((state) => {
        const existingIndex = state.cart.findIndex(
          (i) => i.itemId === item.itemId && 
                 i.type === item.type &&
                 i.variant?.id === item.variant?.id
        );
        
        if (existingIndex >= 0) {
          // Update quantity if item exists
          const newCart = [...state.cart];
          newCart[existingIndex] = {
            ...newCart[existingIndex],
            quantity: newCart[existingIndex].quantity + item.quantity,
            totalPrice: (newCart[existingIndex].quantity + item.quantity) * item.unitPrice
          };
          return { cart: newCart };
        }
        
        // Add new item
        return { cart: [...state.cart, item] };
      }),
      
      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== itemId)
      })),
      
      updateCartQuantity: (itemId, quantity) => set((state) => {
        if (quantity <= 0) {
          return { cart: state.cart.filter((item) => item.id !== itemId) };
        }
        
        return {
          cart: state.cart.map((item) =>
            item.id === itemId
              ? { ...item, quantity, totalPrice: quantity * item.unitPrice }
              : item
          )
        };
      }),
      
      clearCart: () => set({ cart: [] }),
      
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.totalPrice, 0);
      },
      
      getCartRevenueSplit: () => {
        const { cart, creators } = get();
        
        const creatorAmounts: Record<string, number> = {};
        let totalCommunity = 0;
        let totalOperations = 0;
        
        cart.forEach((item) => {
          // Different splits for different types
          let creatorShare: number;
          let communityShare: number;
          const operationsShare = 0.20;
          
          switch (item.type) {
            case 'service':
              creatorShare = 0.60;
              communityShare = 0.20;
              break;
            case 'package':
              creatorShare = 0.58;
              communityShare = 0.22;
              break;
            default: // product
              creatorShare = 0.55;
              communityShare = 0.25;
          }
          
          const creatorAmount = item.totalPrice * creatorShare;
          const communityAmount = item.totalPrice * communityShare;
          const operationsAmount = item.totalPrice * operationsShare;
          
          creatorAmounts[item.creatorId] = (creatorAmounts[item.creatorId] || 0) + creatorAmount;
          totalCommunity += communityAmount;
          totalOperations += operationsAmount;
        });
        
        const creatorsList = Object.entries(creatorAmounts).map(([id, amount]) => {
          const creator = creators.find((c) => c.id === id);
          return {
            id,
            name: creator?.displayName || 'Creator',
            amount: Math.round(amount * 100) / 100
          };
        });
        
        return {
          creators: creatorsList,
          community: Math.round(totalCommunity * 100) / 100,
          operations: Math.round(totalOperations * 100) / 100
        };
      },
      
      // ==========================================
      // ORDER ACTIONS
      // ==========================================
      
      setUserOrders: (orders) => set({ userOrders: orders }),
      
      addOrder: (order) => set((state) => ({
        userOrders: [order, ...state.userOrders]
      })),
      
      updateOrder: (id, updates) => set((state) => ({
        userOrders: state.userOrders.map((o) =>
          o.id === id ? { ...o, ...updates } : o
        ),
        selectedOrder: state.selectedOrder?.id === id
          ? { ...state.selectedOrder, ...updates }
          : state.selectedOrder
      })),
      
      setSelectedOrder: (order) => set({ selectedOrder: order }),
      
      // ==========================================
      // FILTER ACTIONS
      // ==========================================
      
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),
      
      clearFilters: () => set({ filters: defaultFilters }),
      
      setSearchQuery: (query) => set((state) => ({
        filters: { ...state.filters, search: query }
      })),
      
      // ==========================================
      // SEARCH
      // ==========================================
      
      search: (query) => {
        const { products, services, creators, filters } = get();
        const searchLower = query.toLowerCase();
        
        let filteredProducts = products.filter((p) => {
          const matchesSearch = !query || 
            p.title.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.tags.some((t) => t.toLowerCase().includes(searchLower));
          
          const matchesCategory = !filters.category || p.category === filters.category;
          const matchesProgramme = !filters.programmeId || p.programmeId === filters.programmeId;
          const matchesPrice = !filters.priceRange || (
            p.pricing.basePrice >= filters.priceRange.min &&
            p.pricing.basePrice <= filters.priceRange.max
          );
          const matchesDelivery = !filters.deliveryMethod || p.deliveryMethod === filters.deliveryMethod;
          const matchesRating = !filters.rating || p.averageRating >= filters.rating;
          
          return matchesSearch && matchesCategory && matchesProgramme && 
                 matchesPrice && matchesDelivery && matchesRating;
        });
        
        let filteredServices = services.filter((s) => {
          const matchesSearch = !query ||
            s.title.toLowerCase().includes(searchLower) ||
            s.description.toLowerCase().includes(searchLower) ||
            s.tags.some((t) => t.toLowerCase().includes(searchLower));
          
          const matchesCategory = !filters.category || s.category === filters.category;
          const matchesProgramme = !filters.programmeId || s.programmeId === filters.programmeId;
          const matchesDelivery = !filters.deliveryMethod || s.deliveryMethod === filters.deliveryMethod;
          const matchesRating = !filters.rating || s.averageRating >= filters.rating;
          
          return matchesSearch && matchesCategory && matchesProgramme && 
                 matchesDelivery && matchesRating;
        });
        
        let filteredCreators = creators.filter((c) => {
          const matchesSearch = !query ||
            c.displayName.toLowerCase().includes(searchLower) ||
            c.tagline.toLowerCase().includes(searchLower) ||
            c.bio.toLowerCase().includes(searchLower);
          
          const matchesProgramme = !filters.programmeId || 
            c.completedProgrammes.some((p) => p.programmeId === filters.programmeId);
          
          const matchesLocation = !filters.location ||
            c.location.area.toLowerCase().includes(filters.location.toLowerCase()) ||
            c.location.borough.toLowerCase().includes(filters.location.toLowerCase());
          
          const matchesRating = !filters.rating || c.ratings.overall >= filters.rating;
          
          return matchesSearch && matchesProgramme && matchesLocation && matchesRating;
        });
        
        // Sort products
        switch (filters.sortBy) {
          case 'newest':
            filteredProducts.sort((a, b) => 
              new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
            );
            break;
          case 'popular':
            filteredProducts.sort((a, b) => b.sales - a.sales);
            break;
          case 'price-low':
            filteredProducts.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
            break;
          case 'price-high':
            filteredProducts.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
            break;
          case 'rating':
            filteredProducts.sort((a, b) => b.averageRating - a.averageRating);
            break;
        }
        
        set({
          searchResults: {
            products: filteredProducts,
            services: filteredServices,
            creators: filteredCreators
          }
        });
      },
      
      // ==========================================
      // UI ACTIONS
      // ==========================================
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      // ==========================================
      // UTILITY METHODS
      // ==========================================
      
      getProductById: (id) => get().products.find((p) => p.id === id),
      
      getServiceById: (id) => get().services.find((s) => s.id === id),
      
      getCreatorById: (id) => get().creators.find((c) => c.id === id),
      
      getProductsByCreator: (creatorId) => 
        get().products.filter((p) => p.creatorId === creatorId),
      
      getServicesByCreator: (creatorId) =>
        get().services.filter((s) => s.creatorId === creatorId),
      
      getProductsByProgramme: (programmeId) =>
        get().products.filter((p) => p.programmeId === programmeId),
      
      getServicesByProgramme: (programmeId) =>
        get().services.filter((s) => s.programmeId === programmeId),
      
      // ==========================================
      // REVIEWS
      // ==========================================
      
      addReview: (itemId, type, review) => {
        if (type === 'product') {
          set((state) => ({
            products: state.products.map((p) => {
              if (p.id === itemId) {
                const newReviews = [...p.reviews, review];
                const avgRating = newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;
                return {
                  ...p,
                  reviews: newReviews,
                  averageRating: Math.round(avgRating * 10) / 10
                };
              }
              return p;
            })
          }));
        } else if (type === 'service') {
          set((state) => ({
            services: state.services.map((s) => {
              if (s.id === itemId) {
                const newReviews = [...s.reviews, review];
                const avgRating = newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;
                return {
                  ...s,
                  reviews: newReviews,
                  averageRating: Math.round(avgRating * 10) / 10
                };
              }
              return s;
            })
          }));
        }
        // Note: package reviews would need additional handling if packages become their own entity
      }
    }),
    {
      name: 'ww-marketplace-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        filters: state.filters,
        userProfile: state.userProfile,
        userProducts: state.userProducts,
        userServices: state.userServices,
        userOrders: state.userOrders
      })
    }
  )
);

// ============================================
// SELECTORS (for optimised re-renders)
// ============================================

export const selectProducts = (state: MarketplaceState) => state.products;
export const selectServices = (state: MarketplaceState) => state.services;
export const selectCreators = (state: MarketplaceState) => state.creators;
export const selectCart = (state: MarketplaceState) => state.cart;
export const selectCartCount = (state: MarketplaceState) => 
  state.cart.reduce((count, item) => count + item.quantity, 0);
export const selectUserProfile = (state: MarketplaceState) => state.userProfile;
export const selectUserProducts = (state: MarketplaceState) => state.userProducts;
export const selectUserServices = (state: MarketplaceState) => state.userServices;
export const selectUserOrders = (state: MarketplaceState) => state.userOrders;
export const selectFilters = (state: MarketplaceState) => state.filters;
export const selectSearchResults = (state: MarketplaceState) => state.searchResults;
export const selectIsLoading = (state: MarketplaceState) => state.isLoading;
export const selectError = (state: MarketplaceState) => state.error;
export const selectSelectedProduct = (state: MarketplaceState) => state.selectedProduct;
export const selectSelectedService = (state: MarketplaceState) => state.selectedService;
export const selectSelectedCreator = (state: MarketplaceState) => state.selectedCreator;

// ============================================
// HELPER HOOKS
// ============================================

export const useCart = () => useMarketplaceStore((state) => ({
  cart: state.cart,
  addToCart: state.addToCart,
  removeFromCart: state.removeFromCart,
  updateCartQuantity: state.updateCartQuantity,
  clearCart: state.clearCart,
  getCartTotal: state.getCartTotal,
  getCartRevenueSplit: state.getCartRevenueSplit,
  itemCount: state.cart.reduce((count, item) => count + item.quantity, 0)
}));

export const useCreatorDashboard = () => useMarketplaceStore((state) => ({
  profile: state.userProfile,
  products: state.userProducts,
  services: state.userServices,
  orders: state.userOrders,
  updateProfile: state.updateUserProfile,
  addProduct: state.addProduct,
  updateProduct: state.updateProduct,
  deleteProduct: state.deleteProduct,
  addService: state.addService,
  updateService: state.updateService,
  deleteService: state.deleteService
}));

export const useMarketplaceBrowse = () => useMarketplaceStore((state) => ({
  products: state.products,
  services: state.services,
  creators: state.creators,
  filters: state.filters,
  searchResults: state.searchResults,
  setFilters: state.setFilters,
  clearFilters: state.clearFilters,
  search: state.search,
  isLoading: state.isLoading
}));

// ============================================
// EXPORT
// ============================================

export default useMarketplaceStore;
