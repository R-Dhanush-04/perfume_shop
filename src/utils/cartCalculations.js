export const FREE_SHIPPING_THRESHOLD = 3000;
export const STANDARD_SHIPPING_FEE = 199;
export const EXPRESS_WHITE_GLOVE_FEE = 499;

export function calculateCartTotals(items, coupon = null, shippingMethod = 'standard') {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  let discount = 0;
  if (coupon && coupon.discountPercent && subtotal >= (coupon.minSpend || 0)) {
    discount = Math.round((subtotal * coupon.discountPercent) / 100);
  }

  const taxableAmount = Math.max(0, subtotal - discount);

  let shipping = 0;
  if (items.length > 0) {
    if (shippingMethod === 'white-glove') {
      shipping = EXPRESS_WHITE_GLOVE_FEE;
    } else {
      shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
    }
  }

  // 18% GST (already inclusive in luxury retail, but we show breakdown)
  const gst = Math.round(taxableAmount * 0.18 / 1.18);
  const total = taxableAmount + shipping;

  return {
    subtotal,
    discount,
    shipping,
    gst,
    total,
    freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  };
}
