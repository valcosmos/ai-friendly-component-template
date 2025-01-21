export interface TaskItem {
  id: string
  content: string
  completed: boolean
}

export interface TaskBoardProps {
  // 初始任务列表数据
  initialTasks: TaskItem[]
  // 搜索回调
  onSearch: (keyword: string) => void
  // 添加任务回调
  onTaskAdd: (task: string) => void
  // 删除任务回调
  onTaskDelete: (taskId: string) => void
  // 更新任务状态回调
  onTaskStatusChange: (taskId: string, completed: boolean) => void
}
