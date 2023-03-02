/// makeRequest.js

import getCredentials from "./getCredentials";

export default async function makeAPIRequest(endpoint, method, body) {

    console.log("creds")
    console.log(getCredentials());

    const response = await(await fetch(`http://10.0.1.50:5000/api/admin/${endpoint}`, {
        method: method,
        headers: {
            "Authorization": getCredentials(),
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: body && JSON.stringify(body)
    })).json();

    return response;
}