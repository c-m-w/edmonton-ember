# patch_url.py

paths = ["admin", "admin_login", "user"]

import os

def patch_js(file):

    f = open(file, "r")

    str = f.read()
    f.close()
    str = str.replace("http://10.0.1.64:5000", "https://eember.ca")

    f = open(file, "w")
    f.write(str)
    f.close()

def patch_html(file, root):

    f = open(file, "r")

    str = f.read()
    f.close()
    str = str.replace("/static", "/public/" + root + "/static")

    f = open(file, "w")
    f.write(str)
    f.close()


def patch_directory(directory, root):

    for file in os.listdir(directory):

        if (os.path.isdir(directory + "\\" + file)):

            patch_directory(directory + "\\" + file, root)

        if ".js" in file:

            patch_js(directory + "\\" + file)

        if ".html" in file:

            patch_html(directory + "\\" + file, root)

for path in paths:

    patch_directory("public\\" + path, path)