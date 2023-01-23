import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import ReactDOM from 'react-dom'
import { v4 as uuidv4 } from 'uuid'

interface ToastContextI {
  toasts: Toast[]
  addToast: (message: string) => void
  removeToast: (id: string) => void
}

export const ToastContext = createContext({} as ToastContextI)

type Toast = {
  id: string
  message: string
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts]: [Toast[], Dispatch<SetStateAction<Toast[]>>] =
    useState<Toast[]>([])

  function addToast(message: string) {
    const toast = { id: uuidv4(), message }
    setToasts((toasts) => [...toasts, toast])
  }
  function removeToast(id: string) {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
  }

  const value = { toasts, addToast, removeToast }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

function Toast({ id, message }: Toast) {
  const { removeToast } = useContext(ToastContext)
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className='toast'>
      <p>{message}</p>
    </div>
  )
}

export function ToastRoot() {
  const { toasts } = useContext(ToastContext)

  useEffect(() => {
    console.log(toasts)
  }, [toasts])

  return ReactDOM.createPortal(
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </>,
    document.getElementById('toast-root')!,
  )
}
