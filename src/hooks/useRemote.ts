import { useEffect } from 'react'
import Remote from '../remote'

export function useRemoteInit() {
  useEffect(() => {
    Remote.init()
  }, [])
}
