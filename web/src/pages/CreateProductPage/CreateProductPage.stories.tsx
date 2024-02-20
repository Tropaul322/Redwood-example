import type { Meta, StoryObj } from '@storybook/react'

import CreateProductPage from './CreateProductPage'

const meta: Meta<typeof CreateProductPage> = {
  component: CreateProductPage,
}

export default meta

type Story = StoryObj<typeof CreateProductPage>

export const Primary: Story = {}
