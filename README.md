WORK IN PROGRESS

# TrackMyAsset

## Overview
Simple application for collecting sensor data of assets (including GPS positions) via simple  (HTTP) API and displaying the data in a Web UI.

Used technologies:
* [Node.js](https://nodejs.org/en/)
* [Angular 4](https://angular.io/)
* [Angular Material2](https://github.com/angular/material2) 
* [Angular Google Maps](https://angular-maps.com/)
* [Auth0](https://auth0.com/)
* [LokiJS](http://lokijs.org/#/)

## User Manual

### Web UI

The Web UI can be use to create, view and edit the assets. And to view the current values (incl. GPS position if
available) submitted by your assets.

### Asset API

API to let your assets submit data points (incl. GPS position) to the backend services. The submitted data is available via the Web UI.

API Endpoint: `/api/assets/<AssetId>`

API Method: `GET`


|Query Parameter|Type/Format|Description|
|---------|-----------|-----------|
|api_secret | String | Secret for this asset. Required, otherwise 401 Forbidden will be returned.|
|api_timestamp | Number (milliseconds since epoche, UTC) | Timestamp of submitted values. If omitted the server time will be used.|
|gps_lat| Number (decimal degrees)| GPS Latitude. Optional, but has to be submitted together with longitude.|
|gps_lon| Number (decimal degrees) | GPS Longitude. Optional, but has to be submitted together with latitude.|
|all others| various | All other query parameters will be stored as datapoints within the asset. |

**Important: To allow further enhancements of the API all parameters starting with `api_` or `gps_` are reserved and should not be used for datapoints!**

## Development

UI development is done using Angular CLI. Simply run `ng serve` to run the UI without backend (backend is mocked, see `src/app/shared/services/service.providers.ts`)

The backend is developed using Node.js, run `node server.js` to start the server. The Angular-based UI is served from the `dist` directory, so run `ng build` before starting the server or run `npm run buildrun`.

### Configuration

#### UI
The configuration can be found in the `environment.ts`. Please use your own Google-API keys! 

For authentication Auth0 is used. Create your own OpenId Connect Application in your Auth0 account and configure the `auth0_` settings according to your needs.

#### Backend
The configuration for the backend can be found in the file `configuration.js` file. Ensure that the `oidc*` settings match your settings configured for your OpenId Connect Application in Auth0. The `oidc*` settings can be set via process environments (`OIDC_AUDIENCE`, `OIDC_ISSUER`, `OIDC_WELLKNOWN`).

### Persistence

### Authentication / Authorization

