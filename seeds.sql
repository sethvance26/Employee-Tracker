USE employee_trackerdb;

INSERT INTO department (dept_name)
VALUES ("Sales"), ("Marketing"), ("Engineering"), ("Customer Service");

INSERT INTO Emp_role (title, salary, dept_id)
VALUES 
("Manager", 105000, 1), 
("Sr. Developer", 100000, 3), 
("Jr Developer", 5000, 3), 
("Advisor", 4750, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Johnny", "Bravo", 2, 3),
("Seth", "Vance", 3 , 2),
("Elon", "Musk", 4 , 1),
("Dylan", "Atkinson", 5 , 1),
