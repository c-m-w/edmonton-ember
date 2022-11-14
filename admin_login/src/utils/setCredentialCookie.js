/// setCredentialCookie.js

export default function setCredentialCookie(credentials) {

    const date = new Date();

    date.setTime(date.getTime() + 60 * 60 * 1000); // 60 minutes
    document.cookie = `credentials=${JSON.stringify(credentials)}; expires=${date.toUTCString()}`;
}
