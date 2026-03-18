import { useCartState } from './hooks/useCartState'
import { CartPage } from './components/CartPage'
import { CheckoutSuccess } from './components/CheckoutSuccess'

export default function App() {
  const state = useCartState()
  const { cartId, isPaymentComplete, renderCount } = state

  const renderCountColor =
    renderCount > 50 ? '#d32f2f' :
    renderCount > 20 ? '#f57c00' :
    '#388e3c'

  return (
    <div style={{ maxWidth: '480px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>React Race Condition Challenge</h1>

      <div style={{
        padding: '1rem',
        marginBottom: '1.5rem',
        background: '#f5f5f5',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
      }}>
        <div style={{ fontSize: '0.85rem', color: '#555' }}>Debug State</div>
        <div>
          Render count:{' '}
          <strong style={{ fontSize: '1.4rem', color: renderCountColor }}>
            {renderCount}
          </strong>
          {renderCount > 20 && (
            <span style={{ marginLeft: '0.5rem', color: '#d32f2f', fontWeight: 'bold' }}>
              ⚠ Possible loop!
            </span>
          )}
        </div>
        <div>cartId: <code>{cartId ?? 'null'}</code></div>
        <div>isPaymentComplete: <code>{String(isPaymentComplete)}</code></div>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>
          URL param: <code>{new URLSearchParams(window.location.search).get('cart') ?? 'null'}</code>
        </div>
      </div>

      <CartPage state={state} />
      <CheckoutSuccess state={state} />

      <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#fff3e0', borderRadius: '6px', fontSize: '0.85rem' }}>
        <strong>Instructions:</strong>
        <ol style={{ margin: '0.5rem 0 0', paddingLeft: '1.2rem' }}>
          <li>Click <strong>Start Checkout</strong> to set a cart ID</li>
          <li>Click <strong>Complete Payment</strong> to trigger the bug</li>
          <li>Watch the render counter and browser console</li>
          <li>Fix the race condition in <code>src/hooks/useCartState.ts</code></li>
        </ol>
      </div>
    </div>
  )
}
