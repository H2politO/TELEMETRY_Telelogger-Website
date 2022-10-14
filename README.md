# The telemetry project

<img src="https://user-images.githubusercontent.com/68699073/195819838-bead5037-85fb-468d-8cda-25247ddff261.png" align="middle" height="200" >

[teamH2polito.com](teamH2polito.com)

This is the H2politO telemetry project, a complete full stack application to manage and access data from the team vehicles provided by the informatics division of the team. It is composed of two folders, one for the backend and one for the frontend. 

The data is gahered from a smartphone located inside the car and sent via MQTT protocol. It is then received (for now) by the webApp and the data visualized on screen.

Future implementations will see: 

- [ ] GPS tracking and the relative visualization of the car in a  circuit map
- [ ] Add a database to save and store data to access remotely in a second time
- [ ] Implement a backend to create APIs for the WebApp and the Smartphone App
- [ ] Fix the website: check this document for requests from the other areas and requred functionalities to implement: https://docs.google.com/spreadsheets/d/1g0NdiVbP7HcLzeH54g0Nv1C1LYvL4Vpl589inKtEiug/edit?usp=sharing
- [ ] Implement a MQTT broker on the backend to migrate from the actual public broker to a private one
