module.exports = {
    serverPort: process.env.PORT || '3000',
    oidcAudience: process.env.OIDC_AUDIENCE || 'f1G413kRXgqQWOuuY5nXhFeRnlluOu6e',
    oidcIssuer: process.env.OIDC_ISSUER || 'https://tiews.eu.auth0.com/',
    oidcWellKnown: process.env.OIDC_WELLKNOWN || 'https://tiews.eu.auth0.com/.well-known/jwks.json'
}