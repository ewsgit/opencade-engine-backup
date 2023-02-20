import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import electronApi from "@/electronApi";

class ErrorBoundary extends React.Component {
  state: { hasError: boolean }

  constructor() {
    super({});
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({
                    hasError: true
                  })
  }

  render() {
    if (this.state.hasError) {
      return (
          <div
              className={"bg-gray-900 w-full h-full relative overflow-hidden"}>
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max transition-all select-none flex">
              <section>
                <p className={"text-[16rem] aspect-square text-center w-full m-0"}
                   onClick={() => electronApi().openDevTools()}>🕹️</p>
                <h2 className={"text-6xl font-semibold text-center text-white p-8 pb-0 pt-0 -mt-12"}>FreeCade</h2>
                <p className={"tracking-[0.5rem] text-xl text-gray-300 text-center pb-4"}>Engine</p>
              </section>
              <section className={"flex items-center justify-center border-l-4 border-l-gray-500 flex-col"}>
                <p className={"text-white font-semibold ml-8 text-2xl"}>An error has occurred!</p>
                <button
                    onClick={() => electronApi().restartApplication()}
                    className={"text-white ml-8 mt-4 p-2 pl-4 pr-4 text-xl bg-gray-800 transition-colors hover:bg-gray-500"}>Restart
                  Application
                </button>
              </section>
            </div>
          </div>
      )
    }

    // @ts-ignore
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ErrorBoundary>
      <App/>
    </ErrorBoundary>
)
