import { useState } from "react"
import Paho from 'paho-mqtt';
import { useEffect } from "react";
import "../../App.css"

export const PushButton= ({locCar, sensName}) => {

    const [times, setTimes] = useState([]);
    const [message, setMessage] = useState('');
    const [msgList, setMessageList] = useState<String[]>(['']);
    const [client, setClient] = useState<Paho.Client>();
    

    useEffect(() => {
        _init();
    }, [])

    const _init = () => {
        const c = new Paho.Client("31.97.32.141", Number(9001), "/mqtt", "myClientId" + new Date().getTime());
        c.onConnectionLost = _onConnectionLost;
        c.onMessageArrived = _onMessageArrived;
        c.connect({ onSuccess: onConnect });
        setClient(c);
    }

    const onConnect = () => {
    }

    const _onConnectionLost = (responseObject: any) => {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost: " + responseObject.errorMessage);
        }
    }

    // called when messages arrived
    const _onMessageArrived = (message: any) => {
        console.log("new message arrived")
        console.log(message.payloadString)
        //var msg2 = message.payloadString;
        //msg2 = String(msg2)
    }

    const internalSendData = (e ) => {
        
        e.preventDefault()
        sendData(message);
        setTimes((t) => [...t, new Date().toLocaleTimeString()])
        setMessageList((mexList) => [...mexList, message])
        //console.log(message);
    }

    const sendData = (msg) => {

        console.log('Sending the following message: ' + msg);
        const pahomessage = new Paho.Message(msg);
        

        console.log( locCar )
        
        pahomessage.destinationName = 'H2polito/' + locCar + 'Send';
        
        console.log(pahomessage.destinationName)
        client.send(pahomessage);

    }


    return (
        
        <div>
            <button className="primaryButton" onClick={() => sendData("1")}>{sensName}</button>
        </div>

    )




}
