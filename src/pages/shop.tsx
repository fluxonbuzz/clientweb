import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, Star, ChevronDown, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Remove the missing Input import and replace with native input
// import { Input } from '@/components/ui/input';
// Remove other missing component imports
// import { Badge } from '@/components/ui/badge';
// Remove dropdown and drawer components if you don't have them
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  image: string;
  category: string;
  isWishlisted: boolean;
};

type CartItem = Product & {
  quantity: number;
};

const Shop = () => {
  // Sample product data - unchanged
  const productsData: Product[] = [
    // ... (keep your existing product data)
  ];

  // State management - unchanged
  const [products, setProducts] = useState<Product[]>(productsData);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortOption, setSortOption] = useState('popularity');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);

  // Categories - unchanged
  const categories = ['All', 'Toys', 'Accessories', 'Stationery', 'Clothing', 'Beauty', 'Decor'];

  // Filter products - unchanged
  useEffect(() => {
    // ... (keep your existing useEffect logic)
  }, [searchQuery, selectedCategory, sortOption, priceRange, products]);

  // Cart functions - unchanged
  const addToCart = (product: Product) => {
    // ... (keep your existing cart functions)
  };

  const removeFromCart = (productId: number) => {
    // ... (keep your existing function)
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    // ... (keep your existing function)
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist functions - unchanged
  const toggleWishlist = (productId: number) => {
    // ... (keep your existing function)
  };

  return (
    <div className="bg-pink-50 min-h-screen">
      {/* Header */}
      <header className="bg-pink-600 text-white sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Saanvi's Hello Kitty Shop</h1>
            </div>

            {/* Search Bar - replaced Input with native input */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for Hello Kitty products..."
                  className="pl-10 pr-4 py-2 w-full rounded-full border-0 focus-visible:ring-2 focus-visible:ring-pink-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-pink-500" />
              </div>
            </div>

            {/* Cart Button - removed Badge */}
            <button
              className="relative p-2 rounded-full hover:bg-pink-700"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-pink-800 text-white text-xs rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 bg-white rounded-lg shadow p-4 h-fit sticky top-20">
            <h2 className="text-lg font-semibold mb-4 text-pink-800">Filters</h2>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium text-pink-700 mb-2">Categories</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category}>
                    <button
                      className={`w-full text-left px-4 py-2 rounded ${
                        selectedCategory === category 
                          ? 'bg-pink-100 text-pink-800' 
                          : 'text-pink-700 hover:bg-pink-50'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium text-pink-700 mb-2">Price Range</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-pink-600">${priceRange[0]}</span>
                <span className="text-sm text-pink-600">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-pink-500"
              />
            </div>

            {/* Ratings Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-pink-700 mb-2">Customer Ratings</h3>
              <div className="space-y-2">
                {[4, 3, 2].map(rating => (
                  <button
                    key={rating}
                    className="w-full text-left px-4 py-2 rounded text-pink-700 hover:bg-pink-50"
                    onClick={() => {
                      setFilteredProducts(
                        products.filter(p => p.rating >= rating)
                      );
                    }}
                  >
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < rating ? 'fill-pink-500 text-pink-500' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-2">& Up</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              className="w-full px-4 py-2 border border-pink-500 text-pink-600 hover:bg-pink-50 rounded"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceRange([0, 50]);
                setSortOption('popularity');
              }}
            >
              Clear All Filters
            </button>
          </aside>

          {/* Product Listing */}
          <div className="flex-1">
            {/* Sorting Options - simplified without Dropdown */}
            <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap items-center justify-between">
              <div className="text-sm text-pink-700">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-pink-700">Sort by:</span>
                <select 
                  className="border rounded px-3 py-1 text-pink-700"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

            {/* Products Grid - unchanged */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {/* Wishlist Button */}
                      <button
                        className={`absolute top-2 right-2 rounded-full p-2 ${
                          product.isWishlisted ? 'bg-pink-100 text-pink-600' : 'bg-white/80 text-gray-600'
                        }`}
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart
                          className={`h-5 w-5 ${product.isWishlisted ? 'fill-pink-500' : ''}`}
                        />
                      </button>
                      {/* Discount Badge - replaced Badge with span */}
                      {product.discount && (
                        <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
                          {product.discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-medium text-pink-900 mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-pink-500 text-pink-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.rating.toFixed(1)})
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-pink-700 mr-2">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="px-4 pb-4">
                      <button
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Search className="mx-auto h-12 w-12 text-pink-400 mb-4" />
                <h3 className="text-lg font-medium text-pink-800 mb-2">
                  No products found
                </h3>
                <p className="text-pink-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Shopping Cart - replaced Drawer with simple modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Shopping Cart ({cartItemCount} items)</h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-pink-900">{item.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-pink-700 font-medium">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded">
                            <button
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="text-red-500 hover:text-red-600 text-sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-pink-800">
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded">
                      Proceed to Checkout
                    </button>
                    <button
                      className="w-full border border-pink-600 text-pink-600 py-2 rounded"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto h-12 w-12 text-pink-400 mb-4" />
                  <h3 className="text-lg font-medium text-pink-800 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-pink-600 mb-4">
                    Looks like you haven't added anything to your cart yet
                  </p>
                  <button
                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
