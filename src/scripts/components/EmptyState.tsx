import React, { useContext } from 'react'
import { AuthContext } from '../utils/Auth'

export default function EmptyState(props: { className?: string }) {
  const { signOut } = useContext(AuthContext)
  return (
    <div className='' {...props}>
      <h1>EmptyState</h1>
    </div>
  )
}
