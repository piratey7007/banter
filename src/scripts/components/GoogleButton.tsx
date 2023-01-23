import { ReactNode } from 'react'

export default function GoogleButton(props: {
  className?: string
  children: ReactNode
}) {
  return (
    <button {...props} className={props.className + ' bg-blue-600 px-3 py-2'}>
      {props.children}
      <div className='bg-white rounded-lg p-1'>
        <img
          className='w-7'
          src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
        />
      </div>
    </button>
  )
}
