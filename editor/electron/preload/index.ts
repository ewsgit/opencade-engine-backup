import { contextBridge, ipcRenderer } from "electron"
import { IElectronApi } from "../../src/electronApi";

function domReady(condition: DocumentReadyState[] = [ 'complete', 'interactive' ]) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child)
    }
  },
}

function Loader() {
  const className = `loader`
  const styleContent = `
@keyframes square-spin {
  0% {
    transform: perspective(2.5rem) scale(0.9);
  }
  50% {
    transform: perspective(2.5rem) scale(1.1);
  }
  100% {
    transform: perspective(2.5rem) scale(0.9);
  }
}

.${className} > div {
  animation-fill-mode: both;
  width: 8rem;
  height: 8rem;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: square-spin 2s 0s ease-in-out infinite;
  border-radius: 0.25rem;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #131827;
  z-index: 9;
}
    `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'
  oDiv.innerHTML = `<div class="${className}"><div>🕹️</div></div>`

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)
    },
  }
}

const { appendLoading, removeLoading } = Loader()
domReady().then(appendLoading)

window.onmessage = (ev) => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 2000)

contextBridge.exposeInMainWorld('electron', <IElectronApi>{
  setTitle: (title) => ipcRenderer.send('set-title', title),
  setSize: (params) => ipcRenderer.send("set-size", params),
  closeWindow: () => ipcRenderer.send("close-window"),
  toggleMaximized: () => ipcRenderer.send("toggle-maximized"),
  minimize: () => ipcRenderer.send("minimize")
})
