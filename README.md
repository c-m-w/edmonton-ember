# EDMONTON EMBER

This website consists of four components: user, admin, admin_login, and the backend.

## /user/

The program for the user interface which customers will use.

## /admin_login

Login for the admin panel. You must access this page first to login in order for the actual admin panel to be sent to you.

## /admin

The admin panel. This is where products can be added, edited, etc. This is also where orders can be viewed and fulfilled.

### Screenshots

#### /admin/products

![Screenshot](screenshots/admin-product-list.png)

#### /admin/products/:id

![Screenshot](screenshots/admin-edit-product.png)

#### /admin/orders

![Screenshot](screenshots/admin-order-list.png)

#### /admin/orders/:id

![Screenshot](screenshots/admin-view-order-unfulfilled.png)

![Screenshot](screenshots/admin-view-order-fulfilled.png)

## /backend

The Flask application which controls the API of the website. It also is responsible for sending static javascript and css files and allowing or disallowing the admin panel to be sent to the client.
