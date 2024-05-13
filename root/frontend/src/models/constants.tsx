const IDRA_SENSORS = [
  {
    value: {
      ID: "1",
      topicName: "Idra/Emergency",
      sensorName: "Emergency",
      minValue: 0,
      maxValue: 1,
    },
    label: "Emergency",
  },
  {
    value: {
      ID: "2",
      topicName: "Idra/Speed",
      sensorName: "Speed",
      minValue: 0,
      maxValue: 60,
    },
    label: "Speed",
  },
  {
    value: {
      ID: "3",
      topicName: "Idra/Temperature",
      sensorName: "Temperature",
      minValue: 0,
      maxValue: 90,
    },
    label: "Temperature",
  },
  {
    value: {
      ID: "4",
      topicName: "Idra/FCVoltage",
      sensorName: "Fuel Cell Voltage",
      minValue: 10,
      maxValue: 50,
    },
    label: "FCVoltage",
  },
  {
    value: {
      ID: "5",
      topicName: "Idra/SCVoltage",
      sensorName: "Supercap Voltage",
      minValue: 5,
      maxValue: 50,
    },
    label: "SCVoltage",
  },
  {
    value: {
      ID: "6",
      topicName: "Idra/Strategy",
      sensorName: "Strategy",
      minValue: 0,
      maxValue: 20,
    },
    label: "Strategy",
  },
  {
    value: {
      ID: "7",
      topicName: "Idra/MotorOn",
      sensorName: "Motor On",
      minValue: 0,
      maxValue: 1,
    },
    label: "MotorOn",
  },
  {
    value: {
      ID: "8",
      topicName: "Idra/ActuationOn",
      sensorName: "Actuation On",
      minValue: 0,
      maxValue: 1,
    },
    label: "ActuationOn",
  },
  {
    value: {
      ID: "9",
      topicName: "Idra/Purge",
      sensorName: "Purge On",
      minValue: 0,
      maxValue: 1,
    },
    label: "Purge",
  },
  {
    value: {
      ID: "10",
      topicName: "Idra/PowerMode",
      sensorName: "Power Mode On",
      minValue: 0,
      maxValue: 1,
    },
    label: "PowerMode",
  },
  {
    value: {
      ID: "11",
      topicName: "Idra/Short",
      sensorName: "Short On",
      minValue: 0,
      maxValue: 1,
    },
    label: "Short",
  },
  {
    value: {
      ID: "12",
      topicName: "Idra/MotorCurrent",
      sensorName: "Motor Current",
      minValue: 0,
      maxValue: 20,
    },
    label: "MotorCurrent",
  },
  {
    value: {
      ID: "13",
      topicName: "Idra/Messaging",
      sensorName: "Messaging client",
      minValue: 1,
      maxValue: 100,
    },
    label: "Messaging",
  },
  {
    value: {
      ID: "14",
      topicName: "Idra/Position",
      sensorName: "Position",
      minValue: 1,
      maxValue: 100,
    },
    label: "Position",
  },
  {
    value: {
      ID: "15",
      topicName: "Idra/BARHeight",
      sensorName: "Altimetry",
      minValue: 365,
      maxValue: 385,
    },
    label: "Altimetry",
  },
  {
    value: {
      ID: "16",
      topicName: "Idra/GPSSpeed",
      sensorName: "Gps Speed",
      minValue: 0,
      maxValue: 60,
    },
    label: "Gps Speed",
  },
  {
    value: {
      ID: "17",
      topicName: "Idra/FanDuty",
      sensorName: "Fan speed",
      minValue: 0,
      maxValue: 100,
    },
    label: "Fan speed",
  },
  {
    value: {
      ID: "18",
      topicName: "Idra/boostVolt",
      sensorName: "DcDc Input voltage",
      minValue: 0,
      maxValue: 50,
    },
    label: "DcDc Input voltage",
  },
  {
    value: {
      ID: "19",
      topicName: "Idra/dcdcScVolt",
      sensorName: "DcDc Output voltage",
      minValue: 0,
      maxValue: 40,
    },
    label: "DcDc Output voltage",
  },
  {
    value: {
      ID: "20",
      topicName: "Idra/dcdcInCurr",
      sensorName: "DcDc Input current",
      minValue: 0,
      maxValue: 7,
    },
    label: "DcDc Input current",
  },
  {
    value: {
      ID: "21",
      topicName: "Idra/dcdcOutCurr",
      sensorName: "DcDc Output current",
      minValue: 0,
      maxValue: 7,
    },
    label: "DcDc Output current",
  },
  {
    value: {
      ID: "22",
      topicName: "Idra/AccX",
      sensorName: "X Acceleration",
      minValue: -20,
      maxValue: 20,
    },
    label: "X Accelleration",
  },
  {
    value: {
      ID: "23",
      topicName: "Idra/AccY",
      sensorName: "Y Acceleration",
      minValue: -20,
      maxValue: 20,
    },
    label: "Y Accelleration",
  },
  {
    value: {
      ID: "24",
      topicName: "Idra/AccZ",
      sensorName: "Z Acceleration",
      minValue: -20,
      maxValue: 20,
    },
    label: "Z Accelleration",
  },
  {
    value: {
      ID: "25",
      topicName: "Idra/GyrX",
      sensorName: "X Gyroscope",
      minValue: -20,
      maxValue: 20,
    },
    label: "X Gyroscope",
  },
  {
    value: {
      ID: "26",
      topicName: "Idra/GyrY",
      sensorName: "Y Gyroscope",
      minValue: -20,
      maxValue: 20,
    },
    label: "Y Gyroscope",
  },
  {
    value: {
      ID: "27",
      topicName: "Idra/GyrZ",
      sensorName: "Z Gyroscope",
      minValue: -20,
      maxValue: 20,
    },
    label: "Z Gyroscope",
  },
  {
    value: {
      ID: "28",
      topicName: "Idra/cockTemp",
      sensorName: "Cockpit Temperature",
      minValue: -5,
      maxValue: 70,
    },
    label: "Cockpit temperature",
  },
  {
    value: {
      ID: "29",
      topicName: "Idra/boardVoltage",
      sensorName: "Telemetry supply voltage",
      minValue: 0,
      maxValue: 16,
    },
    label: "Telemetry supply voltage",
  },
];

const JUNO_SENSORS = [
  {
    value: {
      ID: "1",
      topicName: "Juno/Emergency",
      sensorName: "Emergency",
      minValue: 1,
      maxValue: 100,
    },
    label: "Emergency",
  },
  {
    value: {
      ID: "2",
      topicName: "Juno/Speed",
      sensorName: "Speed",
      minValue: 0,
      maxValue: 60,
    },
    label: "Speed",
  },
  {
    value: {
      ID: "3",
      topicName: "Juno/EngineCoolantTemperature",
      sensorName: "Temperature",
      minValue: 0,
      maxValue: 140,
    },
    label: "Temperature",
  },
  {
    value: {
      ID: "4",
      topicName: "Juno/RPM",
      sensorName: "RPM",
      minValue: 0,
      maxValue: 6500,
    },
    label: "RPM",
  },
  {
    value: {
      ID: "5",
      topicName: "Juno/MotorOn",
      sensorName: "Motor On",
      minValue: 0,
      maxValue: 1,
    },
    label: "MotorOn",
  },
  {
    value: {
      ID: "6",
      topicName: "Juno/Messaging",
      sensorName: "Messaging client",
      minValue: 1,
      maxValue: 100,
    },
    label: "Messaging",
  },
  {
    value: {
      ID: "7",
      topicName: "Juno/Position",
      sensorName: "Position",
      minValue: 1,
      maxValue: 100,
    },
    label: "Position",
  },
  {
    value: {
      ID: "8",
      topicName: "Juno/TPS",
      sensorName: "TPS",
      minValue: 1,
      maxValue: 100,
    },
    label: "TPS",
  },
  {
    value: {
      ID: "9",
      topicName: "Juno/Lambda",
      sensorName: "Lambda",
      minValue: 1,
      maxValue: 100,
    },
    label: "Lambda",
  },
  {
    value: {
      ID: "10",
      topicName: "Juno/VoltageBattery",
      sensorName: "Vbat",
      minValue: 6,
      maxValue: 15,
    },
    label: "Voltage battery",
  },
  {
    value: {
      ID: "11",
      topicName: "Juno/AccX",
      sensorName: "X Acceleration",
      minValue: -20,
      maxValue: 20,
    },
    label: "X Accelleration",
  },
  {
    value: {
      ID: "12",
      topicName: "Juno/AccY",
      sensorName: "Y Acceleration",
      minValue: -20,
      maxValue: 20,
    },
    label: "Y Accelleration",
  },
  {
    value: {
      ID: "13",
      topicName: "Juno/AccZ",
      sensorName: "Z Acceleration",
      minValue: -20,
      maxValue: 20,
    },
    label: "Z Accelleration",
  },
  {
    value: {
      ID: "14",
      topicName: "Juno/GyrX",
      sensorName: "X Gyroscope",
      minValue: -20,
      maxValue: 20,
    },
    label: "X Gyroscope",
  },
  {
    value: {
      ID: "15",
      topicName: "Juno/GyrY",
      sensorName: "Y Gyroscope",
      minValue: -20,
      maxValue: 20,
    },
    label: "Y Gyroscope",
  },
  {
    value: {
      ID: "16",
      topicName: "Juno/GyrZ",
      sensorName: "Z Gyroscope",
      minValue: -20,
      maxValue: 20,
    },
    label: "Z Gyroscope",
  },
  {
    value: {
      ID: "17",
      topicName: "Juno/GPSSpeed",
      sensorName: "GPS Speed",
      minValue: 0,
      maxValue: 60,
    },
    label: "GPS Speed",
  },
  {
    value: {
      ID: "18",
      topicName: "Juno/EngineMap",
      sensorName: "Engine Map / CAL_Select",
      minValue: 0,
      maxValue: 12,
    },
    label: "CAL_Select",
  },  
  {
    value: {
      ID: "19",
      topicName: "Juno/JM_Amps",
      sensorName: "Joule Meter Current",
      minValue: 0,
      maxValue: 150,
    },
    label: "JM_Amps",
  },
  {
    value: {
      ID: "20",
      topicName: "Juno/JM_Volts",
      sensorName: "Joule Meter Voltage",
      minValue: 0,
      maxValue: 20,
    },
    label: "JM_Volts",
  },
];

const AVAILABLE_COMPONENTS = [
  { ID: 1, componentName: "BUGGED - Check Light", w: 3, h: 3 },
  { ID: 2, componentName: "Radial Gauge", w: 3, h: 8 },
  { ID: 3, componentName: "Linear Gauge", w: 6, h: 6 },
  { ID: 4, componentName: "Plot", w: 5, h: 9 },
  { ID: 5, componentName: "Circuit map", w: 6, h: 16 },
  { ID: 6, componentName: "Lap timer", w: 3, h: 12 },
  { ID: 7, componentName: "Message Sender", w: 3, h: 12 },
  { ID: 8, componentName: "BETA - Uplot live", w: 5, h: 9 },
  { ID: 9, componentName: "Resistive force", w: 5, h: 6 },
  { ID: 10, componentName: "Average of Data", w: 2, h: 4 },
  { ID: 11, componentName: "Uplot Live - 2 Series", w: 5, h: 9 },
];

export { IDRA_SENSORS };
export { JUNO_SENSORS };
export { AVAILABLE_COMPONENTS };
