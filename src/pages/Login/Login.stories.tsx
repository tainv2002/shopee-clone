import type { Meta, StoryObj } from '@storybook/react'
import Login from '.'
import path from 'src/constants/path'
import RegisterLayout from 'src/layouts/RegisterLayout'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Pages/Login',
  component: Login,
  tags: ['autodocs']
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  parameters: {
    reactRouter: {
      routePath: path.login
    }
  }
}

export const LoginPage = () => <RegisterLayout />
LoginPage.story = {
  parameters: {
    reactRouter: {
      routePath: path.login,
      outlet: <Login />
    }
  }
}
