# Dynamic CV README
### *By GitPuleo*


*HELLO AND WELCOME FOR COMING.*
Dynamic CV is designed to guide users step-by-step through the process of creating a CV, helping bypass not only the paralysis-inducing blank page of a Word document but also the hurdles of the hidden curriculum of "professionalism" that serve mainly to filter for class background. The application handles formatting, ordering, and assembling the resume. Conditional rendering allows the user to shift the burden of deciding relevance to the party that is actually in posession of that knowledge--the hiring team. Instead of producing endless iterations of a resume for each opportunity, a single link and conditional rendering shift the balance of responsibilities back in the applicant's favor and by-passing predatory bespoke application systems that farm user's data.
Dyanmic CV aims to simplify, demystify, and rebalance the job search process. I hope that you enjoy using it.


#### Tech Stack
| Stack     | Framework |   Language |
|:----------|:---------:|-----------:|
| Front-End | React.js  | JavaScript |
| Back-end  | Spring Boot  |       Java |
| Database  |   MySQL   |        SQL |


### Ideation & Planning
|   Diagram | Link                                                                                                                                          |
|----------:|:----------------------------------------------------------------------------------------------------------------------------------------------|
|       ERD | [Entity Relational Diagram](https://www.figma.com/board/LXMEdFoLG5JWz1O18Mjv58/Untitled?node-id=0-1&t=gdDGU5ZGSAfSKk9C-1)                     |
| WireFrame | [Wireframe on Figma](https://www.figma.com/design/tivdyx28edHteJ8v6Uj3rA/Wireframing-for-Dynamic-CV?node-id=1088171-265&t=1XPh2fDR3kqFAxAd-1) |
|    GitHub | [Dynamic CV Repository](https://github.com/gitpuleo/unit2-final-springbootproject-Nick-P)                                                     |



### Unresolved Issues:
--Full auth implementation
--Refactoring for DRYness
--Usability/readability improvements.

### Future Features:
--Print to PDF functionality
--Gemini LLM API call for grammar and spell check
--useParams allowing for shareable link to include conditional rendering in effect at time of copying to clipboard


### To run this program locally on your machine:
-Ensure you have downloaded: the `Java 21` SDK, `Maven`, `Node.js` & `NPM`, `MySQL`.

-In your terminal:
```terminal
git clone https://github.com/gitpuleo/unit2-final-springbootproject-Nick-P
```
-Then in MySQL Workbench, run the sql script included in the repository

Next, open the project and change the `application.properties` to:
```application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/dynamic_cv
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```
-Run Maven to build the backend, then move into the front-end directory

```terminal
npm install

npm run dev
```

### Dependencies:
`JPA + Hibernate`
`Spring Boot Starter Web`
`Spring Boot Dev Tools`
`Spring Boot Starter Validation`
`MySL JDBC Driver - Connector J`
`Spring Boot Starter Test`
`Spring Boot Maven Plugin`
`Fontawesome Free`
`React`
`Vite`