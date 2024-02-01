import { useRef, useState } from 'react'

const useTimer = () => {
    const [timer, setTimer] = useState(30)
    const intervalRef = useRef<number | null>(null)
    const decrementTimer = () => {
        setTimer((prev) => prev - 1)
    }

    const PauseTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
    }

    const StartTimer = (timer = 30) => {
        ClearTimer()
        setTimer(timer)
        intervalRef.current = setInterval(() => {
            decrementTimer()
        }, 1000)
    }
    const ClearTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setTimer(30)
    }

    return { timer, StartTimer, ClearTimer, PauseTimer }
}

export default useTimer
