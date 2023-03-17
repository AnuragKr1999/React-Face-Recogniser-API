# React-Face-Recogniser-API
This is the backend code for the React Face Recogniser App. It uses mysql database for storing users information.

Database used = mysql

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

desc login;
+-------+-----------------+------+-----+---------+----------------+
| Field | Type            | Null | Key | Default | Extra          |
+-------+-----------------+------+-----+---------+----------------+
| id    | bigint unsigned | NO   | PRI | NULL    | auto_increment |
| hash  | varchar(100)    | NO   |     | NULL    |                |
| email | varchar(100)    | NO   | UNI | NULL    |                |
+-------+-----------------+------+-----+---------+----------------+

-> provide your database connectivity credentials in the server.js file(inside the knex function)
