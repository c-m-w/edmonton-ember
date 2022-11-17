### verify_credentials.py

from hashlib import sha256
import json

from passwords import admin_username_hash, admin_password_hash

def verify_credentials(credentials):

    parsed_creds = json.loads(credentials)

    username = parsed_creds["username"]
    password = parsed_creds["password"]

    username_hash = sha256(username.encode("utf-8")).hexdigest()
    password_hash = sha256(password.encode("utf-8")).hexdigest()

    return (username_hash == admin_username_hash and
            password_hash == admin_password_hash)
