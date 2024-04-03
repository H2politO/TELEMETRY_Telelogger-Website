type Props = {
  comp: ComponentsPage;
  value: number[];
};

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { components } from "react-select";
import { ComponentsPage } from "../../models/componentsPage";

export default class SimpleLight extends React.Component<any, any> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>
        {
          //this.props.comp.sensorSelected.map((s, index) => (
          //<div>
          <div className="led-box">
            <div
              className={
                this.props.value[0] != 0
                  ? "led-green led-component"
                  : "led-red led-component"
              }
            ></div>
          </div>
          // </div>
          //))
        }
      </div>
    );
  }
}
