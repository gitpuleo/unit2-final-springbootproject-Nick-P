import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";




const API_BASE = import.meta.env.VITE_API_URL;   //current reading api from .env file
const USER_ID = import.meta.env.VITE_USER_ID;   //setting the user id until log-in and auth are added


export default function ResumeDisplay() {


  //Temporary selector before it becomes a separate component
  const ALL_SECTIONS = ["work","skills","projects","education","languages","awards","licenses"];
  const [visible, setVisible] = useState(new Set(["work","skills","projects","education","languages","awards","licenses"]));

  function toggle(sectionKey) {
    setVisible(prev => {
      const next = new Set(prev);
      next.has(sectionKey) ? next.delete(sectionKey) : next.add(sectionKey);
      return next;
    });
  }
    
  const { id: routeId } = useParams();    //now the id is not hardcoded
  const resumeId = routeId?.trim();       //for handling spacing that might disrupt reading

  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
    
  const [user, setUser] = useState(null);
  const [userErr, setUserErr] = useState("");
  const [userLoading, setUserLoading] = useState(true);

  //for copying link to users clipboard
function handleCopyLink() {
  const currentUrl = window.location.href;
  navigator.clipboard
    .writeText(currentUrl)
    .then(() => alert("Link copied to clipboard"))
    .catch(() => alert("FAIL"));
}

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

        const response = await fetch(`${API_BASE}/resumes/${resumeId}`, {signal: controller.signal,});
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
  }, [resumeId]);

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

  <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", margin: "1rem 0" }}>
    {ALL_SECTIONS.map(key => (
      <label key={key} style={{ display: "inline-flex", alignItems: "center", gap: ".35rem" }}>
        <input
          type="checkbox"
          checked={visible.has(key)}
          onChange={() => toggle(key)}
        />
        {key[0].toUpperCase() + key.slice(1)}
      </label>
    ))}
    <div style={{ marginTop: "1rem" }}>
  <button onClick={handleCopyLink}>Copy Shareable Link</button>
</div>

  </div>

{visible.has("work") && (
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
)}

{visible.has("education") && (
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
)}

    {visible.has("skills") && (
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
  )}

  {visible.has("projects") && (
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
  )}

 {visible.has("licenses") && (
      <section>
        <h2>Licenses & Certifications</h2>
        <ul>
          {resume.licenses.map((license) => (
            <li key={license.id}>{license.name} – {license.institution}</li>
          ))}
        </ul>
      </section>
 )}
 {visible.has("languages") && (
      <section>
        <h2>Languages</h2>
        <ul>
          {resume.languages.map((language) => (
            <li key={language.id}>{language.name} – {language.level}</li>
          ))}
        </ul>
      </section>
    )}

{visible.has("awards") && (
      <section>
        <h2>Awards & Honors</h2>
        <ul>
          {resume.awards.map((award) => (
            <li key={award.id}>{award.name} – {award.issuer}</li>
          ))}
        </ul>
      </section>
)}
     
    </div>
  );
}
