// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  mockbackend: true,
  googleApiKey: 'AIzaSyCwHk44aKq08icKLYXonfI7LpM93Zzy-ww',
  // Auth0 Settings
  auth0_redirectUri: 'http://localhost:4200/login',
  auth0_clientID: 'f1G413kRXgqQWOuuY5nXhFeRnlluOu6e',
  auth0_domain: 'tiews.eu.auth0.com',
  auth0_audience: 'https://tiews.eu.auth0.com/userinfo'
};
