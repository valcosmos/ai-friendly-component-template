'use client'

import type { Task, TaskStatus } from '@/app/components/TodoList/interface'
import TodoList from '@/app/components/TodoList'
import { message, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { addTask, deleteTask, fetchTasks, searchTasks, updateTaskStatus } from './helpers'

function TodoListPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasksData = async () => {
    try {
      setIsLoading(true)
      const data = await fetchTasks()
      setTasks(data)
    }
    catch (error) {
      console.error('Error fetching tasks:', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasksData()
  }, [])

  const handleSearchTask = async (keyword: string) => {
    try {
      setIsLoading(true)
      const data = await searchTasks(keyword)
      setTasks(data)
    }
    catch (error) {
      console.error('Error searching tasks:', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleAddTask = async (task: Task) => {
    try {
      setIsLoading(true)
      const newTask = await addTask(task)
      setTasks([newTask, ...tasks])
      message.success({ content: 'Task added successfully' })
    }
    catch (error) {
      console.error('Error adding task:', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      setIsLoading(true)
      await deleteTask(taskId)
      setTasks(tasks.filter(task => task.id !== taskId))
      message.success({ content: 'Task deleted successfully' })
    }
    catch (error) {
      console.error('Error deleting task:', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleUpdateTaskStatus = async (taskId: string, status: TaskStatus) => {
    try {
      setIsLoading(true)
      await updateTaskStatus(taskId, status)
      setTasks(tasks.map(task => (task.id === taskId ? { ...task, status } : task)))
      message.success({ content: 'Task status updated successfully' })
    }
    catch (error) {
      console.error('Error updating task status:', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Spin spinning={isLoading}>
        <TodoList
          tasks={tasks}
          onSearchTask={handleSearchTask}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onUpdateTaskStatus={handleUpdateTaskStatus}
        />
      </Spin>
    </>
  )
}

export default TodoListPage
