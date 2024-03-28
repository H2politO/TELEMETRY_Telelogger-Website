import React, { Component } from "react";
import { Sensor } from "../../models/sensor";
import { ComponentsPage } from "../../models/componentsPage";
import { SensorList } from "./sensorsList";
import { v4 as uuidv4 } from "uuid";
import {
  Formik,
  Field,
  Form,
  FormikHelpers,
  ErrorMessage,
  FormikState,
} from "formik";
import Select from "react-select";
import { OnChangeValue } from "react-select";
import Cookies from "universal-cookie";
import * as cmpTypeConst from "../../pages/dashboard";

import { IDRA_SENSORS } from "../../models/constants";
import { JUNO_SENSORS } from "../../models/constants";
import { AVAILABLE_COMPONENTS } from "../../models/constants";

import sensorImage from "./sensor.png";

type Props = {
  //sensorList: Sensor[];
  outputList: ComponentsPage[];
};

type Option = {
  label: string;
  value: any;
};

export class Sidebar extends React.Component<any, any> {
  listCookie: Cookies;
  componentsList: ComponentsPage[];

  //on mount of the component (so page loading), get the cookies; if they're not present, initialize the component list to an empty array; if it is not empty, get the cookies
  componentDidMount() {
    this.listCookie = new Cookies();
    if (this.listCookie.get("compPage") != undefined)
      this.componentsList = this.listCookie.get("compPage");
    else this.componentsList = [];
  }

  state = {
    AVAILABLE_COMPONENTS,
    IDRA_SENSORS,
    JUNO_SENSORS,
    idraSelected: true,
  };

  sensors: any;

  //clears the input of the "component max and min range"
  clearInput() {
    console.log("clearing");
    (document.getElementById("cmpMinRange") as HTMLInputElement).value = "";
    (document.getElementById("cmpMaxRange") as HTMLInputElement).value = "";
  }

  //Selects the car used in order to show the menu
  onCarSelect = (selection) => {
    if (selection.target.value == "Idra") {
      this.setState({ idraSelected: true });
    } else {
      this.setState({ idraSelected: false });
    }
  };

  handleChange = (newSensors: OnChangeValue<Option, true>) => {
    this.sensors = newSensors;
    if (this.sensors.at(-1) != undefined) {
      (document.getElementById("cmpMinRange") as HTMLInputElement).value =
        this.sensors.at(-1).value.minValue;
      (document.getElementById("cmpMaxRange") as HTMLInputElement).value =
        this.sensors.at(-1).value.maxValue;
    }
  };

  //need a function that calls the database and retrieves all the available sensors

  //trigger to do the callback in order to pass the just generated component to the parent, and render in the page immediately later
  onCreationOfComponent = (provComponent: ComponentsPage) => {
    this.props.parentCallback(provComponent);
  };

  render() {
    return (
      <div className="offcanvas offcanvas-end" id="offcanvasRight">
        <img src={sensorImage} className="sensorImage"></img>
        <div className="offcanvas-body">
          <hr className="my-4" />

          <Formik
            initialValues={{
              nameComponent: "sideInput",
              typeComponent: 1,
              cmpMinRange: 0,
              cmpMaxRange: 0,
              sensorSelected: new Array<Sensor>(),
              prescaler: 1,
              value: 0,
              w: 2,
              h: 2,
            }}
            onSubmit={(
              values: ComponentsPage,
              //{ setSubmitting,
              // }: FormikHelpers<ComponentsPage>,
              action
            ) => {
              let prov = {} as ComponentsPage;

              this.componentsList = this.listCookie.get("compPage");
              //push into components
              prov = values;
              prov.compID = uuidv4();
              prov.sensorSelected = new Array<Sensor>();
              console.log(this.sensors);

              if (this.sensors != undefined) {
                prov.sensorSelected = this.sensors.map(
                  (sens: any) => sens.value
                );

                prov.w = AVAILABLE_COMPONENTS[prov.typeComponent - 1].w;
                prov.h = AVAILABLE_COMPONENTS[prov.typeComponent - 1].h;
                prov.cmpMinRange =
                  values.cmpMinRange || prov.sensorSelected[0].minValue;
                prov.cmpMaxRange =
                  values.cmpMaxRange || prov.sensorSelected[0].maxValue;
                this.onCreationOfComponent(prov);
              }

              //reset
              action.resetForm();

              setTimeout(() => {}, 500);
            }}
          >
            <Form>
              <div className="myFormGroup">
                <label>Select component</label>
                <Field
                  component="select"
                  className="form-select"
                  id="typeComponent"
                  name="typeComponent"
                >
                  {this.state.AVAILABLE_COMPONENTS.map((Indicator) => (
                    <option
                      key={"Indicator" + Indicator.ID}
                      value={Indicator.ID}
                    >
                      {Indicator.componentName}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="myFormGroup">
                <label>Select car</label>
                <Field
                  component="select"
                  className="form-select"
                  id="carSelect"
                  name="carSelect"
                  onChange={this.onCarSelect}
                >
                  <option value="Idra">Idra</option>
                  <option value="Juno">Juno</option>
                </Field>
              </div>

              {this.state.idraSelected && (
                <div className="myFormGroup">
                  <label>Select multi-sensor for Idra</label>
                  <Select
                    key={`my_unique_select_key__${JSON.stringify(
                      this.sensors
                    )}`}
                    options={this.state.IDRA_SENSORS}
                    onChange={this.handleChange}
                    isMulti={true}
                    isClearable={true}
                    isSearchable={true}
                  ></Select>
                </div>
              )}

              {!this.state.idraSelected && (
                <div className="myFormGroup">
                  <label>Select multi-sensor for Juno</label>
                  <Select
                    key={`my_unique_select_key__${JSON.stringify(
                      this.sensors
                    )}`}
                    options={this.state.JUNO_SENSORS}
                    onChange={this.handleChange}
                    isMulti={true}
                    isClearable={true}
                    isSearchable={true}
                  ></Select>
                </div>
              )}
              <div className="myFormGroup">
                <label>Select a name</label>
                <div className="input-group mb-3">
                  <Field
                    component="input"
                    className="form-control"
                    id="nameComponent"
                    name="nameComponent"
                    placeholder="Select a sensor name"
                  />
                </div>
              </div>

              <hr className="my-4" />

              <div className="myFormGroup">
                <label>Insert Min and Max value on the scale</label>
                <div className="input-group mb-3">
                  <Field
                    className="form-control"
                    id="cmpMinRange"
                    name="cmpMinRange"
                    placeholder="Minimum range"
                  />
                  <Field
                    className="form-control"
                    id="cmpMaxRange"
                    name="cmpMaxRange"
                    placeholder="Maximum range"
                  />
                </div>
              </div>

              <div className="myFormGroup">
                <label>Insert a prescaler</label>
                <Field
                  component="select"
                  className="form-select"
                  id="prescaler"
                  name="prescaler"
                >
                  <option value={1000}>x1000</option>
                  <option value={100}>x100</option>
                  <option value={10}>x10</option>
                  <option defaultValue={1}>x1</option>
                  <option value={0.1}>x0.1</option>
                  <option value={0.01}>x0.01</option>
                  <option value={0.001}>x0.001</option>
                </Field>
              </div>

              <input
                className="btn btn-primary interactiveBtn"
                type="submit"
                value="Submit"
                onClick={this.clearInput}
              ></input>
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
