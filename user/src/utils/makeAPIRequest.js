/// makeAPIRequest.js

export default async function makeAPIRequest(endpoint, method, body) {

    const response = await(await fetch(`http://10.0.1.64:5000/api/user/${endpoint}`, {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: body && JSON.stringify(body)
    })).json();

    return response;
}
