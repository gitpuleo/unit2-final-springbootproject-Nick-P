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
VALUES
(1, 'Dummy', 'User', 'lclbakelite@example.com', '555-555-5555', 'personal.blog', 'linkedin.com/example', 'Full-Stack Software Developer');



INSERT INTO resume (id, user_id) VALUES
(1, 1),
(2, 1);



INSERT INTO skill (id, level, notes, skill_name, resume_id) VALUES
-- Resume 1
(1, 'ADVANCED', 'LaunchCode', 'Java', 1),
(2, 'ADVANCED', 'LaunchCode', 'React', 1),
(3, 'INTERMEDIATE', 'LaunchCode', 'SQL', 1),
(4, 'ADVANCED', 'Semantic HTML, Flexbox, Grid', 'HTML & CSS', 1),
(5, 'ADVANCED', 'REST APIs, validation, error handling', 'Spring Boot', 1),
(6, 'INTERMEDIATE', 'Schema design, joins', 'Relational Database Design', 1),
(7, 'INTERMEDIATE', 'Local container environments', 'Docker', 1),

-- Resume 2
(8,  'INTERMEDIATE', 'Personal projects', 'TypeScript', 2),
(9,  'ADVANCED', 'Hooks & routing', 'React', 2),
(10, 'INTERMEDIATE', 'Express APIs, JSON handling', 'Node.js', 2),
(11, 'INTERMEDIATE', 'Leaflet, charts, visualizations', 'Data Visualization', 2),
(12, 'ADVANCED', 'Communication & presentation', 'Communication', 2);



INSERT INTO award (id, name, issuer, issue_date, description, resume_id) VALUES
-- Resume 1
(1, 'Dean''s List', 'University of Somewhere', '2022-05-15', 'Academic excellence', 1),
(2, 'Coding Bootcamp Graduate with Distinction', 'LaunchCode', '2023-09-15',
    'Completed full-time full-stack program with top capstone performance.', 1),

-- Resume 2
(3, 'Community Impact Grant', 'Civic Fund', '2021-10-01', 'Recognized for data outreach', 2),
(4, 'Data for Good Hackathon Winner', 'Civic Tech Collective', '2020-11-02',
    'Built a dashboard for local nonprofit in 24 hours.', 2);



INSERT INTO education (
    id, school_name, degree, major, minor,
    start_date, end_date, gpa,
    location_city, location_state, location_country, resume_id
) VALUES
-- Resume 1
(1, 'University of Somewhere', 'B.A.', 'Computer Science', 'Mathematics',
 '2018-08-20', '2022-05-15', 3.85,
 'St. Louis', 'MO', 'USA', 1),
(2, 'LaunchCode', 'Certificate', 'Full-Stack Web Development', NULL,
 '2023-01-15', '2023-09-15', 4.00,
 'St. Louis', 'MO', 'USA', 1),

-- Resume 2
(3, 'Local University', 'M.A.', 'Public Policy', NULL,
 '2019-08-20', '2021-05-15', 3.70,
 'St. Louis', 'MO', 'USA', 2),
(4, 'University of Elsewhere', 'B.A.', 'Sociology', NULL,
 '2014-08-20', '2018-05-15', 3.60,
 'Springfield', 'IL', 'USA', 2);



INSERT INTO language (id, name, level, resume_id) VALUES
-- Resume 1
(1, 'Spanish', 'ADVANCED', 1),
(2, 'English', 'NATIVE', 1),
(3, 'Portuguese', 'INTERMEDIATE', 1),

-- Resume 2
(4, 'Spanish', 'ADVANCED', 2),
(5, 'French', 'INTERMEDIATE', 2);



INSERT INTO project (id, name, description, link, resume_id) VALUES
-- Resume 1
(1, 'Dynamic CV Builder', 'React + Spring Boot CV app', 'https://example.com/demo', 1),
(2, 'Task Tracker API',
   'Spring Boot REST API with JWT auth for task & deadline management.', 'https://example.com/tasks', 1),
(3, 'Personal Portfolio Site',
   'Responsive React SPA with blog, projects, and contact form.', 'https://example.com/portfolio', 1),

-- Resume 2
(4, 'Civic Dashboard', 'Leaflet + Spring Boot public data dashboard', 'https://example.com/civic', 2),
(5, 'Neighborhood Resource Map',
   'React + Leaflet map visualizing public resources & transit access.', 'https://example.com/map', 2),
(6, 'Open Budget Explorer',
   'Charts and tables to explore city budget data.', 'https://example.com/budget', 2);



INSERT INTO work (
    id, company, job_title, location_city, location_state, location_country,
    type, start_date, end_date, is_current, summary, resume_id
) VALUES
-- Resume 1
(1, 'LaunchCode', 'Java Dev', 'St. Louis', 'MO', 'USA',
 'PROFESSIONAL', '2023-06-01', '2024-08-31', FALSE,
 'Spring Boot APIs and React UI development.', 1),
(2, 'Freelance Developer', 'Full-Stack Developer', 'Remote', 'MO', 'USA',
 'PROFESSIONAL', '2024-09-01', NULL, TRUE,
 'Builds responsive websites and dashboards using React, Spring Boot, MySQL.', 1),
(3, 'University of Somewhere', 'Teaching Assistant', 'St. Louis', 'MO', 'USA',
 'SERVICE', '2020-08-20', '2022-05-15', FALSE,
 'Led Java labs, graded assignments, and held office hours.', 1),

-- Resume 2
(4, 'Civic Lab', 'Research Fellow', 'St. Louis', 'MO', 'USA',
 'SERVICE', '2021-01-01', '2021-12-31', FALSE,
 'Community data mapping and GIS research.', 2),
(5, 'OpenSource Co.', 'Frontend Intern', 'Remote', NULL, 'USA',
 'INTERNSHIP', '2020-06-01', '2020-08-31', FALSE,
 'React component library development.', 2),
(6, 'City Data Office', 'Data Analyst (Contract)', 'St. Louis', 'MO', 'USA',
 'PROFESSIONAL', '2022-01-01', '2022-12-31', FALSE,
 'Cleaned, analyzed, and visualized civic data for policy use.', 2),
(7, 'Community Tech Hub', 'Volunteer Developer', 'St. Louis', 'MO', 'USA',
 'SERVICE', '2019-09-01', '2020-05-31', FALSE,
 'Built internal tools for program tracking.', 2);



INSERT INTO license_certification (id, name, institution, description, resume_id) VALUES
-- Resume 1
(1, 'AWS Cloud Practitioner', 'AWS', 'Foundational cloud certification', 1),
(2, 'Oracle Certified Professional: Java SE 17', 'Oracle',
   'Advanced certification for Java programming.', 1),

-- Resume 2
(3, 'Scrum Fundamentals', 'ScrumStudy', 'Intro to agile scrum', 2),
(4, 'CKAD', 'CNCF', 'Kubernetes application development certification', 2);