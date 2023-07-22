import React, { useState, useEffect, Component } from 'react';
import '../App.css';
import '../index.css';
import Cookies from "universal-cookie"
import { ComponentEncapsulator } from '../components/componentEncapsulator';
import { ComponentsPage } from '../models/componentsPage';
import Paho from "paho-mqtt"

import RGL, { WidthProvider } from "react-grid-layout";


const ReactGridLayout = WidthProvider(RGL);
let cookie = new Cookies();


type Props = {
    receivedComponent: ComponentsPage
    useMountEffect?: () => (void)
    onResize?: (id: string, width: number, height: number) => void;
};


export const Dashboard: React.FC<Props> = ({ receivedComponent }) => {


    const [componentWidth, setComponentWidth] = useState(0);
    const [componentHeight, setComponentHeight] = useState(0);

    const [components, setcompPageList] = useState([]);
    const [myLayout, setLayout] = useState([]);

    let mqttClient;

    //Callback happens whenever the layout is changed; apply the new layout and save cookies of this layout for next accesses to the page
    const onLayoutChange = (newLayout) => {
        setLayout(newLayout);
        console.log("new layout")
        cookie.set("layout", newLayout, { maxAge: 60 * 60 * 24 * 365 });
    }


    //Function used to delete the passed components
    const deleteComponent = (cmpToDlt: ComponentsPage) => {

        console.log('Deleting ');
        let ind = components.findIndex((cmp) => {
            return cmp === cmpToDlt;
        })

        setcompPageList(components.filter((cmp) => cmp != cmpToDlt));
    }


    //Useeffect called only when the page is loaded; if cookies are present load them; if they aren't, don't
    useEffect(() => {
        console.log("Dashboard useEffect called only on load")
        if (cookie.get('compPage') != undefined) {
            console.log(cookie.get('layout'))
            setcompPageList(cookie.get('compPage'))
        } else {
            console.log("Cookies empty")
        }

        if (cookie.get('layout') != undefined) {
            console.log("Layout has been loaded")
            setLayout(cookie.get('layout'))
        }
        
        console.log("Starting root mqtt client...");
        mqttClient = new Paho.Client("broker.mqttdashboard.com", Number(8000), "/mqtt", "myClientId" + new Date().getTime());
        mqttClient.connect({ onSuccess: onConnect });

    }, [])

    //Called when mqtt client connects
    function onConnect(){
        console.log("Root MQTT Client connected");
    }

    //Setting cookies every time components finishes the render 
    useEffect(() => {
        //Set age of the cookies to 1 year (60 seconds * 60 minutes * 24 hours * 365 days)
        cookie.set('compPage', components, { maxAge: 60 * 60 * 24 * 365 });
    }, [components])


    //On each component received from the parent, this effect is called and the components array is updated
    useEffect(() => {
        if (receivedComponent.typeComponent != undefined) {
            console.log("Dashboard useEffect")
            setcompPageList(components.concat(receivedComponent))
        }
    }, [receivedComponent])

    function handleComponentResize(layout, oldItem, newItem) {
        // Check if the resized item is the one we are interested in
        //console.log(oldItem, newItem)

        //component that has just been resized
        const resizedComponent = components.filter(x => x.compID === newItem.i)[0];
        // Call the onResize prop of the ComponentEncapsulator component
        if (resizedComponent) {
          const { compID, w, h } = resizedComponent;
          const id = `component-${compID}`;
          const width = w * newItem.w;
          const height = h * newItem.h;
          //console.log(resizedComponent)
          //onResize(id, width, height);
        }

    }


    return (
        <div>

            <ReactGridLayout
                rowHeight={50}
                cols={12}
                compactType="vertical"
                draggableHandle='.handle'
                autoSize={true}
                margin={[5, 5]}
                layout={myLayout}
                onLayoutChange={onLayoutChange}
                onResize={handleComponentResize}


            >
                {components.map((comp: ComponentsPage, index) => (
                    <div key={comp.compID} data-grid={{ w: comp.w, h: comp.h, x: 0, y: 0 }}>
                        <ComponentEncapsulator passedComp={comp} onDelete={deleteComponent}></ComponentEncapsulator>
                    </div>
                ))}
            </ReactGridLayout >
        </div>
    )

}

export default Dashboard