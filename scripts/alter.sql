-- Add a constraint to ensure grade_points are between 0 and 4.0
ALTER TABLE grade
ADD CONSTRAINT chk_grade_points CHECK (grade_points >= 0 AND grade_points <= 4.0);

-- Add a constraint for valid letter grades
ALTER TABLE grade
ADD CONSTRAINT chk_letter_grade CHECK (letter_grade IN ('A', 'A-', 'B', 'C', 'D', 'F'));
