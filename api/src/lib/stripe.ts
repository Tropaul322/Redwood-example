import Stripe from 'stripe'

console.log(process.env.STRIPE_SK)
export const stripe = new Stripe(process.env.STRIPE_SK)
