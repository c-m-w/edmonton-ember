/// attemptLogin.js

export default async function attemptLogin(credentials) {

    const response = await(await fetch("http://10.0.1.64:5000/api/admin/login", {
        method: "POST",
        headers: {
            "Authorization": JSON.stringify(credentials)
        }
    })).json();

    return response && response.success
}