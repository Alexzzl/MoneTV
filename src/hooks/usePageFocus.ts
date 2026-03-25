import { useEffect } from 'react'
import Remote from '../remote'

export function usePageFocus(pageId: string) {
  useEffect(() => {
    const timer = setTimeout(() => {
      Remote.resetForPage(pageId)
    }, 0)
    return () => clearTimeout(timer)
  }, [pageId])
}
