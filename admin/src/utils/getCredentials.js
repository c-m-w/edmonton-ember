/// getCredentials.js

export default function getCredentials() {

    return document.cookie
            .split(';')
            .find(key => key.startsWith('credentials'))
            ?.split('=')[1];
}