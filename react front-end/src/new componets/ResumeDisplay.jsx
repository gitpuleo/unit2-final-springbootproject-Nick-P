import { useEffect, useState, useMemo } from "react";


const API_BASE = import.meta.env.VITE_API_URL; //current reading api from .env file



export default function ResumeViewer() {
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState(true);

    //const USER_ID = 1; make userid 1 for demoing

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


      <section>

        <header>
            <h1>{}</h1>
        </header>

        <h2>Work Experience</h2>
        <ul>
          {resume.works.map((w) => (
            <li key={w.id}>
              <strong>{w.jobTitle}</strong>, {w.company} ({w.startDate}–{w.endDate})
            </li>
          ))}
        </ul>
      </section>

 <section>
        <h2>Education</h2>
        <ul>
          {resume.educations.map((e) => (
            <li key={e.id}>
              {e.degree} in {e.major}, {e.schoolName} ({e.startDate}–{e.endDate})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        <ul>
          {resume.skills.map((s) => (
            <li key={s.id}>
              {s.skillName} – {s.level}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Projects</h2>
        <ul>
          {resume.projects.map((p) => (
            <li key={p.id}>
              <a href={p.link} target="_blank" rel="noreferrer">{p.name}</a>: {p.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Licenses & Certifications</h2>
        <ul>
          {resume.licenses.map((l) => (
            <li key={l.id}>{l.name} – {l.institution}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Languages</h2>
        <ul>
          {resume.languages.map((l) => (
            <li key={l.id}>{l.name} – {l.level}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Awards & Honors</h2>
        <ul>
          {resume.awards.map((a) => (
            <li key={a.id}>{a.name} – {a.issuer}</li>
          ))}
        </ul>
      </section>

     

    </div>
  );
}
