const axios = require("axios");
const cognitoConfig = require("../config/cognitoConfig.json");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");

const JWKS_URL = `https://cognito-idp.${cognitoConfig.region}.amazonaws.com/${cognitoConfig.userPool}/.well-known/jwks.json`;

class AuthErr extends Error {}

async function getPems() {
    try {
        const { data } = await axios.get(`${JWKS_URL}`);
        if (!data || !data.keys) {
            throw Error("Error downloading JWKs");
        }
        const pems = {};
        for (let i = 0; i < data.keys.length; i++) {
            pems[data.keys[i].kid] = jwkToPem(data.keys[i]);
        }
        return pems;
    } catch (err) {
        console.log(`Error getting JWKs: ${err}`);
        throw Error("Error occured downloading JWKs");
    }
}

async function verify(pems, auth) {
    const token = auth.substring(7); // remove 'Bearer ' from auth header
    const unverified = jwt.decode(token, { complete: true });

    if (!unverified) {
        console.log(`Error decoding token.`);
        throw new AuthErr("Invalid JWT.");
    } else if (!unverified.header.kid || !pems[unverified.header.kid]) {
        console.log("Invalid JWT. KID not found.");
        throw new AuthErr("Invalid JWT.");
    }

    return jwt.verify(
        token,
        pems[unverified.header.kid],
        {
            issuer: JWKS_URL.substring(
                0,
                JWKS_URL.indexOf("/.well-known/jwks.json")
            ),
            maxAge: 60 * 60, //3600 seconds
        },
        (err, decoded) => {
            if (err) {
                console.log(`Invalid JWT: ${err}.`);
                throw new AuthErr(
                    err instanceof jwt.TokenExpiredError
                        ? `JWT expired.`
                        : "Invalid JWT"
                );
            }

            // Verify allowed token_use
            if (decoded.token_use !== "access" && decoded.token_use !== "id") {
                console.log(
                    `token_use ${decoded.token_use} not "access" or "id".`
                );
                throw new AuthErr("Invalid JWT.");
            }

            // Verify aud or client_id
            const clientId = decoded.aud || decoded.client_id;
            if (clientId !== cognitoConfig.clientId) {
                console.log(
                    `Invalid JWT. Client id ${clientId} is not ${cognitoConfig.clientId}.`
                );
                throw new AuthErr("Invalid JWT.");
            }
            return decoded;
        }
    );
}

exports.getVerifyMiddleware = () => (req, res, next) => {
    (async () => {
        try {
            const { token_use, scope, email } = await verify(
                await getPems(),
                req.get("Authorization")
            );
            req.user = { token_use };
            if (token_use === "access") {
                req.user.scope = scope.split(" ");
            } else if (token_use === "id") {
                req.user.email = email;
            }
            next();
        } catch (err) {
            console.log(err);
            res.status(err instanceof AuthErr ? 401 : 500).send(
                err.message || err
            );
        }
    })();
};
