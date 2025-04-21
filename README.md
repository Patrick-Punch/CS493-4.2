# Challenge: Add MySQL to an app

## Install and Run

* Run `npm install` to install the dependencies.
* Run `npm start` to start the app.

## Usage

* POST messages:

  ```
  curl -H 'Content-Type: application/json' \
      -d '{"message": "This is a message!"}' \
      http://localhost:8086/messages
  ```

* GET messages:

  ```
  curl http://localhost:8086/messages
  ```

* GET a message by ID (a number):

  ```
  curl http://localhost:8086/messages/{id}
  ```

* DELETE a message by ID (a number):

  ```
  curl -X DELETE http://localhost:8086/messages/{id}
  ```

