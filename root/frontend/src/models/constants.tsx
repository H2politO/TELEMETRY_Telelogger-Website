const IDRA_SENSORS = [
    { value: { ID: '1', topicName: 'Idra/Emergency', sensorName: 'Emergency', minValue: 1, maxValue: 100 }, label: 'Emergency' },
    { value: { ID: '2', topicName: 'Idra/Speed', sensorName: 'Speed', minValue: 1, maxValue: 100 }, label: 'Speed' },
    { value: { ID: '3', topicName: 'Idra/Temperature', sensorName: 'Temperature', minValue: 1, maxValue: 100 }, label: 'Temperature' },
    { value: { ID: '4', topicName: 'Idra/FCVoltage', sensorName: 'Fuel Cell Voltage', minValue: 1, maxValue: 100 }, label: 'FCVoltage' },
    { value: { ID: '5', topicName: 'Idra/SCVoltage', sensorName: 'Supercap Voltage', minValue: 1, maxValue: 100 }, label: 'SCVoltage' },
    { value: { ID: '6', topicName: 'Idra/Strategy', sensorName: 'Strategy', minValue: 1, maxValue: 100 }, label: 'Strategy' },
    { value: { ID: '7', topicName: 'Idra/MotorOn', sensorName: 'Motor On', minValue: 1, maxValue: 100 }, label: 'MotorOn' },
    { value: { ID: '8', topicName: 'Idra/ActuationOn', sensorName: 'Actuation On', minValue: 1, maxValue: 100 }, label: 'ActuationOn' },
    { value: { ID: '9', topicName: 'Idra/Purge', sensorName: 'Purge On', minValue: 1, maxValue: 100 }, label: 'Purge' },
    { value: { ID: '10', topicName: 'Idra/PowerMode', sensorName: 'Power Mode On', minValue: 1, maxValue: 100 }, label: 'PowerMode' },
    { value: { ID: '11', topicName: 'Idra/Short', sensorName: 'Short On', minValue: 1, maxValue: 100 }, label: 'Short' },
    { value: { ID: '12', topicName: 'Idra/MotorCurrent', sensorName: 'Motor Current', minValue: 1, maxValue: 100 }, label: 'MotorCurrent' },
    { value: { ID: '13', topicName: 'Idra/Messaging', sensorName: 'Messaging client', minValue: 1, maxValue: 100 }, label: 'Messaging' },
    { value: { ID: '14', topicName: 'Idra/Position', sensorName: 'Position', minValue: 1, maxValue: 100 }, label: 'Position' }
]

const JUNO_SENSORS = [
    { value: { ID: '1', topicName: 'Juno/Emergency', sensorName: 'Emergency', minValue: 1, maxValue: 100 }, label: 'Emergency' },
    { value: { ID: '2', topicName: 'Juno/Speed', sensorName: 'Speed', minValue: 1, maxValue: 100 }, label: 'Speed' },
    { value: { ID: '3', topicName: 'Juno/Temperature', sensorName: 'Temperature', minValue: 1, maxValue: 100 }, label: 'Temperature' },
    { value: { ID: '6', topicName: 'Juno/Strategy', sensorName: 'Strategy', minValue: 1, maxValue: 100 }, label: 'Strategy' },
    { value: { ID: '7', topicName: 'Juno/MotorOn', sensorName: 'Motor On', minValue: 1, maxValue: 100 }, label: 'MotorOn' },
    { value: { ID: '13', topicName: 'Juno/Messaging', sensorName: 'Messaging client', minValue: 1, maxValue: 100 }, label: 'Messaging' },
    { value: { ID: '14', topicName: 'Juno/Position', sensorName: 'Position', minValue: 1, maxValue: 100 }, label: 'Position' }
]

const AVAILABLE_COMPONENTS = [
    { ID: 1, componentName: 'Check Light', w: 3, h: 3 },
    { ID: 2, componentName: 'Radial Gauge', w: 3, h: 8 },
    { ID: 3, componentName: 'Linear Gauge', w: 6, h: 6 },
    { ID: 4, componentName: 'Plot', w: 5, h: 9 },
    { ID: 5, componentName: 'Circuit map', w: 6, h: 16},
    { ID: 6, componentName: 'Lap timer', w: 3, h: 12},
    { ID: 7, componentName: 'Message Sender', w: 3, h: 12 },
    { ID: 8, componentName: 'Uploader', w: 5, h: 9 },
]

export { IDRA_SENSORS }
export { JUNO_SENSORS }
export { AVAILABLE_COMPONENTS }