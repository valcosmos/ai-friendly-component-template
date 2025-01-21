import type { TaskBoardProps, TaskItem } from './interface'
import { Button, Checkbox, Input, List } from 'antd'
import React, { useState } from 'react'

const { Search } = Input

const TaskBoard: React.FC<TaskBoardProps> = ({
  initialTasks,
  onSearch,
  onTaskAdd,
  onTaskDelete,
  onTaskStatusChange,
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newTask, setNewTask] = useState('')

  const handleAdd = () => {
    if (newTask.trim()) {
      onTaskAdd(newTask)
      setNewTask('')
      setIsAdding(false)
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">任务管理面板</h1>

      <div className="flex gap-4 mb-4">
        <Search
          placeholder="请输入任务进行搜索"
          onSearch={onSearch}
          className="flex-1"
        />
        <Button type="primary" onClick={() => setIsAdding(true)}>
          新增任务
        </Button>
      </div>

      {isAdding && (
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="请输入新增的任务信息"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
          <Button type="primary" onClick={handleAdd}>
            确认
          </Button>
          <Button onClick={() => setIsAdding(false)}>
            取消
          </Button>
        </div>
      )}

      <List
        dataSource={initialTasks}
        renderItem={(task: TaskItem) => (
          <List.Item
            className="flex items-center justify-between p-3 border rounded mb-2"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                checked={task.completed}
                onChange={e => onTaskStatusChange(task.id, e.target.checked)}
              />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>
                {task.content}
              </span>
            </div>
            <Button
              type="link"
              className="text-blue-500"
              onClick={() => onTaskDelete(task.id)}
            >
              删除
            </Button>
          </List.Item>
        )}
      />
    </div>
  )
}

export default TaskBoard
