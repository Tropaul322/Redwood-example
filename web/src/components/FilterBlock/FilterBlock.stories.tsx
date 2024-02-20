// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import FilterBlock from './FilterBlock'

const meta: Meta<typeof FilterBlock> = {
  component: FilterBlock,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof FilterBlock>

export const Primary: Story = {}
