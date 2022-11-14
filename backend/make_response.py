### make_response.py

import json

def make_response(success, data=None):

    return json.dumps({"success": success, "data": data})