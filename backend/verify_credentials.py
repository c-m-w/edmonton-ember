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

    return (username_hash == "e9058ab198f6908f702111b0c0fb5b36f99d00554521886c40e2891b349dc7a1" and
            password_hash == "e9058ab198f6908f702111b0c0fb5b36f99d00554521886c40e2891b349dc7a1")