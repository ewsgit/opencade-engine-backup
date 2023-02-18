import { useEffect, useState } from 'react'
import EditorLayout from './Main/Layout/Layout'

function App() {
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      window.electron.setSize({ width: 1000, height: 700, animate: true })
    }
  }, [ isLoading ])

  if (isLoading)
    return (
        <div
            className={"bg-gray-900 w-full h-full flex items-center justify-center rounded-2xl overflow-hidden animate-fade-in"}>
          <div
              className="outline-gray-600 w-[380px] h-[460px] outline outline-4 rounded-xl transition-all select-none"
              onClick={() => {
                setIsLoading(false)
              }}>
            <p className={"text-[16rem] aspect-square text-center w-full m-0"}>🕹️</p>
            <h2 className={"text-6xl font-semibold text-center text-white p-8 pb-0 pt-0 -mt-12"}>FreeCade</h2>
            <p className={"tracking-[0.5rem] text-xl text-gray-300 text-center pb-4"}>Engine</p>
          </div>
        </div>
    )

  return <EditorLayout/>
}

export default App
