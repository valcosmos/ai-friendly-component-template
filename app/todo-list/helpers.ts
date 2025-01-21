import type { Task, TaskStatus } from '../components/TodoList/interface'

// 模拟数据
const mockTasks: Task[] = [
  { id: '1', description: '完成项目报告', status: 'todo' },
  { id: '2', description: '准备周会演示', status: 'done' },
  { id: '3', description: '回复客户邮件', status: 'todo' },
  { id: '4', description: '更新个人博客', status: 'todo' },
]

// 模拟 API 函数
export function mockFetch(url: string, options?: RequestInit): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let responseData: Task[] | { success: boolean } | Task

      if (url === '/api/tasks') {
        responseData = mockTasks
      }
      if (url.startsWith('/api/tasks/search')) {
        const keyword = new URL(url, 'http://dummy.com').searchParams.get('keyword') || ''
        responseData = mockTasks.filter(task => task.description.includes(keyword))
      }
      if (url === '/api/tasks' && options?.method === 'POST') {
        const newTask = JSON.parse(options.body as string)
        newTask.id = (mockTasks.length + 1).toString()
        mockTasks.unshift(newTask)
        responseData = newTask
      }
      if (url.startsWith('/api/tasks/') && options?.method === 'DELETE') {
        const taskId = url.split('/').pop()
        const index = mockTasks.findIndex(task => task.id === taskId)
        if (index !== -1) {
          mockTasks.splice(index, 1)
        }
        responseData = { success: true }
      }
      if (url.startsWith('/api/tasks/') && options?.method === 'PATCH') {
        const taskId = url.split('/').pop()
        const { status } = JSON.parse(options.body as string)
        const task = mockTasks.find(task => task.id === taskId)
        if (task) {
          task.status = status as TaskStatus
        }
        responseData = { success: true }
      }

      resolve({
        ok: true,
        json: () => Promise.resolve(responseData),
      } as Response)
    }, 300) // 模拟网络延迟
  })
}

// API 函数
export async function fetchTasks(): Promise<Task[]> {
  const response = await mockFetch('/api/tasks')
  return response.json()
}

export async function searchTasks(keyword: string): Promise<Task[]> {
  const response = await mockFetch(`/api/tasks/search?keyword=${encodeURIComponent(keyword)}`)
  return response.json()
}

export async function addTask(task: Task): Promise<Task> {
  const response = await mockFetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
  return response.json()
}

export async function deleteTask(taskId: string): Promise<{ success: boolean }> {
  const response = await mockFetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
  })
  return response.json()
}

export async function updateTaskStatus(taskId: string, status: TaskStatus): Promise<{ success: boolean }> {
  const response = await mockFetch(`/api/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })
  return response.json()
}
