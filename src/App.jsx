import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CinematicIntro } from './components/CinematicIntro';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { CompareDrawer } from './components/CompareDrawer';
import { Toast } from './components/Toast';
import { LuxuryBackground } from './components/LuxuryBackground';
import { SmoothScroll } from './components/SmoothScroll';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Wishlist } from './pages/Wishlist';
import { Account } from './pages/Account';
import { About } from './pages/About';
import { FragranceFinder } from './components/FragranceFinder';

import { PRODUCTS } from './data/products';

export function AppContent() {
  const [showIntro, setShowIntro] = useState(() => {
    // Only show prologue on first visit in session
    return !sessionStorage.getItem('luxery_shop_prologue_seen');
  });

  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleFinishIntro = () => {
    sessionStorage.setItem('luxery_shop_prologue_seen', 'true');
    setShowIntro(false);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setActivePage('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (orderData) => {
    setConfirmedOrder(orderData);
    setActivePage('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent', position: 'relative' }}>
      {/* Dynamic Golden Ambient Background, Sacred Watermark & Floating Stardust */}
      <LuxuryBackground />

      {/* Native scrolling, 24K Gold Progress Bar & Ascension Crest */}
      <SmoothScroll />


      {/* Cinematic Prologue (skippable & respects reduced-motion) */}
      {showIntro && <CinematicIntro onComplete={handleFinishIntro} />}

      {/* Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Pages */}
      <main style={{ flexGrow: 1 }}>
        {activePage === 'home' && (
          <Home
            onSelectProduct={handleSelectProduct}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'shop' && (
          <Shop
            onSelectProduct={handleSelectProduct}
            initialCategory="all"
          />
        )}

        {activePage === 'shop-men' && (
          <Shop
            onSelectProduct={handleSelectProduct}
            initialCategory="men"
          />
        )}

        {activePage === 'shop-women' && (
          <Shop
            onSelectProduct={handleSelectProduct}
            initialCategory="women"
          />
        )}

        {activePage === 'shop-unisex' && (
          <Shop
            onSelectProduct={handleSelectProduct}
            initialCategory="unisex"
          />
        )}

        {activePage === 'collections' && (
          <Shop
            onSelectProduct={handleSelectProduct}
            initialCategory="all"
          />
        )}

        {activePage === 'best-sellers' && (
          <Shop
            onSelectProduct={handleSelectProduct}
            initialCategory="all"
          />
        )}

        {activePage === 'finder' && (
          <div style={{ backgroundColor: '#090909', paddingTop: '120px', paddingBottom: '6rem' }}>
            <div className="container">
              <FragranceFinder onSelectProduct={handleSelectProduct} />
            </div>
          </div>
        )}

        {activePage === 'product-details' && (
          <ProductDetails
            product={selectedProduct}
            onSelectProduct={handleSelectProduct}
            onBuyNow={() => setActivePage('checkout')}
          />
        )}

        {activePage === 'cart' && (
          <Cart
            onCheckout={() => setActivePage('checkout')}
            onContinueShopping={() => setActivePage('shop')}
          />
        )}

        {activePage === 'checkout' && (
          <Checkout
            onOrderSuccess={handleOrderSuccess}
            onBackToCart={() => setActivePage('cart')}
          />
        )}

        {activePage === 'order-confirmation' && (
          <OrderConfirmation
            order={confirmedOrder}
            onContinueShopping={() => setActivePage('shop')}
          />
        )}

        {activePage === 'wishlist' && (
          <Wishlist
            onSelectProduct={handleSelectProduct}
            onExplore={() => setActivePage('shop')}
          />
        )}

        {activePage === 'account' && (
          <Account
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePage === 'about' && (
          <About
            onExploreShop={() => setActivePage('shop')}
          />
        )}
      </main>

      {/* Global Interactive Overlays */}
      <CartDrawer
        onCheckout={() => setActivePage('checkout')}
        onViewCart={() => setActivePage('cart')}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      <CompareDrawer
        onSelectProduct={handleSelectProduct}
      />

      <Toast />

      {/* Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
