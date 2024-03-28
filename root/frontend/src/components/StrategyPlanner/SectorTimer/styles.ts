import { blue } from "@mui/material/colors";
import { CSSProperties } from "react";

export const rootStyle: CSSProperties = {
  zIndex: "10",
  width: "100%",
  height: "70%",
  borderRadius: "20px",
  overflowY: "scroll",
  background: "solid",
  backgroundColor: "white",
  textAlign: "center",
};

export const headerStyle: CSSProperties = {
  display: "block",
};

export const titleStyle: CSSProperties = {
  textAlign: "center",
  display: "block",
  color: "green",
  height: "30px",
  fontSize: "30px",
  width: "100%",
};

export const xButtonStyle: CSSProperties = {
  position: "relative",
  top: "-27px",
  right: "10px",

  height: "30px",

  color: "red",
  border: "solid",
  borderRadius: "10px",
  borderColor: "black",
  borderWidth: "1px",

  float: "right",
};
export const mainTimer: CSSProperties = {
  textAlign: "center",
  fontSize: "30px",
};
export const timer: CSSProperties = {
  color: "blue",
  fontSize: "30px",
};

export const secTime: CSSProperties = {
  fontSize: "25px",
  textAlign: "center",
  color: "black",
};
