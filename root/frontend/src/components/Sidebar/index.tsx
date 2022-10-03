import React, { Component } from 'react';
import { Sensor } from '../../models/sensor';
import { ComponentsPage } from '../../models/componentsPage';
import { SensorList } from './sensorsList';
import { Formik, Field, Form, FormikHelpers, ErrorMessage, FormikState } from 'formik';
import Select from 'react-select'
import { OnChangeValue } from 'react-select';
import Cookies from 'universal-cookie';
import * as cmpTypeConst from '../../pages/dashboard';

type Props = {
    //sensorList: Sensor[];
    outputList: ComponentsPage[];
}

type Option = {
    label: string,
    value: Sensor,
}


export class Sidebar extends React.Component<any, any> {

    listCookie: Cookies;
    componentsList: ComponentsPage[];

   
    componentDidMount() {

        /*
        this.listCookie = new Cookies();
        if (this.listCookie.get('compList') != undefined)
            this.componentsList = this.listCookie.get('compList');
        else
        */
            this.componentsList = [];
        
        //this.onTrigger();

    }

    deleteCookiess = () => {
        console.log('Removing cookie');
        this.listCookie.remove('compList');

    }

    state = {
        indicatorList:[
            {ID: 1, componentName: 'Check Light'},
            {ID: 2, componentName: 'Radial Gauge'},
            {ID: 3, componentName: 'Linear Gauge'},
            {ID: 4, componentName: 'Plot'},
            {ID: 5, componentName: 'Circuit map'},
            {ID: 6, componentName: 'Lap timer'},
        ],
        opt: [
            {value:{ ID: '1', topicName: 'Emergency', sensorName: 'Emergency', minValue: 1, maxValue: 100},label:'Emergency' },
            {value:{ ID: '2', topicName: 'Speed', sensorName: 'Speed', minValue: 1, maxValue: 100 },label:'Speed'},
            {value:{ ID: '3', topicName: 'Temperature', sensorName: 'Temperature', minValue: 1, maxValue: 100 },label:'Temperature'},
            {value:{ ID: '4', topicName: 'FCVoltage', sensorName: 'Fuel Cell Voltage', minValue: 1, maxValue: 100 },label:'FCVoltage'},
            {value:{ ID: '5', topicName: 'SCVoltage', sensorName: 'Supercap Voltage', minValue: 1, maxValue: 100 },label:'SCVoltage'},
            {value:{ ID: '6', topicName: 'Strategy', sensorName: 'Strategy', minValue: 1, maxValue: 100 },label:'Strategy'},
            {value:{ ID: '7', topicName: 'MotorOn', sensorName: 'Motor On', minValue: 1, maxValue: 100 },label:'MotorOn'},
            {value:{ ID: '8', topicName: 'ActuationOn', sensorName: 'Actuation On', minValue: 1, maxValue: 100 },label:'ActuationOn'},
            {value:{ ID: '9', topicName: 'Purge', sensorName: 'Purge On', minValue: 1, maxValue: 100 },label:'Purge'},
            {value:{ ID: '10', topicName: 'PowerMode', sensorName: 'Power Mode On', minValue: 1, maxValue: 100 },label:'PowerMode'},
            {value:{ ID: '11', topicName: 'Short', sensorName: 'Short On', minValue: 1, maxValue: 100 },label:'Short'},
            {value:{ ID: '12', topicName: 'FCCurrent', sensorName: 'Fuel Cell Current', minValue: 1, maxValue: 100 },label:'FCCurrent'},
        ]
    }

    cmpID=0;
    sensors: any;
    
    handleChange = (
        newSensors: OnChangeValue<Option, true>
      ) => {
        this.sensors=newSensors;
      };
    
    //calls the database and retrieves all the available sensors 


    onTrigger = () => {
        console.log('Trigger');
        this.props.parentCallback(this.componentsList);
    }

    render() {
        return (

            <div className="offcanvas offcanvas-end" id="offcanvasRight">
                <div className="offcanvas-header sidebar-title">
                    <h2>Sensor menu</h2>
                </div>

                <img src='../../sensor.png' width="50%" className="center"></img>
                <div className="offcanvas-body">
                    <hr className="my-4" />

                    <Formik
                        initialValues={{
                            compID: 1,
                            nameComponent: '',
                            typeComponent: 1,
                            cmpMinRange: 0,
                            cmpMaxRange: 100,
                            sensorSelected: new Array<Sensor>(),
                            prescaler: 1,
                            deleted: false,
                            value: 0,
                            w:2,
                            h:2,
                        }}
                        onSubmit={(
                            values: ComponentsPage,
                            //{ setSubmitting,
                            // }: FormikHelpers<ComponentsPage>,
                            action,
                        ) => {
                            let prov = {} as ComponentsPage;

                            //push into components
                            prov = values;
                            this.cmpID++;
                            prov.compID=this.cmpID;
                            prov.sensorSelected=new Array<Sensor>();
                            prov.sensorSelected=this.sensors.map((sens:any) => sens.value);
                            prov.w=cmpTypeConst.cmpType[prov.typeComponent-1].w;
                            prov.h=cmpTypeConst.cmpType[prov.typeComponent-1].h;
                            prov.cmpMinRange=values.cmpMinRange;
                            prov.cmpMaxRange=values.cmpMaxRange;
                            this.componentsList.push(prov);

                            //add cookies
                            console.group('Added cookies')
                            console.log(this.componentsList);
                            //this.listCookie.set('compList', JSON.stringify(this.componentsList));
                            this.onTrigger();
                            console.groupEnd();

                            //reset
                            action.resetForm();
                            setTimeout(() => {
                                //alert(JSON.stringify(values));
                                //setSubmitting(false);
                            }, 500);
                        }}
                    >

                        <Form>
                            <div className='myFormGroup'>
                                <label>Select component</label>
                                <Field component="select" className="form-select" id='typeComponent' name='typeComponent'>
                                {this.state.indicatorList.map((Indicator)=>(
                                        <option value={Indicator.ID}>{Indicator.componentName}</option>
                                    ))
                                    }
                                </Field>
                            </div>
                            

                            <div className='myFormGroup'>
                                <label>Select multi-sensor</label>
                                <Select key={`my_unique_select_key__${JSON.stringify(this.sensors)}`} options={this.state.opt} onChange={this.handleChange} isMulti={true} isClearable={true} isSearchable={true}></Select>
                            </div>

                            <div className='myFormGroup'>
                                <label>Select a name</label>
                                <div className="input-group mb-3">
                                    <Field component="input" className="form-control" id="nameComponent" name="nameComponent" placeholder="Select a sensor name" />
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className='myFormGroup'>
                                <label>Insert Min and Max value on the scale</label>
                                <div className="input-group mb-3">
                                    <Field className="form-control" id="cmpMinRange" name="cmpMinRange" placeholder="Minimum range" />
                                    <Field className="form-control" id="cmpMaxRange" name="cmpMaxRange" placeholder="Maximum range" />
                                </div>
                            </div>

                            <div className='myFormGroup'>
                                <label>Insert a prescaler</label>
                                <Field component="select" className="form-select" id='prescaler' name='prescaler'>
                                    <option value={1000}>x1000</option>
                                    <option value={100}>x100</option>
                                    <option value={10}>x10</option>
                                    <option value={1} selected>x1</option>
                                    <option value={0.1}>x0.1</option>
                                    <option value={0.01}>x0.01</option>
                                    <option value={0.001}>x0.001</option>
                                </Field>
                            </div>

                            <input className="btn btn-primary interactiveBtn" type="submit" value="Submit"></input>
                            
                        </Form>
                    </Formik>
                    <button className="btn btn-primary interactiveBtn mt-1" onClick={this.deleteCookiess}>Remove cookies</button>
                </div>
            </div >
        )
    }


}