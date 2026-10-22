import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { showToast } = useCart();

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('luxery_shop_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('luxery_shop_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('luxery_shop_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Wishlist save error:', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('luxery_shop_compare', JSON.stringify(compareList));
    } catch (e) {
      console.warn('Compare save error:', e);
    }
  }, [compareList]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from your curated wishlist`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Added ${product.name} to your curated wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    showToast('Removed item from wishlist');
  };

  // Compare up to 3 perfumes
  const toggleCompare = (product) => {
    setCompareList(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from fragrance comparison`);
        return prev.filter(item => item.id !== product.id);
      } else {
        if (prev.length >= 3) {
          showToast('You can compare a maximum of 3 fragrances at once.', 'warning');
          return prev;
        }
        showToast(`Added ${product.name} to comparison`);
        setIsCompareOpen(true);
        return [...prev, product];
      }
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(item => item.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsCompareOpen(false);
  };

  const isInCompare = (productId) => {
    return compareList.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isCompareOpen,
        setIsCompareOpen
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
