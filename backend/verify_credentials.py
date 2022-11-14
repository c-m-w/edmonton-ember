### verify_credentials.py

from hashlib import sha256
import json

def verify_credentials(credentials):

    parsed_creds = json.loads(credentials)
    print("parsed creds")
    print(parsed_creds)
    username = parsed_creds["username"]
    password = parsed_creds["password"]

    print("passed username: " + username)
    print("passed password: " + password)
    username_hash = sha256(username.encode("utf-8")).hexdigest()
    password_hash = sha256(password.encode("utf-8")).hexdigest()

    return (username_hash == "a39bec7c3dc2c0bae76cb61a3c1a37f306eeb9516fbc64960ec46de1af47918f" and
            password_hash == "a39bec7c3dc2c0bae76cb61a3c1a37f306eeb9516fbc64960ec46de1af47918f")