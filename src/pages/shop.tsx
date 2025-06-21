import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, Star, ChevronDown, X, Menu } from 'lucide-react';

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
  brand: string;
  deliveryDate: string;
  offers?: string[];
};

type CartItem = Product & {
  quantity: number;
};

const FlipkartShop = () => {
  // Sample product data - Flipkart style
  const productsData: Product[] = [
    {
      id: 1,
      name: 'Samsung Galaxy M34 5G (Prism Silver, 128 GB)',
      price: 18999,
      originalPrice: 20999,
      discount: 10,
      rating: 4.3,
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/b/r/f/-original-imagtypgjvqhepgz.jpeg',
      category: 'Mobiles',
      brand: 'Samsung',
      isWishlisted: false,
      deliveryDate: 'Tomorrow',
      offers: [
        'Bank Offer: 5% Cashback on Flipkart Axis Bank Card',
        'Special Price: Get extra ₹3000 off'
      ]
    },
    {
      id: 2,
      name: 'boAt Airdopes 141 Bluetooth Headset',
      price: 1299,
      originalPrice: 1999,
      discount: 35,
      rating: 4.1,
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/6/z/o/-original-imagzjg6g8kfydzy.jpeg',
      category: 'Audio',
      brand: 'boAt',
      isWishlisted: true,
      deliveryDate: 'Today',
      offers: [
        'Special Price: Get at flat ₹999'
      ]
    },
    {
      id: 3,
      name: 'Mi 5A 80 cm (32 inch) HD Ready LED Smart Android TV',
      price: 12999,
      originalPrice: 17999,
      discount: 28,
      rating: 4.4,
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/television/6/f/8/l32m7-5ain-mi-original-imagkb6gz59hg9kg.jpeg',
      category: 'Televisions',
      brand: 'Mi',
      isWishlisted: false,
      deliveryDate: 'Tomorrow',
      offers: [
        'Bank Offer: 5% Cashback on Flipkart Axis Bank Card'
      ]
    },
    {
      id: 4,
      name: 'Puma Unisex-Child Running Shoes',
      price: 999,
      originalPrice: 1999,
      discount: 50,
      rating: 4.2,
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/7/2/m/6-378702-6-puma-blue-peacoat-icy-pink-original-imagg9j5zzwkyhgh.jpeg',
      category: 'Footwear',
      brand: 'Puma',
      isWishlisted: false,
      deliveryDate: '2 days',
      offers: [
        'Special Price: Get at flat ₹899'
      ]
    },
    {
      id: 5,
      name: 'HP 15s, 11th Gen Intel Core i3-1115G4, 15.6" (39.6 cm) FHD Laptop',
      price: 34990,
      originalPrice: 42990,
      discount: 19,
      rating: 4.5,
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/computer/q/r/3/15s-fq5111tu-thin-and-light-laptop-hp-original-imag5h6vszhxgh5x.jpeg',
      category: 'Laptops',
      brand: 'HP',
      isWishlisted: false,
      deliveryDate: 'Tomorrow',
      offers: [
        'Bank Offer: 5% Cashback on Flipkart Axis Bank Card',
        'Extra ₹2000 off'
      ]
    },
    {
      id: 6,
      name: 'Kurkure Masala Munch Crisps, 60g (Pack of 12)',
      price: 240,
      originalPrice: 300,
      discount: 20,
      rating: 4.0,
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/chips/z/8/8/60-masala-munch-kurkure-12x60g-unilever-original-imagmh6gqjv9tqzf.jpeg',
      category: 'Snacks',
      brand: 'Kurkure',
      isWishlisted: false,
      deliveryDate: 'Today'
    },
    {
      id: 7,
      name: 'Nike Mens Running Shoes',
      price: 3295,
      originalPrice: 4995,
      discount: 34,
      rating: 4.3,
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/m/r/b/6-dv5454-001-nike-9-ni-44-original-imagkqyzzggzphgg.jpeg',
      category: 'Footwear',
      brand: 'Nike',
      isWishlisted: false,
      deliveryDate: 'Tomorrow',
      offers: [
        'Special Price: Get at flat ₹2995'
      ]
    },
    {
      id: 8,
      name: 'Apple iPhone 14 (Blue, 128 GB)',
      price: 61999,
      originalPrice: 69900,
      discount: 11,
      rating: 4.7,
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg',
      category: 'Mobiles',
      brand: 'Apple',
      isWishlisted: false,
      deliveryDate: '2 days',
      offers: [
        'Bank Offer: 5% Cashback on Flipkart Axis Bank Card',
        'Extra ₹4000 off'
      ]
    }
  ];

  // State management
  const [products, setProducts] = useState<Product[]>(productsData);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortOption, setSortOption] = useState('popularity');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Categories
  const categories = ['All', 'Mobiles', 'Electronics', 'Fashion', 'Home', 'Appliances', 'Beauty', 'Toys', 'Grocery'];

  // Brands
  const brands = ['Samsung', 'Apple', 'Mi', 'HP', 'Nike', 'Puma', 'boAt', 'Kurkure'];

  // Filter products
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
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
        // Default sorting by popularity (using rating as proxy)
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
    <div className="bg-gray-100 min-h-screen">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white text-center py-1 text-sm">
        Get 10% off on orders above ₹5000 | Use code FLIPKART10
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4">
          {/* Top Header */}
          <div className="flex items-center py-3">
            {/* Logo */}
            <div className="flex items-center mr-4">
              <div className="text-yellow-400 font-bold text-2xl">Flipkart</div>
              <div className="text-xs ml-1 italic text-gray-600">Plus</div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative flex">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-blue-500 text-white rounded-sm">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Login */}
            <button className="px-4 py-2 font-medium text-blue-600 hover:bg-blue-50 rounded-sm">
              Login
            </button>

            {/* Become a Seller */}
            <button className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-sm hidden md:block">
              Become a Seller
            </button>

            {/* More */}
            <div className="relative group hidden md:block">
              <button className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-sm flex items-center">
                More
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Cart */}
            <button
              className="px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-sm flex items-center relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Categories Bar */}
          <div className="flex items-center py-2 overflow-x-auto">
            <button 
              className="md:hidden mr-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 whitespace-nowrap text-sm font-medium ${selectedCategory === category ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden">
          <div className="bg-white h-full w-64 overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Menu</h3>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-medium mb-2">Categories</h4>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category}>
                    <button
                      className={`w-full text-left px-2 py-1 rounded ${selectedCategory === category ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 bg-white rounded-sm shadow p-4 h-fit sticky top-28">
            <h2 className="font-medium text-lg mb-4">Filters</h2>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-2">Categories</h3>
              <ul className="space-y-1">
                {categories.map(category => (
                  <li key={category}>
                    <button
                      className={`w-full text-left px-2 py-1 text-sm ${selectedCategory === category ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`}
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
              <h3 className="font-medium text-gray-800 mb-2">Price</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs">₹{priceRange[0]}</span>
                <span className="text-xs">₹{priceRange[1]}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full border p-1 text-sm"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full border p-1 text-sm"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                />
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-2">Brand</h3>
              <ul className="space-y-1">
                {brands.map(brand => (
                  <li key={brand}>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        onChange={() => {
                          // Filter by brand logic would go here
                        }}
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ratings */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-2">Customer Ratings</h3>
              <div className="space-y-1">
                {[4, 3, 2].map(rating => (
                  <button
                    key={rating}
                    className="flex items-center w-full text-left px-2 py-1 text-sm text-gray-700 hover:text-blue-600"
                    onClick={() => {
                      setFilteredProducts(products.filter(p => p.rating >= rating));
                    }}
                  >
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span>& Up</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              className="w-full text-blue-600 text-sm font-medium border border-blue-600 py-1 rounded-sm hover:bg-blue-50"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceRange([0, 100000]);
                setSortOption('popularity');
              }}
            >
              Clear All
            </button>
          </aside>

          {/* Product Listing */}
          <div className="flex-1">
            {/* Sorting Options */}
            <div className="bg-white rounded-sm shadow p-3 mb-4 flex flex-wrap items-center justify-between">
              <div className="text-sm text-gray-600">
                {filteredProducts.length} Items
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort By</span>
                <select
                  className="border p-1 text-sm rounded-sm"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price -- Low to High</option>
                  <option value="price-high">Price -- High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-sm shadow hover:shadow-md transition-shadow overflow-hidden"
                  >
                    {/* Product Image */}
                    <div className="relative p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-contain"
                      />
                      {/* Wishlist Button */}
                      <button
                        className={`absolute top-4 right-4 p-1 rounded-full ${product.isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart
                          className={`h-5 w-5 ${product.isWishlisted ? 'fill-red-500' : ''}`}
                        />
                      </button>
                      {/* Discount Badge */}
                      {product.discount && (
                        <div className="absolute top-4 left-0 bg-green-600 text-white text-xs px-2 py-1">
                          {product.discount}% off
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 pt-0">
                      <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-1">
                        <div className="flex items-center bg-blue-600 text-white text-xs px-1 rounded mr-2">
                          {product.rating.toFixed(1)}
                          <Star className="h-3 w-3 ml-0.5 fill-white" />
                        </div>
                        <span className="text-xs text-gray-500">
                          ({Math.floor(Math.random() * 1000) + 100})
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="font-bold text-gray-900 mr-2">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {product.offers && product.offers.length > 0 && (
                        <div className="text-xs text-green-600 mb-2">
                          {product.offers[0]}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Delivery by {product.deliveryDate}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="p-4 pt-0">
                      <button
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-1 text-sm font-medium rounded-sm"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-sm shadow p-8 text-center">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Shopping Cart */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto flex flex-col">
            {/* Cart Header */}
            <div className="p-4 border-b sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">
                  My Cart ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
                </h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex border-b pb-4">
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="font-medium text-gray-900">
                            ₹{item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-500 line-through ml-2">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border rounded">
                            <button
                              className="h-8 w-8 flex items-center justify-center"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <button
                              className="h-8 w-8 flex items-center justify-center"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="text-red-500 text-sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Looks like you haven't added anything to your cart yet
                  </p>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-sm"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Shop Now
                  </button>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t p-4 bg-white sticky bottom-0">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 mb-4">
                  <span>Total:</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 font-medium rounded-sm mb-2">
                  Place Order
                </button>
                <button
                  className="w-full border border-blue-600 text-blue-600 py-2 font-medium rounded-sm hover:bg-blue-50"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlipkartShop;
