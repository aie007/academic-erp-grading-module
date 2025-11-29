-- Insert Employees (Faculty)
INSERT INTO employee (name, email) VALUES
('Dr. Smith', 'emp.smith@university.edu'),
('Prof. Johnson', 'emp.johnson@university.edu'),
('Dr. Williams', 'emp.williams@university.edu'),
('Prof. Brown', 'emp.brown@university.edu'),
('Dr. Davis', 'emp.davis@university.edu');

-- Insert Courses
INSERT INTO course (course_code, course_name, course_credits, department, description, employee_id) VALUES
('CS101', 'Introduction to Computer Science', 4, 'Computer Science', 'Fundamentals of programming and computer science', 1),
('CS201', 'Data Structures', 4, 'Computer Science', 'Advanced data structures and algorithms', 1),
('MATH101', 'Calculus I', 4, 'Mathematics', 'Introduction to differential and integral calculus', 2),
('PHYS101', 'Physics I', 4, 'Physics', 'Classical mechanics and thermodynamics', 3),
('ENG101', 'English Composition', 3, 'English', 'Academic writing and composition', 4),
('CS301', 'Database Systems', 4, 'Computer Science', 'Introduction to database design and implementation', 5);

-- Insert Students
INSERT INTO student (name, email) VALUES
('John Doe', 'john.doe@student.edu'),
('Jane Smith', 'jane.smith@student.edu'),
('Robert Johnson', 'robert.j@student.edu'),
('Emily Davis', 'emily.d@student.edu'),
('Michael Wilson', 'michael.w@student.edu'),
('Sarah Brown', 'sarah.b@student.edu'),
('David Lee', 'david.l@student.edu'),
('Jennifer Taylor', 'jennifer.t@student.edu');

-- Insert Enrollments
-- CS101 Enrollments
INSERT INTO enrollment (student_student_id, course_course_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1);

-- CS201 Enrollments
INSERT INTO enrollment (student_student_id, course_course_id) VALUES
(1, 2),
(2, 2),
(5, 2),
(6, 2);

-- MATH101 Enrollments
INSERT INTO enrollment (student_student_id, course_course_id) VALUES
(3, 3),
(4, 3),
(7, 3),
(8, 3);

-- PHYS101 Enrollments
INSERT INTO enrollment (student_student_id, course_course_id) VALUES
(1, 4),
(3, 4),
(5, 4),
(7, 4);

-- ENG101 Enrollments
INSERT INTO enrollment (student_student_id, course_course_id) VALUES
(2, 5),
(4, 5),
(6, 5),
(8, 5);

-- CS301 Enrollments
INSERT INTO enrollment (student_student_id, course_course_id) VALUES
(1, 6),
(3, 6),
(5, 6),
(7, 6);
