import { useState } from 'react'
import EditorLayout from './Editor/Layout/Layout'

function App() {
  const [ isLoading, setIsLoading ] = useState(true)

  if (isLoading)
    return (
        <div className={"bg-gray-900 w-full h-full flex items-center justify-center"}>
          <div
              className="hover:outline-gray-600 outline outline-4 rounded-xl outline-transparent transition-all select-none cursor-pointer"
              onClick={() => {
                setIsLoading(false)
              }}>
            <span className={"text-[16rem] aspect-square"}>🕹️</span>
            <h2 className={"text-6xl font-semibold text-center text-white p-8 pb-0 pt-0 -mt-4"}>FreeCade</h2>
            <p className={"tracking-[0.5rem] text-xl text-gray-300 text-center pb-4"}>Engine</p>
          </div>
        </div>
    )

  return <EditorLayout/>
}

export default App
