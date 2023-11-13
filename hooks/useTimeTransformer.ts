import { useEffect, useState } from 'react'

const useTimeTransformer = ( time: Date ) => {
    const [newTime, setNewTime] = useState('')
    const dateObject = new Date(time)

    const transformTime = () => {
        let daysList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        let date = dateObject.getDate();
        let hours = dateObject.getHours();
        let minutes = dateObject.getMinutes();
        let day = dateObject.getDay();
        // let time_builder = `${hours + 1} : ${minutes + 1}`
        setNewTime(`${hours + 1}:${minutes + 1}`)
    }

    useEffect(() => {
        transformTime();
    }, [time])

    return newTime
}

export default useTimeTransformer;
