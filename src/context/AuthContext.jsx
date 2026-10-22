import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { showToast } = useCart();

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('luxery_shop_user');
      const parsed = saved ? JSON.parse(saved) : null;
      // Remove the old hard-coded showcase profile; it is not a real customer account.
      if (parsed?.name === 'Lord Alistair Sterling') return null;
      return parsed;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('luxery_shop_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('luxery_shop_user');
      }
    } catch (e) {
      console.warn('Auth save error:', e);
    }
  }, [user]);

  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, message: 'Please enter your email and password.' };
    }
    const cleanEmail = email.trim();
    const newUser = {
      isLoggedIn: true,
      name: cleanEmail.split('@')[0].replace('.', ' ').toUpperCase(),
      email: cleanEmail,
      tier: 'Gold Collector VIP',
      phone: '',
      addresses: user?.addresses || [],
      orders: user?.orders || []
    };
    setUser(newUser);
    showToast(`Welcome back, ${newUser.name}`);
    return { success: true };
  };

  const register = (fullName, email, password) => {
    if (!fullName || !email || !password) {
      return { success: false, message: 'Please complete all required fields.' };
    }
    const newUser = {
      isLoggedIn: true,
      name: fullName,
      email: email.trim(),
      tier: 'Privileged Member',
      phone: '',
      addresses: [],
      orders: []
    };
    setUser(newUser);
    showToast(`Welcome to the House of Luxery Shop, ${fullName}`);
    return { success: true };
  };

  const logout = () => {
    setUser({
      isLoggedIn: false,
      name: '',
      email: '',
      tier: 'Guest',
      addresses: [],
      orders: []
    });
    showToast('You have been signed out.');
  };

  const addOrder = (orderData) => {
    setUser(prev => {
      const updatedOrders = [orderData, ...(prev?.orders || [])];
      return {
        ...(prev || {}),
        isLoggedIn: true,
        orders: updatedOrders
      };
    });
  };

  const addAddress = (newAddress) => {
    setUser(prev => {
      const addresses = [...(prev?.addresses || []), { ...newAddress, id: `addr-${Date.now()}` }];
      return {
        ...prev,
        addresses
      };
    });
    showToast('New delivery address added');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user?.isLoggedIn),
        login,
        register,
        logout,
        addOrder,
        addAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
