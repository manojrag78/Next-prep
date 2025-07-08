'use client'

import React from 'react'
import { useAppSelector, useAppDispatch } from '@/app/store/hooks'
import { increment, decrement, reset } from '@/app/store/slice/counterSlice'

const CounterExample = () => {
  const value = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-amber-200">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6">Count: {value}</h1>

        <div className="flex gap-4">
          <button
            onClick={() => dispatch(increment())}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Increment
          </button>

          <button
            onClick={() => dispatch(decrement())}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Decrement
          </button>

          <button
            onClick={() => dispatch(reset())}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default CounterExample
