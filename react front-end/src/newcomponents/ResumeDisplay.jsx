import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionSelector from "./newcomponents/SectionSelector";



const API_BASE = import.meta.env.VITE_API_URL;   //current reading api from .env file
const USER_ID = import.meta.env.VITE_USER_ID;   //setting the user id until log-in and auth are added


export default function ResumeDisplay() {
  
  const { id: routeId } = useParams();    //now the id is not hardcoded
  const resumeId = routeId?.trim();       //for handling spacing that might disrupt reading
  
  //state variables for switching in selector
  const [showWork, setShowWork] = useState(true);
  const [showEducation, setShowEducation] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [showLanguages, setShowLanguages] = useState(true);
  const [showAwards, setShowAwards] = useState(true);
  const [showLicenses, setShowLicenses] = useState(true);

  //Sub-sections of work category
  const [showWorkProfessional, setShowWorkProfessional] = useState(true);
  const [showWorkInternship, setShowWorkInternship] = useState(true);
  const [showWorkVolunteer, setShowWorkVolunteer] = useState(true);
  const [showWorkService, setShowWorkService] = useState(true);
  
  //For handling pulling user details for resume headline
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState("");
  const [userLoading, setUserLoading] = useState(true);

  //handling resume state
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

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
      if (error.name !== "AbortError") setUserError(error.message || "Failed to load user");
    } finally {
      setUserLoading(false);
    }
  })();
  return () => controller.abort();
}, []);

//fetching resume by id
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

  // error handling for loading and errors
  if (isLoading) return <p>Loading resume…</p>;
  if (errorMsg) return <p>{errorMsg}</p>;
  if (!resume) return <p>Data not found.</p>;



return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>

  <header> 
  {userLoading && <p>Loading header…</p>}
  {userError && <p>{userError}</p>}
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

  <SectionSelector
        showWork={showWork} setShowWork={setShowWork}
        showEducation={showEducation} setShowEducation={setShowEducation}
        showSkills={showSkills} setShowSkills={setShowSkills}
        showProjects={showProjects} setShowProjects={setShowProjects}
        showLanguages={showLanguages} setShowLanguages={setShowLanguages}
        showAwards={showAwards} setShowAwards={setShowAwards}
        showLicenses={showLicenses} setShowLicenses={setShowLicenses}
        showWorkProfessional={showWorkProfessional} setShowWorkProfessional={setShowWorkProfessional}
        showWorkInternship={showWorkInternship} setShowWorkInternship={setShowWorkInternship}
        showWorkVolunteer={showWorkVolunteer} setShowWorkVolunteer={setShowWorkVolunteer}
        showWorkServicer={showWorkService} setShowWorkService={setShowWorkService}
  />

  <button onClick={handleCopyLink} style={{ marginBottom: "1rem" }}>
        Copy Shareable Link
  </button>

      {showWork && (
        <section>

          <h2>Work Experience</h2>
          {resume.works && resume.works.filter(function(work){ return work.type === "PROFESSIONAL"; }).length > 0 && (
      <>
        <h3>Professional</h3>
        <ul>
          {resume.works.filter(function(work){ return work.type === "PROFESSIONAL"; }).map(function(work){
            return (
              <li key={work.id}>
                <strong>{work.jobTitle}</strong>, {work.company} ({work.startDate}–{work.endDate})
              </li>
            );
          })}
        </ul>
      </>
    )}

    {resume.works && resume.works.filter(function(work){ return work.type === "INTERNSHIP"; }).length > 0 && (
      <>
        <h3>Internships</h3>
        <ul>
          {resume.works.filter(function(work){ return work.type === "INTERNSHIP"; }).map(function(work){
            return (
              <li key={work.id}>
                <strong>{work.jobTitle}</strong>, {work.company} ({work.startDate}–{work.endDate})
              </li>
            );
          })}
        </ul>
      </>
    )}

  
    {resume.works && resume.works.filter(function(work){ return work.type === "VOLUNTEER"; }).length > 0 && (
      <>
        <h3>Volunteer</h3>
        <ul>
          {resume.works.filter(function(work){ return work.type === "VOLUNTEER"; }).map(function(work){
            return (
              <li key={work.id}>
                <strong>{work.jobTitle}</strong>, {work.company} ({work.startDate}–{work.endDate})
              </li>
            );
          })}
        </ul>
      </>
    )}

    {resume.works && resume.works.filter(function(work){ return work.type === "VOLUNTEER"; }).length > 0 && (
      <>
        <h3>Service</h3>
        <ul>
          {resume.works.filter(function(work){ return work.type === "SERVICE"; }).map(function(work){
            return (
              <li key={work.id}>
                <strong>{work.jobTitle}</strong>, {work.company} ({work.startDate}–{work.endDate})
              </li>
            );
          })}
        </ul>
      </>
    )}
  </section>
      )}

      {showEducation && (
        <section>
          <h2>Education</h2>
          <ul>
            {(resume.educations || []).map(education => (
              <li key={education.id}>
                {education.degree} in {education.major}, {education.schoolName} ({education.startDate}–{education.endDate})
              </li>
            ))}
          </ul>
        </section>
      )}

      {showSkills && (
        <section>
          <h2>Skills</h2>
          <ul>
            {(resume.skills || []).map(skill => (
              <li key={skill.id}>{skill.skillName} – {skill.level}</li>
            ))}
          </ul>
        </section>
      )}

      {showProjects && (
        <section>
          <h2>Projects</h2>
          <ul>
            {(resume.projects || []).map(project => (
              <li key={project.id}>
                <a href={project.link} target="_blank" rel="noreferrer">{project.name}</a>: {project.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      {showLanguages && (
        <section>
          <h2>Languages</h2>
          <ul>
            {(resume.languages || []).map(language => (
              <li key={language.id}>{language.name} – {language.level}</li>
            ))}
          </ul>
        </section>
      )}

      {showAwards && (
        <section>
          <h2>Awards & Honors</h2>
          <ul>
            {(resume.awards || []).map(award => (
              <li key={award.id}>{award.name} – {award.issuer}</li>
            ))}
          </ul>
        </section>
      )}

      {showLicenses && (
        <section>
          <h2>Licenses & Certifications</h2>
          <ul>
            {(resume.licenses || []).map(license => (
              <li key={license.id}>{license.name} – {license.institution}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}