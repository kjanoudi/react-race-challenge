import { CartState } from '../hooks/useCartState'

interface CheckoutSuccessProps {
  state: CartState
}

export function CheckoutSuccess({ state }: CheckoutSuccessProps) {
  const { cartId, isPaymentComplete, simulatePaymentComplete } = state

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '1rem' }}>
      <h2>Payment</h2>
      <p>Status: <strong>{isPaymentComplete ? 'Complete' : 'Pending'}</strong></p>
      <button
        onClick={simulatePaymentComplete}
        disabled={!cartId || isPaymentComplete}
        style={{
          padding: '0.5rem 1rem',
          cursor: (!cartId || isPaymentComplete) ? 'not-allowed' : 'pointer',
          background: isPaymentComplete ? '#4caf50' : undefined,
          color: isPaymentComplete ? 'white' : undefined,
        }}
      >
        {isPaymentComplete ? 'Payment Completed' : 'Complete Payment'}
      </button>
    </div>
  )
}
