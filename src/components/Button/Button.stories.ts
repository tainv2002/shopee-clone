import type { Meta, StoryObj } from '@storybook/react'
import Button from '.'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      description: 'Overwritten description',
      table: {
        type: {
          summary: 'Something short',
          detail: 'Something really really long'
        }
      },
      control: {
        type: null
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled button',
      defaultValue: false
    },
    children: {
      description: 'Nội dung Button',
      table: {
        type: {
          summary: 'React.ReactNode'
          // detail: 'Something really really long'
        }
      },
      defaultValue: {
        summary: ''
      }
    },
    className: {
      description: 'class',
      table: {
        type: {
          summary: 'string'
          // detail: 'Something really really long'
        }
      },
      defaultValue: {
        summary: ''
      }
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Đăng nhập',
    className: 'w-full rounded bg-red-500 py-3 text-sm uppercase text-white hover:bg-red-600',
    isLoading: true
  }
}

export const Secondary: Story = {
  args: {
    children: 'Đăng ký',
    className: 'px-3 rounded bg-red-500 py-3 text-sm uppercase text-white hover:bg-red-600',
    isLoading: true,
    disabled: true
  }
}
