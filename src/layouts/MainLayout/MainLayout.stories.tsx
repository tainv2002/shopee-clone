import type { Meta, StoryObj } from '@storybook/react'
import MainLayout from '.'
import ProductDetail from 'src/pages/ProductDetail'
import path from 'src/constants/path'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Layouts/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof MainLayout>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PageProductDetail: Story = {
  parameters: {
    reactRouter: {
      routePath: `${path.home}${path.productDetail}`,
      routeParams: { nameId: 'Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-i-60afb2c76ef5b902180aacba' },
      outlet: <ProductDetail />
    }
  }
}
