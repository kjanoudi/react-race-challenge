import { useCallback, useEffect, useRef, useState } from 'react'

// Simulates reading/writing a ?cart= URL param
function useCartParam() {
  const getParam = () => new URLSearchParams(window.location.search).get('cart')
  const [cartParam, setCartParam] = useState(getParam)

  const setParam = useCallback((val: string | null) => {
    const url = new URL(window.location.href)
    if (val) {
      url.searchParams.set('cart', val)
    } else {
      url.searchParams.delete('cart')
    }
    // Simulate async URL update (like React Router's setSearchParams)
    setTimeout(() => {
      window.history.replaceState({}, '', url.toString())
      setCartParam(getParam())
    }, 400)
  }, [])

  return [cartParam, setParam] as const
}

export interface CartState {
  cartId: string | null
  isPaymentComplete: boolean
  renderCount: number
  simulateCheckout: (id: string) => void
  simulatePaymentComplete: () => void
}

export function useCartState(): CartState {
  const [cartParam, setCartParam] = useCartParam()
  const [cartId, setCartId] = useState<string | null>(null)
  const [isPaymentComplete, setIsPaymentComplete] = useState(false)
  const renderCount = useRef(0)
  renderCount.current++

  // Effect 1: Sync cart ID from URL param to state
  useEffect(() => {
    if (!cartId && cartParam) {
      setCartId(cartParam)
    } else if (cartId && !cartParam) {
      // URL was cleared externally
    }
  }, [cartId, cartParam])

  // Effect 2: Clear cart when payment is complete
  useEffect(() => {
    if (isPaymentComplete && cartId) {
      setCartId(null)
      setCartParam(null)  // async - cartParam stays set for ~400ms
    }
  }, [isPaymentComplete, cartId, setCartParam])

  const simulateCheckout = useCallback((id: string) => {
    setCartParam(id)
  }, [setCartParam])

  const simulatePaymentComplete = useCallback(() => {
    setIsPaymentComplete(true)
  }, [])

  return {
    cartId,
    isPaymentComplete,
    renderCount: renderCount.current,
    simulateCheckout,
    simulatePaymentComplete,
  }
}
