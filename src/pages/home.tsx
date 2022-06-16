import React, { useState, useEffect } from 'react'
import '../App.css'

import Paho from 'paho-mqtt';

export const Home = () => {
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState<Paho.Client>();
  const [msg, setMsg] = useState("");
  const [feed, setFeed] = useState<String[]>([]);
   const [showHelp, setShowHelp] = useState(true);
  const _topic = ["H2_car"];
  const _options = {};

  useEffect(() => {
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
    setConnected(true);
  }

  // called when sending payload
  const _sendPayload = () => {
    if (client == undefined || msg === "") return
    const message = new Paho.Message(msg);
    message.destinationName = "H2polito/Speed";
    console.log("Sending");
    console.log(message.payloadString);
    client.send(message);


    let newMex= Math.pow( parseInt(msg) + 100, 2);


    const message2= new Paho.Message(JSON.stringify(newMex));
    message2.destinationName = "H2polito/Temperature";
    console.log("Sending");
    console.log(message2.payloadString);
    client.send(message2);

    setMsg("");

  }

  // called when client lost connection
  const _onConnectionLost = (responseObject: any) => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);
    }
    setConnected(false)
  }

  // called when messages arrived
  const _onMessageArrived = (message: any) => {
    var msg2 = message.payloadString;
    msg2 = String(msg2)
    setFeed((feed) => [...feed, msg2])
  }


  // called when subscribing topic(s)
  const _onSubscribe = () => {
    if (client == undefined) return
    for (var i = 0; i < _topic.length; i++) {
      client.subscribe(_topic[i], _options);
    }
  }

  // called when subscribing topic(s)
  const _onUnsubscribe = () => {
    if (client == undefined) return
    for (var i = 0; i < _topic.length; i++) {
      client.unsubscribe(_topic[i], _options);
    }
  }

  // called when disconnecting the client
  const _onDisconnect = () => {
    if (client == undefined) return
    client.disconnect();
  }

  const handleInputMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Message');
    setMsg(event.target.value)
  }

  return (
    <>
      <main className="mb-auto mx-auto">
        <div className="text-center text-white justify-center">
          {showHelp &&
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
              Keep this home page and the /dashboard ON in two separate windows.
              To make it work, select a component in the dashboard section, add its values and select the sensor "Luci" and once the component has been added, press the "reload" button.
              Now you can try to send a message to the broker "h2politoLuci". This value will show up on the sensors that selected luci as a sensor.

              <span className="float-right"><button onClick={() => setShowHelp(false)}>Close</button></span>
            </div>
          }

          {connected === false &&
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Ops! </strong>
              <span className="block sm:inline">You are not connected!</span>
            </div>
          }

          {connected === true &&
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Connected! </strong>
              <span className="block sm:inline">You are connected to the server!</span>
            </div>
          }

          <p className="font-bold underline text-green-700">Messages:</p>

          {feed.length === 0 &&
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Ops! </strong>
              <span className="block sm:inline">There are no messages to show! Subscribe to a topic first then send a message to test :)</span>
            </div>
          }

          {feed.map((post, idx) => {
            return (
              <div key={idx} className="bg-stone-100 border border-stone-400 text-stone-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Message {idx}</strong><br />
                <span className="block sm:inline">{post}</span>
              </div>
            )
          })}


        </div>
      </main>
      <footer className="mb-5">
        <p>
          <input type="text" value={msg} onChange={handleInputMsg} className="placeholder:italic placeholder:text-grey-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Write a Message..." />
        </p>
        <button
          className="w-1/2 h-10 text-sm text-white bg-yellow-400 rounded-tl-full rounded-bl-full hover:bg-yellow-300"
          onClick={_onSubscribe}>
          <h1>Subscribe Topic</h1>
        </button>
        <button
          className="w-1/2 h-10 text-sm text-white bg-yellow-400 rounded-tr-full rounded-br-full hover:bg-yellow-300"
          onClick={_sendPayload}>
          <h1>Send Message</h1>
        </button>
      </footer>
    </>
  );
}