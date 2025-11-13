-- wipe DB and reset keys on each run

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE license_certification;
TRUNCATE TABLE work;
TRUNCATE TABLE project;
TRUNCATE TABLE language;
TRUNCATE TABLE education;
TRUNCATE TABLE award;
TRUNCATE TABLE skill;
TRUNCATE TABLE resume;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE resume AUTO_INCREMENT = 1;
ALTER TABLE skill AUTO_INCREMENT = 1;
ALTER TABLE award AUTO_INCREMENT = 1;
ALTER TABLE education AUTO_INCREMENT = 1;
ALTER TABLE language AUTO_INCREMENT = 1;
ALTER TABLE project AUTO_INCREMENT = 1;
ALTER TABLE work AUTO_INCREMENT = 1;
ALTER TABLE license_certification AUTO_INCREMENT = 1;


--seed database with dummy resume for testing

INSERT INTO users (id, first_name, last_name, email, phone, website, linkedin, headline)
VALUES (1, 'Dummy', 'User', 'lclbakelite@example.com', 555-555-5555, 'personal.blog', 'linkedin.com', 'Full-Stack Software Developer');


INSERT INTO resume (id, user_id) VALUES (1, 1);


INSERT INTO skill (id, level, notes, skill_name, resume_id) VALUES
(1, 'ADVANCED', 'LaunchCode', 'Java', 1),
(2, 'ADVANCED', 'LaunchCode', 'React', 1),
(3, 'INTERMEDIATE', 'LaunchCode', 'SQL', 1);


INSERT INTO award (id, name, issuer, issue_date, description, resume_id) VALUES
(1, 'Dean''s List', 'University of Somewhere', '2022-05-15', 'Academic excellence', 1);


INSERT INTO education (id, school_name, degree, major, minor, start_date, end_date, gpa, location_city, location_state, location_country, resume_id) VALUES
(1, 'University of Somewhere', 'B.A.', 'Computer Science', 'Mathematics', '2018-08-20', '2022-05-15', 3.85, 'St. Louis', 'MO', 'USA', 1);


INSERT INTO language (id, name, level, resume_id) VALUES
(1, 'Spanish', 'ADVANCED', 1),
(2, 'English', 'NATIVE', 1);


INSERT INTO project (id, name, description, link, resume_id) VALUES
(1, 'Dynamic CV Builder', 'React + Spring Boot CV app', 'https://example.com/demo', 1);


INSERT INTO work (id, company, job_title, location_city, location_state, location_country, type, start_date, end_date, is_current, summary, resume_id) VALUES
(1, 'LaunchCode', 'Java Dev', 'St. Louis', 'MO', 'USA', 'PROFESSIONAL', '2023-06-01', '2024-08-31', false, 'Spring Boot APIs and React UI', 1);


INSERT INTO license_certification (id, name, institution, description, resume_id) VALUES
(1, 'AWS Cloud Practitioner', 'AWS', 'Foundational certification', 1);



--Second resume to test switcher

INSERT INTO resume (id, user_id) VALUES (2, 1);


INSERT INTO work (id, resume_id, company, job_title, location_city, location_state, location_country, type, start_date, end_date, is_current, summary)
VALUES
  (2, 2, 'Civic Lab', 'Research Fellow', 'St. Louis', 'MO', 'USA', 'SERVICE', '2021-01-01', '2021-12-31', false, 'Community data mapping'),
  (3, 2, 'OpenSource Co.', 'Frontend Intern', 'Remote', NULL, 'USA', 'INTERNSHIP', '2020-06-01', '2020-08-31', false, 'React component library');


INSERT INTO skill (id, resume_id, skill_name, level, notes)
VALUES
  (4, 2, 'TypeScript', 'INTERMEDIATE', 'Personal projects'),
  (5, 2, 'React', 'ADVANCED', 'Hooks, Router');


INSERT INTO education (id, resume_id, school_name, location_state, location_city, location_country, degree, major, minor, start_date, end_date, gpa)
VALUES
  (2, 2, 'Local University', 'MO', 'St. Louis', 'USA', 'M.A.', 'Public Policy', NULL, '2019-08-20', '2021-05-15', 3.70);


INSERT INTO project (id, resume_id, name, description, link)
VALUES
  (2, 2, 'Civic Dashboard', 'Leaflet + Spring Boot public data dashboard', 'https://example.com/civic');


INSERT INTO language (id, resume_id, name, level)
VALUES
  (3, 2, 'Spanish', 'ADVANCED');


INSERT INTO award (id, resume_id, name, issuer, issue_date, description)
VALUES
  (2, 2, 'Community Impact Grant', 'Civic Fund', '2021-10-01', 'Recognized for data outreach');

INSERT INTO license_certification (id, resume_id, name, institution, description)
VALUES
  (2, 2, 'Scrum Fundamentals', 'ScrumStudy', 'Intro to agile scrum');
