import { useEffect, useState, useMemo } from "react";
import { education } from "../utils/nfpCVData";


const API_BASE = import.meta.env.VITE_API_URL; //current reading api from .env file
 const USER_ID = 1; //make userid 1 for demoing


export default function ResumeViewer() {
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState(true);

   

  useEffect(() => {
    const controller = new AbortController();

    async function fetchResume() {
      try {
        setIsLoading(true);
        setErrorMsg("");

        const response = await fetch(`${API_BASE}/resumes/1`, {signal: controller.signal,});
        const resumeData = await response.json();
        setResume(resumeData);

        if (!response.ok) throw new Error(`Server responded ${response.status}`);




        const userId = await response.json();
        setResume(data);
      } catch (err) {
        if (err.name === "AbortError") return; //this should help handle aborts by not throwing errors
        setErrorMsg(err.message || "Failed to fetch resume");
      } finally {
        setIsLoading(false);
      }
    }

    fetchResume();
    return () => controller.abort();
  }, []);

  // logic for rendering the resume
  if (isLoading) return <p>Loading resume…</p>;
  if (errorMsg) return <p style={{ color: "crimson" }}>{errorMsg}</p>;
  if (!resume) return <p>Data not found.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h1>Resume #{resume.id}</h1>



    <header>

  {userLoading && <p>Loading header…</p>}
  {userErr && <p>{userErr}</p>}
  {user && (
    <>
      <h1 style={{ margin: 0 }}>
        {user.firstName} {user.lastName}
      </h1>
      <p>
        {user.email && <a href={`mailto:${user.email}`}>{user.email}</a>}
        {user.website && <> • <a href={user.website} target="_blank" rel="noreferrer">{user.website}</a></>}
        {user.linkedin && <> • <a href={user.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></>}
      </p>
      {user.headline && <p style={{ opacity: .85 }}>{user.headline}</p>}
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
              {education.degree} in {education.major}, {eduaction.schoolName} ({eduaction.startDate}–{eduaction.endDate})
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
