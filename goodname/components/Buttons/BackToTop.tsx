import { ArrowUp } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'

export function BackToTop(): React.ReactNode {
  const [isVisible, setIsVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const visibleStyle = isVisible ? 'flex' : 'hidden'

  function handleScroll(): void {
    const scrollTop = document.documentElement.scrollTop !== null
      ? document.documentElement.scrollTop
      : document.body.scrollTop
    setIsVisible(scrollTop > 200)
  }

  function scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    if (buttonRef.current === null) return
    buttonRef.current.blur()
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <button
      type='button'
      aria-label='Back to top'
      ref={buttonRef}
      className={`fixed ${visibleStyle} bg-black bottom-[35px] right-[32px] z-20 opacity-30 hover:opacity-100 border border-zinc-80 font-bold py-2 px-4 rounded transition duration-300 ease-in-out`}
      onClick={scrollToTop}
    >
      <ArrowUp className='stroke-white' />
    </button>
  )
}
