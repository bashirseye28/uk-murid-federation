'use client'

import { useEffect, useState } from 'react'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  const eventDate = new Date('2025-06-28T00:00:00').getTime()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate - now

      if (distance <= 0) {
        clearInterval(timer)
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        })
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((distance / (1000 * 60)) % 60)
        const seconds = Math.floor((distance / 1000) % 60)

        setTimeLeft({
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0'),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-4 gap-4 justify-center mt-4 mb-6">
      {[
        { label: 'DAYS', value: timeLeft.days },
        { label: 'HOURS', value: timeLeft.hours },
        { label: 'MIN', value: timeLeft.minutes },
        { label: 'SEC', value: timeLeft.seconds },
      ].map((unit, index) => (
        <div key={index} className="bg-white/10 px-4 py-2 rounded-md text-center">
          <div className="text-3xl font-bold text-white leading-none">
            {unit.value}
          </div>
          <div className="text-xs text-white/70 tracking-wide uppercase mt-1">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  )
}