import type { Meta, StoryObj } from '@storybook/react'

import CartPage from './CartPage'

const meta: Meta<typeof CartPage> = {
  component: CartPage,
}

export default meta

type Story = StoryObj<typeof CartPage>

export const Primary: Story = {}
