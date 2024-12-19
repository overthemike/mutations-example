import { proxy, useSnapshot } from 'valtio'

// Define the state interface
interface State {
  count: number
  updates: string[]
  lastUpdateTime: string | null
}

// Create a proxy state with type annotation
const state = proxy<State>({
  count: 0,
  updates: [],
  lastUpdateTime: null
})

// Type the mutation function
const performBatchedUpdates = (): void => {
  // First mutation
  state.count += 1
  state.updates.push(`Update 1: ${state.count}`)

  // Second mutation
  state.count += 2
  state.updates.push(`Update 2: ${state.count}`)

  // Third mutation
  state.count *= 2
  state.updates.push(`Update 3: ${state.count}`)

  // Final timestamp
  state.lastUpdateTime = new Date().toLocaleTimeString()
}

const ValtioDemo = () => {
  const snap = useSnapshot<State>(state)

  return (
    <div className='p-6 max-w-md mx-auto bg-white rounded-xl shadow-md'>
      <h2 className='text-xl font-bold mb-4'>Valtio State Batching Demo</h2>

      <div className='mb-4'>
        <span className='font-semibold'>Current Count: </span>
        <span className='text-lg'>{snap.count}</span>
      </div>

      <button
        onClick={performBatchedUpdates}
        className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        type='button'
      >
        Perform Batched Updates
      </button>

      <div className='border-t pt-4'>
        <h3 className='font-semibold mb-2'>Update History:</h3>
        <ul className='space-y-1'>
          {snap.updates.map((update, index) => (
            <li key={index} className='text-sm text-gray-600'>
              {update}
            </li>
          ))}
        </ul>
      </div>

      {snap.lastUpdateTime && (
        <div className='mt-4 text-sm text-gray-500'>
          Last updated at: {snap.lastUpdateTime}
        </div>
      )}
    </div>
  )
}

export default ValtioDemo
