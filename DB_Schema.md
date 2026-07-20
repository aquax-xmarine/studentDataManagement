CREATE TABLE students (

&#x20;   id SERIAL PRIMARY KEY,

&#x20;   roll\_no INT NOT NULL,

&#x20;   name VARCHAR(100) NOT NULL,

&#x20;   subject VARCHAR(100) NOT NULL,

&#x20;   section VARCHAR(10) NOT NULL,

&#x20;   grade INT,

);





ALTER TABLE students

ADD CONSTRAINT unique\_student

UNIQUE (section, subject, roll\_no);



\----------------------------------------



CREATE TABLE users (

&#x20;   id SERIAL PRIMARY KEY,

&#x20;   name VARCHAR(100),

&#x20;   email VARCHAR(100) UNIQUE NOT NULL,

&#x20;   password VARCHAR(255) NOT NULL

);



INSERT INTO users (name, email, password)

VALUES

('Admin', 'admin@test.com', '123456');



\-----------------------------------------



CREATE TABLE teacher\_schedule (

&#x20;   id SERIAL PRIMARY KEY,

&#x20;   day VARCHAR(15) NOT NULL,

&#x20;   section VARCHAR(10) NOT NULL,

&#x20;   room VARCHAR(10),

&#x20;   time\_slot VARCHAR(20) NOT NULL,

&#x20;   subject VARCHAR(50) NOT NULL,

&#x20;   grade INT

);





ALTER TABLE teacher\_schedule

ADD CONSTRAINT unique\_teacher\_schedule

UNIQUE (day, section, time\_slot, subject);



\-----------------------------------------



CREATE TABLE assignments (

&#x20;   id SERIAL PRIMARY KEY,

&#x20;   exercise VARCHAR(100) NOT NULL,

&#x20;   subject VARCHAR(100) NOT NULL,

&#x20;   section VARCHAR(10) NOT NULL,

&#x20;   created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP

);



\-----------------------------------------





CREATE TABLE assignment\_results (

&#x20;   id SERIAL PRIMARY KEY,



&#x20;   assignment\_id INT NOT NULL,

&#x20;   student\_id INT NOT NULL,



&#x20;   marks INT CHECK (marks BETWEEN 1 AND 5),

&#x20;   remarks TEXT,



&#x20;   FOREIGN KEY (assignment\_id)

&#x20;       REFERENCES assignments(id)

&#x20;       ON DELETE CASCADE,



&#x20;   FOREIGN KEY (student\_id)

&#x20;       REFERENCES students(id)

&#x20;       ON DELETE CASCADE,



&#x20;   UNIQUE (assignment\_id, student\_id)

);









\-----------------------------------------







CREATE TABLE class\_remarks (

&#x20;   id SERIAL PRIMARY KEY,



&#x20;   schedule\_id INTEGER NOT NULL

&#x20;       REFERENCES teacher\_schedule(id),



&#x20;   class\_date DATE NOT NULL,



&#x20;   topics\_covered TEXT NOT NULL,



&#x20;   created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,



&#x20;   UNIQUE(schedule\_id, class\_date)

);







\-----------------------------------------



CREATE TABLE student\_remarks (

&#x20;   id SERIAL PRIMARY KEY,



&#x20;   schedule\_id INTEGER NOT NULL

&#x20;       REFERENCES teacher\_schedule(id),



&#x20;   class\_date DATE NOT NULL,



&#x20;   student\_id INTEGER NOT NULL

&#x20;       REFERENCES students(id),



&#x20;   remarks TEXT,



&#x20;   distracted BOOLEAN DEFAULT FALSE,

&#x20;   participating BOOLEAN DEFAULT FALSE,

&#x20;   great\_effort BOOLEAN DEFAULT FALSE,

&#x20;   class\_disturbance BOOLEAN DEFAULT FALSE,

&#x20;   late\_arrival BOOLEAN DEFAULT FALSE,



&#x20;   created\_at TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,



&#x20;   UNIQUE(schedule\_id, class\_date, student\_id)

);







\-----------------------------------------









NOTES

1\. Edit and delete buttons in list of assignments

2\. Creating new assignment says localhost

~~3. The assignment remarks UI improve like class remarks UI~~

~~4. Thoughts on disabling the 'add details' function when the class isn't scheduled for that day~~

5\. What if the teacher wants to log previous and future class's data?

~~6. tick marks for selected icons~~

~~7. ui problem add details-class~~

~~8. save button is unstable~~

~~9. Change today back to original and delete the added rows~~

&#x20;







net stop postgresql-x64-18













