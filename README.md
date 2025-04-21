# Challenge: Add MySQL to an app

## Install and Run

* Run `npm install` to install the dependencies.
* Run `npm start` to start the app.
* Use a .env file to store environment variables like MYSQL_USER and MYSQL_PASSWORD
* Start the mysql db in a docker container and expose port 3306 to access from the app: "
  ```
    docker run --rm --name mysql-server \
      -network mysql-net \
      e "MYSQL_RANDOM_ROOT_PASSWORD=yes" \
      e "MYSQL_DATABASE=messagesdb" \
      -env-file .env -p 3306:3306 \
      mysql
  ```
* Start the app
  ```
  npm start
  ```
* Run the test file
  ```
  sh runtests.sh
  ```
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

