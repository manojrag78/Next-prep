'use client'

import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { addTask, deleteTask, toggleTask } from '@/app/store/slice/taskSlice'

const TaskManager = () => {
  const [input, setInput] = useState('')
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(state => state.tasks.tasks)

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTask(input))
      setInput('')
    }
  }

  const completed = tasks.filter(t => t.completed).length

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">📝 Task Manager</h1>

        <div className="flex mb-4 gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 px-4 py-2 rounded-md border border-gray-300"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet 🚫</p>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(toggleTask(task.id))}
                  />
                  <span className={`${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </span>
                </div>
                <button
                  onClick={() => dispatch(deleteTask(task.id))}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 text-sm text-center text-gray-600">
          Total: {tasks.length} | ✅ Completed: {completed} | ⏳ Pending: {tasks.length - completed}
        </div>
      </div>
    </div>
  )
}

export default TaskManager
