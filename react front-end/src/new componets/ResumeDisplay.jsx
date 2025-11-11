import { useEffect, useState } from "react";



const API_BASE = import.meta.env.VITE_API_URL; //current reading api from .env file
 const USER_ID = 1; //make userid 1 for demoing


export default function ResumeDisplay() {
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
    
  const [user, setUser] = useState(null);
  const [userErr, setUserErr] = useState("");
  const [userLoading, setUserLoading] = useState(true);

//pulling headline details from users table
useEffect(() => {
  const controller = new AbortController();
  (async () => {
    try {
      setUserLoading(true);
      const response = await fetch(`${API_BASE}/users/${USER_ID}`, { signal: controller.signal });
      if (!response.ok) throw new Error(`User ${response.status}`);
      setUser(await response.json());
    } catch (error) {
      if (error.name !== "AbortError") setUserErr(error.message || "Failed to load user");
    } finally {
      setUserLoading(false);
    }
  })();
  return () => controller.abort();
}, []);

//for resume
  useEffect(() => {
    const controller = new AbortController();

    async function fetchResume() {
      try {
        setIsLoading(true);
        setErrorMsg("");

        const response = await fetch(`${API_BASE}/resumes/1`, {signal: controller.signal,});
        if (!response.ok) throw new Error(`Server responded ${response.status}`);
        
        const resumeData = await response.json();
        setResume(resumeData);
      
      } catch (error) {
        if (error.name === "AbortError") return; //this should help handle aborts by not throwing errors
        setErrorMsg(error.message || "Failed to fetch resume");
      } finally {
        setIsLoading(false);
      }
    }

    fetchResume();
    return () => controller.abort();
  }, []);

  // logic for rendering the resume
  if (isLoading) return <p>Loading resume…</p>;
  if (errorMsg) return <p>{errorMsg}</p>;
  if (!resume) return <p>Data not found.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>

    <header> 

  {userLoading && <p>Loading header…</p>}
  {userErr && <p>{userErr}</p>}
  {user && (
    <>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <h2>
        {user.email && <a href={`mailto:${user.email}`}>{user.email}</a>}
        {user.website && <> • <a href={user.website} target="_blank" rel="noreferrer">{user.website}</a></>}
        {user.linkedin && <> • <a href={user.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></>}
      </h2>
      {user.headline && <p style={{ opacity: .8 }}>{user.headline}</p>}
    </>
  )}

    </header>

    <section>
        <h2>Work Experience</h2>
        <ul>
          {resume.works.map((work) => (
            <li key={work.id}>
              <strong>{work.jobTitle}</strong>, {work.company} ({work.startDate}–{work.endDate})
            </li>
          ))}
        </ul>
      </section>

 <section>
        <h2>Education</h2>
        <ul>
          {resume.educations.map((education) => (
            <li key={education.id}>
              {education.degree} in {education.major}, {education.schoolName} ({education.startDate}–{education.endDate})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        <ul>
          {resume.skills.map((skill) => (
            <li key={skill.id}>
              {skill.skillName} – {skill.level}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Projects</h2>
        <ul>
          {resume.projects.map((project) => (
            <li key={project.id}>
              <a href={project.link} target="_blank" rel="noreferrer">{project.name}</a>: {project.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Licenses & Certifications</h2>
        <ul>
          {resume.licenses.map((license) => (
            <li key={license.id}>{license.name} – {license.institution}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Languages</h2>
        <ul>
          {resume.languages.map((language) => (
            <li key={language.id}>{language.name} – {language.level}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Awards & Honors</h2>
        <ul>
          {resume.awards.map((award) => (
            <li key={award.id}>{award.name} – {award.issuer}</li>
          ))}
        </ul>
      </section>

     
    </div>
  );
}
