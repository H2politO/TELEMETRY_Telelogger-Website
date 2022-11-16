import { useState } from "react"
import Paho from 'paho-mqtt';
import { useEffect } from "react";


export const MessageSender = () => {

    const [times, setTimes] = useState([]);
    const [message, setMessage] = useState('');
    const [msgList, setMessageList] = useState<String[]>(['']);
    const [client, setClient] = useState<Paho.Client>();

    useEffect(() => {
        console.log('Paho')
        _init();
    }, [])

    const _init = () => {
        const c = new Paho.Client("broker.mqttdashboard.com", Number(8000), "/mqtt", "myClientId" + new Date().getTime());
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
        var msg2 = message.payloadString;
        msg2 = String(msg2)
    }

    const internalSendData = (e) => {
        e.preventDefault()
        sendData(message);
        setTimes((t) => [...t, new Date().toLocaleTimeString()])
        setMessageList((mexList) => [...mexList, message])
        console.log(message);
    }

    const sendData = (msg) => {

        console.log('Sending the following message: ' + msg);
        const pahomessage = new Paho.Message(msg);
        pahomessage.destinationName = 'H2polito/Messaging';
        client.send(pahomessage);

    }


    return (
        <div>
            <form onSubmit={internalSendData}>
                <p>
                    <input type="text" onChange={(m) => {
                        setMessage(m.target.value)
                    }} className="placeholder:italic placeholder:text-grey-400 block bg-white w-full border border-gray-300 rounded-md  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Write a Message..." />
                </p>
                <button>Invio</button>
            </form>

            {msgList.map((msg, i) => {
                return (
                    <div>
                        <span>{msg}</span>
                        <div>{times[i]}</div>
                    </div>
                )
            })}

        </div>

    )




}