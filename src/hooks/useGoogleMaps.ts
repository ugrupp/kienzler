import { useState, useEffect, useRef } from "react"

export function useGoogleMaps(options: google.maps.MapOptions) {
  const google = useGoogleMapsApi()
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState()

  useEffect(() => {
    if (!google || !ref) {
      return
    }

    setMap(new (window as any).google.maps.Map(ref.current, options))
  }, [google, ref])

  return { ref, map, google }
}

export function useGoogleMapsApi() {
  const [googleApi, setGoogleApi] = useState()

  useEffect(() => {
    if ((window as any).google) {
      // if window.google object is already available just use it
      setGoogleApi((window as any).google)
      return
    }
    ;(window as any).initMap = () => {
      setGoogleApi((window as any).google)
    }
  }, [])

  return googleApi
}
