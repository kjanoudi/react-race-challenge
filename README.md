# React Race Condition Challenge

A minimal React app reproducing a real production race condition between two competing `useEffect` hooks.

## Setup

```bash
npm install
npm run dev
```

## The Challenge

Open `src/hooks/useCartState.ts`.

1. Click **"Start Checkout"** — this sets a cart ID in the URL param
2. Click **"Complete Payment"** — this should clear the cart
3. Watch the **render counter** and your browser console

You'll see an infinite render loop. Find the race condition and fix it.

## Rules

- Fix is only in `src/hooks/useCartState.ts`
- Do not remove either `useEffect` — fix the race between them
- After your fix: clicking "Complete Payment" should clear the cart cleanly in ≤4 renders with no console errors

## Hint (only read if stuck for >5 minutes)

<details>
<summary>Hint</summary>
The URL param update in Effect 2 is asynchronous. By the time the next render happens, `cartParam` still has the old value — which triggers Effect 1 to re-adopt it.
</details>
