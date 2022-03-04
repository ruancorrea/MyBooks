import { useEffect, useState } from "react";

export default function useAlerts(){
    const [err, setErr] = useState(false);
    const [exibirMsg, setExibirMsg] = useState(false);
    const [alert, setAlert] = useState("")
    const [color, setColor] = useState("")
    
    useEffect(() => {
        if(!err) {
            setExibirMsg(false);
            return
        }
        setExibirMsg(true)

        const timer = setTimeout(() => {
            setExibirMsg(false)
            setAlert("")
            setErr(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [err])

    return {
        err, exibirMsg, alert, color,
        setErr, setExibirMsg, setAlert, setColor
    }
}