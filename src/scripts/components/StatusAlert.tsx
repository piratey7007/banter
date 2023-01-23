import { Status } from '../utils/Auth'

export default function StatusAlert({ status }: { status: Status }) {
  const { error, success, pending } = status
  let divClass, h2Class
  let displayStatus = ''
  if (error) {
    displayStatus = error
    divClass = 'bg-error-100 text-error-500 border-error-500'
    h2Class = 'font-bold'
  } else if (success) {
    displayStatus = success
    divClass = 'bg-success-100 text-success-500 border-success-500'
    h2Class = 'text-center'
  } else if (pending) {
    displayStatus = pending
    divClass = 'bg-primary-100 text-primary-500 border-primary-500'
    h2Class = 'text-center'
  } else throw new Error('Status is required. StatusAlert.jsx')
  return (
    <div className={divClass + ' w-full rounded-2 p-4 border-[.2rem]'}>
      <h2 className={h2Class + ' text-center'}>
        {error && <span className='font-bold'>Error: </span>}
        <span className='font-normal'>{displayStatus}</span>
      </h2>
    </div>
  )
}
