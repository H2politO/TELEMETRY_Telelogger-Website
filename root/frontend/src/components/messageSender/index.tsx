import React from "react"
import { render } from "react-dom"
import { useState } from "react"

export const MessageSender = ({sendData}) => {

    const [message, setMessage] = useState('');

    const internalSendData = (e) => {
        e.preventDefault()
        sendData(message);
    }

    return (
        <div>
            <form onSubmit={internalSendData}>
                <input type='text' onChange={(m) => setMessage(m.target.value)} ></input>
                <button type='button' ></button>
            </form>

            {message}
        </div>

    )




}