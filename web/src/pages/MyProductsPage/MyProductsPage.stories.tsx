import type { Meta, StoryObj } from '@storybook/react'

import MyProductsPage from './MyProductsPage'

const meta: Meta<typeof MyProductsPage> = {
  component: MyProductsPage,
}

export default meta

type Story = StoryObj<typeof MyProductsPage>

export const Primary: Story = {}
