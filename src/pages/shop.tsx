import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, Star, ChevronDown, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';

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
  // Sample product data
  const productsData: Product[] = [
    {
      id: 1,
      name: 'Hello Kitty Plush Toy (30cm)',
      price: 24.99,
      originalPrice: 29.99,
      discount: 17,
      rating: 4.5,
      image: '/products/plush-toy.jpg',
      category: 'Toys',
      isWishlisted: false,
    },
    {
      id: 2,
      name: 'Hello Kitty Backpack (Pink)',
      price: 19.99,
      originalPrice: 24.99,
      discount: 20,
      rating: 4.2,
      image: '/products/backpack.jpg',
      category: 'Accessories',
      isWishlisted: true,
    },
    {
      id: 3,
      name: 'Hello Kitty Stationery Set',
      price: 12.99,
      originalPrice: 15.99,
      discount: 19,
      rating: 4.7,
      image: '/products/stationery.jpg',
      category: 'Stationery',
      isWishlisted: false,
    },
    {
      id: 4,
      name: 'Hello Kitty Water Bottle',
      price: 8.99,
      originalPrice: 10.99,
      discount: 18,
      rating: 4.3,
      image: '/products/bottle.jpg',
      category: 'Accessories',
      isWishlisted: false,
    },
    {
      id: 5,
      name: 'Hello Kitty Lunch Box',
      price: 14.99,
      originalPrice: 17.99,
      discount: 17,
      rating: 4.1,
      image: '/products/lunchbox.jpg',
      category: 'Accessories',
      isWishlisted: false,
    },
    {
      id: 6,
      name: 'Hello Kitty Slippers',
      price: 9.99,
      originalPrice: 12.99,
      discount: 23,
      rating: 4.4,
      image: '/products/slippers.jpg',
      category: 'Clothing',
      isWishlisted: false,
    },
    {
      id: 7,
      name: 'Hello Kitty Makeup Set',
      price: 16.99,
      originalPrice: 19.99,
      discount: 15,
      rating: 4.0,
      image: '/products/makeup.jpg',
      category: 'Beauty',
      isWishlisted: false,
    },
    {
      id: 8,
      name: 'Hello Kitty Jewelry Box',
      price: 22.99,
      originalPrice: 27.99,
      discount: 18,
      rating: 4.6,
      image: '/products/jewelry-box.jpg',
      category: 'Decor',
      isWishlisted: false,
    },
  ];

  // State management
  const [products, setProducts] = useState<Product[]>(productsData);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortOption, setSortOption] = useState('popularity');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);

  // Categories
  const categories = ['All', 'Toys', 'Accessories', 'Stationery', 'Clothing', 'Beauty', 'Decor'];

  // Filter products based on search, category, and price range
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        // Default sorting by popularity (we'll use rating as proxy)
        result.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, sortOption, priceRange, products]);

  // Cart functions
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist functions
  const toggleWishlist = (productId: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, isWishlisted: !product.isWishlisted }
          : product
      )
    );
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

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for Hello Kitty products..."
                  className="pl-10 pr-4 py-2 w-full rounded-full border-0 focus-visible:ring-2 focus-visible:ring-pink-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-pink-500" />
              </div>
            </div>

            {/* Cart Button */}
            <Button
              variant="ghost"
              className="relative p-2 rounded-full hover:bg-pink-700"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-pink-800 text-white">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
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
                    <Button
                      variant={selectedCategory === category ? 'default' : 'ghost'}
                      className={`w-full justify-start ${selectedCategory === category ? 'bg-pink-100 text-pink-800' : 'text-pink-700'}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
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
                  <Button
                    key={rating}
                    variant="ghost"
                    className="w-full justify-start text-pink-700"
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
                  </Button>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-pink-500 text-pink-600 hover:bg-pink-50"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceRange([0, 50]);
                setSortOption('popularity');
              }}
            >
              Clear All Filters
            </Button>
          </aside>

          {/* Product Listing */}
          <div className="flex-1">
            {/* Sorting Options */}
            <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap items-center justify-between">
              <div className="text-sm text-pink-700">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-pink-700">Sort by:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-pink-700">
                      {sortOption === 'popularity' && 'Popularity'}
                      {sortOption === 'price-low' && 'Price: Low to High'}
                      {sortOption === 'price-high' && 'Price: High to Low'}
                      {sortOption === 'rating' && 'Customer Rating'}
                      {sortOption === 'discount' && 'Discount'}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem onClick={() => setSortOption('popularity')}>
                      Popularity
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('price-low')}>
                      Price: Low to High
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('price-high')}>
                      Price: High to Low
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('rating')}>
                      Customer Rating
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('discount')}>
                      Discount
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Products Grid */}
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute top-2 right-2 rounded-full ${product.isWishlisted ? 'bg-pink-100 text-pink-600' : 'bg-white/80 text-gray-600'}`}
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart
                          className={`h-5 w-5 ${product.isWishlisted ? 'fill-pink-500' : ''}`}
                        />
                      </Button>
                      {/* Discount Badge */}
                      {product.discount && (
                        <Badge className="absolute top-2 left-2 bg-pink-600 text-white">
                          {product.discount}% OFF
                        </Badge>
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
                      <Button
                        className="w-full bg-pink-600 hover:bg-pink-700"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </Button>
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

      {/* Shopping Cart Drawer */}
      <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DrawerContent className="max-h-[80vh]">
          <div className="overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle className="flex items-center justify-between">
                <span>Shopping Cart ({cartItemCount} items)</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCartOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </DrawerTitle>
            </DrawerHeader>

            <div className="px-4 pb-4">
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
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="px-2">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
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
                  <Button
                    className="bg-pink-600 hover:bg-pink-700"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <DrawerFooter>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </DrawerFooter>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Shop;
