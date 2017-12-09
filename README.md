WORK IN PROGRESS

# TrackMyAsset

## Overview
Simple application for collecting sensor data of assets (including GPS positions) via REST API and displaying the data in a Web UI.

Used technologies:
* [Node.js](https://nodejs.org/en/)
* [Angular 4](https://angular.io/)
* [Angular Material2](https://github.com/angular/material2) 
* [Angular Google Maps](https://angular-maps.com/)
* [Auth0](https://auth0.com/)
* [LokiJS](http://lokijs.org/#/)

## Development

UI development is done using Angular CLI. Simply run `ng serve` to run the UI without backend (backend is mocked, see `src/app/shared/services/service.providers.ts`)

The backend is developed using Node.js, run `node server.js` to start the server. The Angular-based UI is served from the `dist` directory, so run `ng build` before starting the server or run `npm run buildrun`.

## User Manual

### Web UI

The Web UI can be use to create, view and edit the assets. And to view the current values (incl. GPS position if
available) submitted by your assets.

### Asset API

API to let your assets submit data points (incl. GPS position) to the backend services. The submitted data is
available via the Web UI.

