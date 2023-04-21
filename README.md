# React-Face-Recogniser-API
This is the backend code for the React Face Recogniser App. It uses mysql database for storing users information.
(If you are not able to view the below tables then just fork this repo and click on edit)

1. clone this repo
2. npm install
3. npm start
4. Provide your database connectivity credentials:
    -> Create a .env file in the root directory of the project
    -> Add the following lines of code in the .env file:
        DATABASE_PORT: your database port number
        DATABASE_USER: 'your database username'
        DATABASE_PASSWORD: 'your database password'
        DATABASE_NAME: 'facerecognizer'

Database used = mysql

Name of the mysql database: facerecognizer

There are two tables in database: users & login

 desc users;
+---------+-----------------+------+-----+---------+----------------+
| Field   | Type            | Null | Key | Default | Extra          |
+---------+-----------------+------+-----+---------+----------------+
| id      | bigint unsigned | NO   | PRI | NULL    | auto_increment |
| name    | varchar(100)    | YES  |     | NULL    |                |
| email   | varchar(100)    | NO   | UNI | NULL    |                |
| entries | bigint          | YES  |     | 0       |                |
| joined  | timestamp       | NO   |     | NULL    |                |
+---------+-----------------+------+-----+---------+----------------+

command: CREATE TABLE users (
  id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(100),
  email varchar(100) NOT NULL UNIQUE,
  entries bigint DEFAULT 0,
  joined timestamp NOT NULL
);



desc login;
+-------+-----------------+------+-----+---------+----------------+
| Field | Type            | Null | Key | Default | Extra          |
+-------+-----------------+------+-----+---------+----------------+
| id    | bigint unsigned | NO   | PRI | NULL    | auto_increment |
| hash  | varchar(100)    | NO   |     | NULL    |                |
| email | varchar(100)    | NO   | UNI | NULL    |                |
+-------+-----------------+------+-----+---------+----------------+

command: CREATE TABLE login (
  id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  hash varchar(100) NOT NULL,
  email varchar(100) NOT NULL UNIQUE
);

 
