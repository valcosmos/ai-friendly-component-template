import type { Meta, StoryObj } from '@storybook/react'
import { TaskBoard } from './'

const meta: Meta<typeof TaskBoard> = {
  title: 'Components/TaskBoard',
  component: TaskBoard,
  parameters: {

  },
}

export default meta

type Story = StoryObj<typeof TaskBoard>

const mockTasks = [
  { id: '1', content: '任务一', completed: true },
  { id: '2', content: '任务二', completed: true },
  { id: '3', content: '任务三', completed: false },
  { id: '4', content: '任务四', completed: false },
]

export const Default: Story = {
  args: {
    initialTasks: mockTasks,
    onSearch: () => {
      // console.log('搜索:', keyword)
    },
    onTaskAdd: () => {
      // console.log('添加任务:', task)
    },
    onTaskDelete: () => {
      // console.log('删除任务:', taskId)
    },
    onTaskStatusChange: () => {
      // console.log('更新任务状态:', taskId, completed)
    },
  },
}

export const Empty: Story = {
  args: {
    initialTasks: [],
    onSearch: () => {
      // console.log('搜索:', keyword)
    },
    onTaskAdd: () => {
      // console.log('添加任务:', task)
    },
    onTaskDelete: () => {
      // console.log('删除任务:', taskId)
    },
    onTaskStatusChange: () => {
      // console.log('更新任务状态:', taskId, completed)
    },
  },
}
