import { CartState } from '../hooks/useCartState'

interface CartPageProps {
  state: CartState
}

export function CartPage({ state }: CartPageProps) {
  const { cartId, simulateCheckout } = state

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '1rem' }}>
      <h2>Cart</h2>
      {cartId ? (
        <p>Cart ID: <code>{cartId}</code></p>
      ) : (
        <p style={{ color: '#888' }}>No active cart</p>
      )}
      <button
        onClick={() => simulateCheckout('cart-' + Math.random().toString(36).slice(2, 8))}
        disabled={!!cartId}
        style={{ padding: '0.5rem 1rem', cursor: cartId ? 'not-allowed' : 'pointer' }}
      >
        Start Checkout
      </button>
    </div>
  )
}
