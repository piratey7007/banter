import { Timestamp } from '@firebase/firestore'
import { EffectCallback, useEffect, useState } from 'react'

export default function useTimestamp(
  input: { seconds: number; nanoseconds: number },
  type = 'relative',
) {
  const [timestamp, setTimestamp]: [string, (newTimestamp: string) => void] =
    useState('')
  let getTimestamp
  if (type === 'relative') {
    getTimestamp = () => {
      // Gets the time since the message has been sent
      let t = Math.floor(
        Date.now() / 1000 - input.seconds - input.nanoseconds / 1000000000,
      )
      let stamp
      if (t < 0) return setTimestamp(`Time is an illusion; lunchtime doubly so`)
      if (t < 20) return setTimestamp(`Just now`)
      if (t < 60) return setTimestamp(`${Math.floor(t)} seconds ago`)
      if (t < 120) return setTimestamp(`1 minute ago`)
      if (t < 3600) return setTimestamp(`${Math.floor(t / 60)} minutes ago`)
      if (t < 7200) return setTimestamp(`1 hour ago`)
      if (t < 86400) return setTimestamp(`${Math.floor(t / 3600)} hours ago`)
      if (t < 172800) return setTimestamp(`1 day ago`)
      if (t < 604800) return setTimestamp(`${Math.floor(t / 86400)} days ago`)
      if (t < 1209600) return setTimestamp(`1 week ago`)
      if (t < 2629746)
        return setTimestamp(`${Math.floor(t / 604800)} weeks ago`)
      if (t < 5259492) return setTimestamp(`1 month ago`)
      if (t < 31556952)
        return setTimestamp(`${Math.floor(t / 2629746)} months ago`)
      if (t < 63113904) return setTimestamp(`1 year ago`)
      if (t < 10 * 631139040)
        return setTimestamp(`${Math.floor(t / 31556952)} years ago`)
      return setTimestamp(`They're not coming back :(`)
      // instead of return setTimestamp(``), make stamp = `` and then return setTimestamp(stamp)
    }
  } else if (type === 'absolute') {
    getTimestamp = () => {
      const date = new Date(input.seconds * 1000)
      let stamp
      // if date is today, show time
      if (date.toDateString() === new Date().toDateString())
        stamp = date.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })
      // if date is yesterday, show "Yesterday"
      else if (
        date.toDateString() === new Date(Date.now() - 86400000).toDateString()
      )
        stamp = 'Yesterday'
      // if date is within the last 7 days, show day of week
      else if (date.getTime() > Date.now() - 604800000)
        stamp = date.toLocaleString('en-US', { weekday: 'short' })
      // if date is within the last 365 days, show month and day
      else if (date.getTime() > Date.now() - 31536000000)
        stamp = date.toLocaleString('en-US', { month: 'short', day: 'numeric' })
      // if date is more than a year ago, show month, day, and year
      else
        stamp =
          date.toLocaleString('en-US', { month: 'short', day: 'numeric' }) +
          ' ' +
          date.toLocaleString('en-US', { year: 'numeric' })
      return setTimestamp(stamp)
    }
  }

  useEffect(getTimestamp as EffectCallback, [])

  return [timestamp, getTimestamp]
}
