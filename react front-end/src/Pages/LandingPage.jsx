
import '../theme.css';


import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  function handleStart() {
    navigate("/resumes/new");
  }

  return (
    <div className="container">
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Dynamic CV Builder</h1>

        <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
          Create a customized, dynamic resume using our guided step-by-step form.
          Your work history and other sections are saved to the database and can
          be viewed instantly through the Resume Viewer.
        </p>

        <p style={{ marginTop: "1rem" }}>
          Click below to start a brand new resume.
        </p>

        <button
          type="button"
          onClick={handleStart}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Start New Resume
        </button>
      </section>

      <section className="card">
        <h2>How It Works</h2>
        <ul>
          <li><strong>Create:</strong> Start a resume and fill in each section.</li>
          <li><strong>Save:</strong> Work entries are stored in MySQL via Spring Boot.</li>
          <li><strong>View:</strong> Jump straight to the resume viewer to see your saved data.</li>
        </ul>
      </section>

      <section className="card">
        <h2>Already Have a Resume ID?</h2>
        <p>You can view any resume saved in the database by going to:</p>
        <code>/resumes/&lt;id&gt;</code>
      </section>
    </div>
  );
}


