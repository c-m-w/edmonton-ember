/// attemptLogin.js

export default async function attemptLogin(credentials) {

    const response = await(await fetch("http://127.0.0.1:5000/api/admin/login", {
        method: "POST",
        headers: {
            "Authorization": JSON.stringify(credentials)
        }
    })).json();

    return response && response.success
}