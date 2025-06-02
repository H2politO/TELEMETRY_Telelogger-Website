const IDRA_SENSORS = [
  {
    value: {
      ID: "1",
      topicName: "Idra/Speed",
      sensorName: "Vehicle Speed",
      minValue: 0,
      maxValue: 60,
    },
    label: "Vehicle Speed",
  },
  {
    value: {
      ID: "2",
      topicName: "Idra/Temperature",
      sensorName: "FC Temperature",
      minValue: 0,
      maxValue: 90,
    },
    label: "FC Temperature",
  },
  {
    value: {
      ID: "3",
      topicName: "Idra/actAuxVolt",
      sensorName: "Actuation Aux Voltage",
      minValue: 10,
      maxValue: 50,
    },
    label: "Actuation Aux Voltage",
  },
  {
    value: {
      ID: "4",
      topicName: "Idra/actInpVolt",
      sensorName: "Actuation Input Voltage",
      minValue: 5,
      maxValue: 50,
    },
    label: "Actuation Input Voltage",
  },
  {
    value: {
      ID: "5",
      topicName: "Idra/Strategy",
      sensorName: "Strategy",
      minValue: 0,
      maxValue: 20,
    },
    label: "Strategy",
  },
  {
    value: {
      ID: "6",
      topicName: "Idra/MotorOn",
      sensorName: "Motor On",
      minValue: 0,
      maxValue: 1,
    },
    label: "MotorOn",
  },
  {
    value: {
      ID: "7",
      topicName: "Idra/ActuationOn",
      sensorName: "Act On",
      minValue: 0,
      maxValue: 1,
    },
    label: "Act On",
  },
  {
    value: {
      ID: "8",
      topicName: "Idra/Purge",
      sensorName: "Purge On",
      minValue: 0,
      maxValue: 1,
    },
    label: "Purge",
  },
  {
    value: {
      ID: "9",
      topicName: "Idra/PowerMode",
      sensorName: "Power Mode On",
      minValue: 0,
      maxValue: 1,
    },
    label: "PowerMode",
  },
  {
    value: {
      ID: "10",
      topicName: "Idra/Short",
      sensorName: "Short On",
      minValue: 0,
      maxValue: 1,
    },
    label: "Short",
  },
  {
    value: {
      ID: "11",
      topicName: "Idra/MotorCurrent",
      sensorName: "Motor Current",
      minValue: 0,
      maxValue: 20,
    },
    label: "MotorCurrent",
  },
  {
    value: {
      ID: "12",
      topicName: "Idra/SetCurrentDcdc",
      sensorName: "SC Charge Current Setpoint",
      minValue: 1,
      maxValue: 100,
    },
    label: "SC Charge Current Set",
  },
  {
    value: {
      ID: "13",
      topicName: "Idra/Position",
      sensorName: "Position",
      minValue: 1,
      maxValue: 100,
    },
    label: "Position",
  },
  {
    value: {
      ID: "14",
      topicName: "Idra/BARHeight",
      sensorName: "Barometric Altitude",
      minValue: 0,
      maxValue: 500,
    },
    label: "Altimetry",
  },
  {
    value: {
      ID: "15",
      topicName: "Idra/GPSSpeed",
      sensorName: "Gps Speed",
      minValue: 0,
      maxValue: 60,
    },
    label: "Gps Speed",
  },
  {
    value: {
      ID: "16",
      topicName: "Idra/FanDuty",
      sensorName: "Fan duty",
      minValue: 0,
      maxValue: 100,
    },
    label: "Fan duty",
  },
  {
    value: {
      ID: "17",
      topicName: "Idra/dcdcInVolt",
      sensorName: "DcDc Input voltage",
      minValue: 0,
      maxValue: 50,
    },
    label: "DcDc Input voltage",
  },
  {
    value: {
      ID: "18",
      topicName: "Idra/dcdcOutVolt",
      sensorName: "DcDc Output voltage",
      minValue: 0,
      maxValue: 40,
    },
    label: "DcDc Output voltage",
  },
  {
    value: {
      ID: "19",
      topicName: "Idra/dcdcInCurr",
      sensorName: "DcDc Input current",
      minValue: 0,
      maxValue: 7,
    },
    label: "DcDc Input current",
  },
  {
    value: {
      ID: "20",
      topicName: "Idra/dcdcOutCurr",
      sensorName: "DcDc Output current",
      minValue: 0,
      maxValue: 7,
    },
    label: "DcDc Output current",
  },
  {
    value: {
      ID: "21",
      topicName: "Idra/cockTemp",
      sensorName: "Cockpit Temperature",
      minValue: -5,
      maxValue: 70,
    },
    label: "Cockpit temperature",
  },
  {
    value: {
      ID: "22",
      topicName: "Idra/boardVoltage",
      sensorName: "Telemetry supply voltage",
      minValue: 0,
      maxValue: 16,
    },
    label: "Telemetry supply voltage",
  },
  {
    value: {
      ID: "23",
      topicName: "Idra/id_bldc",
      sensorName: "Id BLDC",
      minValue: 0,
      maxValue: 16,
    },
    label: "Id BLDC",
  },
  {
    value: {
      ID: "24",
      topicName: "Idra/iq_bldc",
      sensorName: "Iq BLDC",
      minValue: 0,
      maxValue: 16,
    },
    label: "Iq BLDC",
  },
  {
    value: {
      ID: "25",
      topicName: "Idra/vd_bldc",
      sensorName: "Vd BLDC",
      minValue: 0,
      maxValue: 40,
    },
    label: "Vd BLDC",
  },
  {
    value: {
      ID: "26",
      topicName: "Idra/vq_bldc",
      sensorName: "Vq BLDC",
      minValue: 0,
      maxValue: 40,
    },
    label: "Vq BLDC",
  },
  {
    value: {
      ID: "27",
      topicName: "Idra/t_mos_bldc",
      sensorName: "Mosfet Temperature BLDC",
      minValue: 0,
      maxValue: 150,
    },
    label: "Mosfet Temperature",
  },
  {
    value: {
      ID: "28",
      topicName: "Idra/speedRpm_bldc",
      sensorName: "Motor RPM BLDC",
      minValue: 0,
      maxValue: 4000,
    },
    label: "Motor RPM BLDC",
  },
  {
    value: {
      ID: "29",
      topicName: "Idra/SetPowerDcdc",
      sensorName: "SC Charge Power Setpoint",
      minValue: 1,
      maxValue: 100,
    },
    label: "SC Charge Power Set",
  },
  {
    value: {
      ID: "30",
      topicName: "Idra/dcdcOutPower",
      sensorName: "Dc-Dc Output Power",
      minValue: 1,
      maxValue: 100,
    },
    label: "Dc-Dc Output Power",
  },
  {
    value: {
      ID: "31",
      topicName: "Idra/dcdcanFDutySend",
      sensorName: "Dc-Dc Fan Duty Set",
      minValue: 0,
      maxValue: 100,
    },
    label: "Dc-Dc Fan Duty Set",
  },
  {
    value: {
      ID: "32",
      topicName: "Idra/dcdcAuxCurrent",
      sensorName: "Dc-Dc Auxiliary Current",
      minValue: 0,
      maxValue: 2,
    },
    label: "Dc-Dc Auxiliary Current",
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
      sensorName: "Vehicle Speed",
      minValue: 0,
      maxValue: 60,
    },
    label: "Vehicle Speed",
  },
  {
    value: {
      ID: "3",
      topicName: "Juno/EngineCoolantTemperature",
      sensorName: "Engine Coolant Temperature",
      minValue: 0,
      maxValue: 180,
    },
    label: "Engine CoolantTemperature",
  },
  {
    value: {
      ID: "4",
      topicName: "Juno/EngineAuxiliaryTemperature",
      sensorName: "Auxiliary Engine Temperature",
      minValue: 0,
      maxValue: 180,
    },
    label: "Auxiliary Engine Temperature",
  },
  {
    value: {
      ID: "5",
      topicName: "Juno/RPM",
      sensorName: "RPM",
      minValue: 0,
      maxValue: 6500,
    },
    label: "RPM",
  },
  {
    value: {
      ID: "6",
      topicName: "Juno/MotorOn",
      sensorName: "Crank",
      minValue: 0,
      maxValue: 1,
    },
    label: "Crank",
  },
  {
    value: {
      ID: "7",
      topicName: "Juno/Messaging",
      sensorName: "Porco dio cristiano",
      minValue: 1,
      maxValue: 100,
    },
    label: "Messaging",
  },
  {
    value: {
      ID: "8",
      topicName: "Juno/Position",
      sensorName: "Position",
      minValue: 1,
      maxValue: 100,
    },
    label: "Position",
  },
  {
    value: {
      ID: "9",
      topicName: "Juno/TPS",
      sensorName: "Throttle Position",
      minValue: 1,
      maxValue: 100,
    },
    label: "Throttle Position",
  },
  {
    value: {
      ID: "10",
      topicName: "Juno/Lambda",
      sensorName: "Lambda",
      minValue: 0,
      maxValue: 10,
    },
    label: "Lambda",
  },
  {
    value: {
      ID: "11",
      topicName: "Juno/VoltageBattery",
      sensorName: "Vbat",
      minValue: 6,
      maxValue: 15,
    },
    label: "Battery Voltage",
  },
  {
    value: {
      ID: "12",
      topicName: "Juno/GPSSpeed",
      sensorName: "GPS Speed",
      minValue: 0,
      maxValue: 60,
    },
    label: "GPS Speed",
  },
  {
    value: {
      ID: "13",
      topicName: "Juno/EngineMap",
      sensorName: "Engine Map / CAL_Select",
      minValue: 0,
      maxValue: 12,
    },
    label: "CAL Select",
  },
  {
    value: {
      ID: "14",
      topicName: "Juno/JM_Amps",
      sensorName: "Joule Meter Current",
      minValue: 0,
      maxValue: 150,
    },
    label: "JM Amps",
  },
  {
    value: {
      ID: "15",
      topicName: "Juno/JM_Volts",
      sensorName: "Joule Meter Voltage",
      minValue: 0,
      maxValue: 20,
    },
    label: "JM Volts",
  },  
];

const AVAILABLE_COMPONENTS = [
  { ID: 1, componentName: "BUGGED - Check Light", w: 3, h: 3 },
  { ID: 2, componentName: "Radial Gauge", w: 3, h: 8 },
  { ID: 3, componentName: "Linear Gauge", w: 6, h: 6 },
  { ID: 4, componentName: "Slow Plot", w: 5, h: 9 },
  { ID: 5, componentName: "Circuit map", w: 6, h: 16 },
  { ID: 6, componentName: "Lap timer", w: 3, h: 12 },
  { ID: 7, componentName: "Message Sender", w: 3, h: 12 },
  { ID: 8, componentName: "Uplot live - 1 Input", w: 5, h: 9 },
  { ID: 9, componentName: "Resistive force", w: 5, h: 6 },
  { ID: 10, componentName: "Average of Data", w: 2, h: 4 },
  { ID: 11, componentName: "Uplot Live - 2 Inputs", w: 5, h: 9 }, 
  { ID: 12, componentName: "Push Button", w: 2, h: 3 },
  { ID: 13, componentName: "Cellometro", w: 4, h: 4 },
];

export { IDRA_SENSORS };
export { JUNO_SENSORS };
export { AVAILABLE_COMPONENTS };
