import React, { Component } from 'react';
import { Sensor } from '../../models/sensor';
import { ComponentsPage } from '../../models/componentsPage';
import { SensorList } from './sensorsList';
import { Formik, Field, Form, FormikHelpers, ErrorMessage, FormikState } from 'formik';
import Select from 'react-select'
import { OnChangeValue } from 'react-select';
import Cookies from 'universal-cookie';

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

    opt: Option[] = [
        { value: { ID: '1', sensorName: 'Velocita', minValue: 1, maxValue: 100 }, label: 'Velocita' },
        { value: { ID: '2', sensorName: 'Luci', minValue: 1, maxValue: 100 }, label: 'Luci' },
        { value: { ID: '3', sensorName: 'Clacson', minValue: 1, maxValue: 100 }, label: 'SClacsonens1' },
        { value: { ID: '4', sensorName: 'Pressione', minValue: 1, maxValue: 100 }, label: 'Pressione' },
        { value: { ID: '5', sensorName: 'Tergi', minValue: 1, maxValue: 100 }, label: 'Tergi' }];

    componentDidMount() {

        this.listCookie = new Cookies();
        if (this.listCookie.get('compList') != undefined)
            this.componentsList = this.listCookie.get('compList');
        else
            this.componentsList = [];

        this.onTrigger();

    }

    deleteCookiess = () => {
        console.log('Removing cookie');
        this.listCookie.remove('compList');

    }

    state = {
        sensorList: [
            { ID: '1', sensorName: 'Velocita', minValue: 1, maxValue: 100 },
            { ID: '2', sensorName: 'Luci', minValue: 1, maxValue: 100 },
            { ID: '3', sensorName: 'Clacson', minValue: 1, maxValue: 100 },
            { ID: '4', sensorName: 'Pressione', minValue: 1, maxValue: 100 },
            { ID: '5', sensorName: 'Tergi', minValue: 1, maxValue: 100 },
        ],
    }

    
    sensors: any;
    
    handleChange = (
        newSensors: OnChangeValue<Option, true>
      ) => {
        this.sensors=newSensors;
      };
    
    //calls the database and retrieves all the available sensors 


    onTrigger = () => {
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
                            prov.sensorSelected=new Array<Sensor>();
                            prov.sensorSelected=this.sensors.map((sens:any) => sens.value);
                            this.componentsList.push(prov);

                            //add cookies
                            console.group('Added cookies')
                            console.log(this.componentsList);
                            this.listCookie.set('compList', JSON.stringify(this.componentsList));
                            console.groupCollapsed();
                            this.onTrigger();

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
                                    <option value={1}>Check Light</option>
                                    <option value={2}>Radial Gauge</option>
                                    <option value={3}>Linear Gauge</option>
                                    <option value={5}>Throttle Pressure</option>
                                    <option value={4}>Plot</option>
                                </Field>
                            </div>
                            

                            <div className='myFormGroup'>
                                <label>Select multi-sensor</label>
                                <Select key={`my_unique_select_key__${JSON.stringify(this.sensors)}`} options={this.opt} onChange={this.handleChange} isMulti={true} isClearable={true} isSearchable={true}></Select>
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

                            <input className="btn btn-primary interactiveBtn" type="submit" value="Submit"></input> <button className="btn btn-primary interactiveBtn" onClick={this.deleteCookiess}>Rimuovi cookies</button>
                            
                        </Form>
                    </Formik>
                </div>
            </div >
        )
    }


}