# iot-system-architecture

## How to Run

- on the root run `docker compose build`
- on the root run `docker compose up`
- go to [http://localhost:3001/](http://localhost:3001/)


## System Architecture

### Pump Simulator

Simulates an actual pump sending messages every n amount of ms. It reads row by row the data on the CSV and publishes it to a Message Broker. 

### Data Parser

NodeJS microservice normalizing data. There's one MS per data input: Mapping from diverse data inputs to a normalized known data structure, as well as (not doing it yet) storing the most up to date status of the device to Redis, storing the historic data to a database, and streaming the latest messages to all subscribed clients for real-time feed on the UI.

### Api Rest

Gateway to historic data. Allows parsing and creating complex queries.

### Dashboard

Consumes both, real-time data and historic data, to display information to the customer.

### PostgresQL

Used a historic database. Not well suited for big data but good enough and easy to setup for this project. Should be swaped for real usages.

### Mosquito MQTT

Used as a internal PubSub communication between services, as well as client facing real-time feed. In real life, there should be another microservice to avoid exposing internal messaging systems to customers.
