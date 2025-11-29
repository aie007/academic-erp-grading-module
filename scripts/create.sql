-- Create the employee table
CREATE TABLE employee (
    employee_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Create the student table
CREATE TABLE student (
    student_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Create the course table
CREATE TABLE course (
    course_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(50) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    course_credits INT,
    department VARCHAR(100),
    description TEXT,
    employee_id BIGINT,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);

-- Create the enrollment table
CREATE TABLE enrollment (
    enrollment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    UNIQUE KEY unique_enrollment (student_id, course_id)
);

-- Create the grade table
CREATE TABLE grade (
    grade_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    letter_grade VARCHAR(5),
    grade_points DOUBLE,
    comments TEXT,
    enrollment_id BIGINT NOT NULL,
    FOREIGN KEY (enrollment_id) REFERENCES enrollment(enrollment_id)
);
