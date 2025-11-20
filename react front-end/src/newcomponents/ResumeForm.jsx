import { useState, useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL;
const USER_ID = import.meta.env.VITE_USER_ID;

//Component for inputting(post) a new resume through forms, including editing(put) and delete functionality
export default function ResumeForm() {


const [active, setActive] = useState("work");

//state for validation warning
const [workError, setWorkError] = useState("");

//state for creating new resume entry and holding its id value
const [resumeId, setResumeId] = useState(null);

//hook for navigating to completed resume
const navigateButton = useNavigate();

//auto-scroll references
const workRef = useRef(null);
const educationRef = useRef(null);
const skillsRef = useRef(null);
const projectsRef = useRef(null);
const languagesRef = useRef(null);
const awardsRef = useRef(null);
const licensesRef = useRef(null);


//logic to instantiate new entry in resume table
useEffect(() => {
  async function createResume() {
    const response = await fetch(API_BASE + "/resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { id: USER_ID } })
    });

    if (!response.ok) {
      alert("Process failed");
      return;
    }

    const data = await response.json();
    setResumeId(data.id);
  }

  createResume();
}, []);




  //methods for auto-advancing accordians open and closed
let nextMap = { work: "education", education: "skills", skills: "projects", projects: "languages", languages: "awards", awards: "licenses" }; //auto-advancing sequence


  function toggle(key) {
    setActive(key);
    scrollToSection(key);
  }

  function advance(fromKey) {
    let next = nextMap[fromKey];
    if (next) { setActive(next);
    scrollToSection(next);
    }
  }

  //auto-scroll function
  function scrollToSection(key) {
  let ref = null;

  if (key === "work") ref = workRef;
  else if (key === "education") ref = educationRef;
  else if (key === "skills") ref = skillsRef;
  else if (key === "projects") ref = projectsRef;
  else if (key === "languages") ref = languagesRef;
  else if (key === "awards") ref = awardsRef;
  else if (key === "licenses") ref = licensesRef;

  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

  //state variables for handling adding entries
  const [workEntries, setWorkEntries] = useState([
    {
      id: null,
      company: "",
      jobTitle: "",
      locationCity: "",
      locationState: "",
      locationCountry: "",
      type: "PROFESSIONAL",
      startDate: "",
      endDate: "",
      isCurrent: false,
      summary: ""
    }
  ]);

  //state for education section of form
  const [educationForm, setEducationForm] = useState({
  schoolName: "",
  degree: "",
  major: "",
  minor: "",
  locationCity: "",
  locationState: "",
  locationCountry: "",
  startDate: "",
  endDate: "",
  gpa: ""
});

//skills states
const [skillForm, setSkillForm] = useState({
  skillName: "",
  level: "",     
  notes: ""  
});

//project states
const [projectForm, setProjectForm] = useState({
  name: "",
  description: "",
  link: ""
});

//language states
const [languageForm, setLanguageForm] = useState({
  name: "",
  level: "", // must match your enum values!
});

//award states
const [awardForm, setAwardForm] = useState({
  name: "",
  issuer: "",
  issueDate: "",
  description: ""
});

//licesnes states
const [licenseForm, setLicenseForm] = useState({
  name: "",
  institution: "",
  description: ""
});



  //functions for adding/removing entries in form
  function addWorkRow() {
    setWorkEntries(function (prev) { 
      const next = prev.slice();
      next.push({
        id: null,
        company: "",
        jobTitle: "",
        locationCity: "",
        locationState: "",
        locationCountry: "",
        type: "PROFESSIONAL",
        startDate: "",
        endDate: "",
        isCurrent: false,
        summary: ""
      });
      return next;
    });
  }

  
  function updateWorkField(index, field, value) {
    setWorkEntries(function (prev) {
      const next = prev.slice();
    
      const item = Object.assign({}, next[index]);
      item[field] = value;
      next[index] = item;
      return next;
    });
  }

  
  function removeWorkRow(index) {
    setWorkEntries(function (prev) {
      const next = [];
      for (let i = 0; i < prev.length; i++) {
        if (i !== index) next.push(prev[i]);
      }
      return next;
    });
  }

//DELETE  + calls to backend if item.id exists
async function handleDeleteWork(index) {
  const item = workEntries[index];

  if (!item.id) {
    removeWorkRow(index);
    return;
  }

  const response = await fetch(API_BASE + "/works/" + item.id, { method: "DELETE" });
  if (!response.ok) {
    alert("Operation Failed");
    return;
  }

  removeWorkRow(index);
}

//logic for linking to resume completed from entry form
function handleViewResume() {
  if (!resumeId) {
    alert("No resume to display yet. Please start the form first.");
    return;
  }

  navigateButton(`/resumes/${resumeId}`);
}


//PUT and POST for work section
async function saveWorkSection() {

  const rowsToSave = workEntries.filter((item) => {
    const hasText =
      (item.company && item.company.trim() !== "") ||
      (item.jobTitle && item.jobTitle.trim() !== "") ||
      (item.locationCity && item.locationCity.trim() !== "") ||
      (item.locationState && item.locationState.trim() !== "") ||
      (item.locationCountry && item.locationCountry.trim() !== "") ||
      (item.summary && item.summary.trim() !== "");

    const hasDates = !!item.startDate || !!item.endDate;

    return hasText || hasDates;
  });
  //warning for date validation
  setWorkError("");

  for (let i = 0; i < rowsToSave.length; i++) {
    const item = rowsToSave[i];

    if (!item.isCurrent && !item.endDate) {
      setWorkError(
        `For Job #${i + 1}, please either provide an end date or mark 'I currently work here'.`
      );
      return;
    }
  }

  try {
    for (let i = 0; i < rowsToSave.length; i++) {
      const item = rowsToSave[i];

      const payload = {
        company: item.company,
        jobTitle: item.jobTitle,
        locationCity: item.locationCity,
        locationState: item.locationState,
        locationCountry: item.locationCountry,
        type: item.type,
        startDate: item.startDate,
        endDate: item.isCurrent ? null : item.endDate,
        isCurrent: item.isCurrent,
        summary: item.summary,
      };

      // If id already exists, use PUT to update
      if (item.id) {
        const response = await fetch(`${API_BASE}/works/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          alert(
            `Failed to update work entry #${i + 1} (status ${response.status}).`
          );
          return;
        }
      }

      // If id not found, use POST to create
      else {
        const response = await fetch(
          `${API_BASE}/resumes/${resumeId}/works`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          alert(
            `Failed to create work entry #${i + 1} (status ${response.status}).`
          );
          return;
        }
      }
    }

    alert("Work history saved!");
    advance("work");

  } catch (err) {
    alert("A network error occurred while saving work history.");
  }
}

//education save logic
const saveEducationSection = async () => {
  if (!educationForm.schoolName.trim()) {
    return;
  }

  // convert gpa to a number or null
  const gpaValue = educationForm.gpa.trim();
  const gpaNumeric = gpaValue === "" ? null : Number(gpaValue);

  const payload = {
    ...educationForm,
    gpa: gpaNumeric,
    resume: { id: Number(resumeId) },
  };

  try {
    const response = await fetch(`${API_BASE}/educations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to save education", await response.text());
      return;
    }

    const saved = await response.json();

    setEducationForm({
      schoolName: "",
      degree: "",
      major: "",
      minor: "",
      locationCity: "",
      locationState: "",
      locationCountry: "",
      startDate: "",
      endDate: "",
      gpa: "",
    });
  } catch (err) {
    console.error("Network error saving education", err);
  }
};


//skills save logic
const saveSkillSection = async () => {
  if (!skillForm.skillName.trim()) {
    return;
  }

  const payload = {
    ...skillForm,
    resume: { id: Number(resumeId) }, 
  };

  try {
    const response = await fetch(`${API_BASE}/skills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to save skill", await response.text());
      return;
    }

    const saved = await response.json();
    

    setSkillForm({
      skillName: "",
      level: "",
      notes: "",
    });
  } catch (err) {
    console.error("Network error saving skill", err);
  }
};

//project save logic
const saveProjectSection = async () => {
  if (!projectForm.name.trim()) {
    return;
  }

  const payload = {
    ...projectForm,
    resume: { id: Number(resumeId) },
  };

  try {
    const response = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to save project", await response.text());
      return;
    }

    const saved = await response.json();

    setProjectForm({
      name: "",
      description: "",
      link: "",
    });
  } catch (err) {
    console.error("Network error saving project", err);
  }
};

//languages save logic
const saveLanguageSection = async () => {
  if (!languageForm.name.trim()) {
    return;
  }

  const payload = {
    ...languageForm,
    resume: { id: Number(resumeId) },
  };

  try {
    const response = await fetch(`${API_BASE}/languages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to save language", await response.text());
      return;
    }

    const saved = await response.json();

    setLanguageForm({
      name: "",
      level: "",
    });
  } catch (err) {
    console.error("Network error saving language", err);
  }
};

//awards save logic
const saveAwardSection = async () => {
  if (!awardForm.name.trim()) {
    return;
  }

  const payload = {
    ...awardForm,
    resume: { id: Number(resumeId) },
  };

  try {
    const response = await fetch(`${API_BASE}/awards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to save award", await response.text());
      return;
    }

    const saved = await response.json();

    setAwardForm({
      name: "",
      issuer: "",
      issueDate: "",
      description: "",
    });
  } catch (err) {
    console.error("Network error saving award", err);
  }
};

//licenses save logic
const saveLicenseSection = async () => {
  if (!licenseForm.name.trim()) {
    return;
  }

  const payload = {
    ...licenseForm,
    resume: { id: Number(resumeId) },
  };

  try {
    const response = await fetch(`${API_BASE}/licenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to save license/certification", await response.text());
      return;
    }

    const saved = await response.json();

    setLicenseForm({
      name: "",
      institution: "",
      description: "",
    });
  } catch (err) {
    console.error("Network error saving license/certification", err);
  }
};


//JSX

        return (

        <div className="container">
        <section className="card" ref={workRef}>
        <button
          type="button"
          onClick={function(){ toggle("work"); }}
          aria-expanded={active === "work"}
          aria-controls="panel-work"
        >
          Work History
                       
        </button>
 {workError && (
    <p style={{
    color: "#b91c1c",             
    backgroundColor: "#fee2e2",     
    border: "1px solid #fecaca",     
    padding: "0.5rem 0.75rem",
    marginBottom: "0.75rem",
    borderRadius: "4px",
    fontSize: "0.9rem",}}>
    {workError}
    </p>
)}
        {active === "work" && (
          <div id="panel-work">

            {workEntries.map(function (item, index) {
              return (
                <div
                  key={index}
                  style={{
                    border: "1px solid #444",
                    padding: "0.75rem",
                    marginBottom: "0.75rem",
                    borderRadius: "8px"
                  }}
                >
                  <h3>Job #{index + 1}</h3>

                  <label>
                    Company<br />
                    <input
                      type="text"
                      value={item.company}
                      onChange={function (event) {
                        updateWorkField(index, "company", event.target.value);
                      }}
                    />
                  </label>
                  <br />

                  <label>
                    Job Title<br />
                    <input
                      type="text"
                      value={item.jobTitle}
                      onChange={function (event) {
                        updateWorkField(index, "jobTitle", event.target.value);
                      }}
                    />
                  </label>
                  <br />

                  <label>
                    City<br />
                    <input
                      type="text"
                      value={item.locationCity}
                      onChange={function (event) {
                        updateWorkField(index, "locationCity", event.target.value);
                      }}
                    />
                  </label>
                  <br />

                  <label>
                    State / Province<br />
                    <input
                      type="text"
                      value={item.locationState}
                      onChange={function (event) {
                        updateWorkField(index, "locationState", event.target.value);
                      }}
                    />
                  </label>
                  <br />

                  <label>
                    Country<br />
                    <input
                      type="text"
                      value={item.locationCountry}
                      onChange={function (event) {
                        updateWorkField(index, "locationCountry", event.target.value);
                      }}
                    />
                  </label>
                  <br />

                  <label>
                    Type<br />
                    <select
                      value={item.type}
                      onChange={function (event) {
                        updateWorkField(index, "type", event.target.value);
                      }}
                    >
                      <option value="PROFESSIONAL">Professional</option>
                      <option value="INTERNSHIP">Internship</option>
                      <option value="VOLUNTEER">Volunteer</option>
                      <option value="SERVICE">Service</option>
                    </select>
                  </label>
                  <br />

                  <label>
                    Start Date<br />
                    <input
                      type="date"
                      value={item.startDate}
                      onChange={function (event) {
                        updateWorkField(index, "startDate", event.target.value);
                      }}
                    />
                  </label>
                  <br />

                  <label>
                    End Date<br />
                    <input
                      type="date"
                      value={item.endDate}
                      onChange={function (event) {
                        updateWorkField(index, "endDate", event.target.value);
                      }}
                      disabled={item.isCurrent === true}
                    />
                  </label>
                  <br />

                  <label>
                    <input
                      type="checkbox"
                      checked={item.isCurrent === true}
                      onChange={function (event) {
                        updateWorkField(index, "isCurrent", event.target.checked);
                      }}
                    />{" "}
                    I currently work here
                  </label>
                  <br />

                  <label>
                    Summary<br />
                    <textarea
                      value={item.summary}
                      onChange={function (event) {
                        updateWorkField(index, "summary", event.target.value);
                      }}
                      rows={3}
                    />
                  </label>
                  <br />

                  <button
                    type="button"
                    onClick={function () { handleDeleteWork(index); }}
                  >
                    - Remove Entry
                  </button>
                </div>
              );
            })}

            <button type="button" onClick={addWorkRow}>
              + Add Entry
            </button>

            <button
              type="button"
              onClick={function () {
                saveWorkSection();
              }}
              style={{ marginLeft: "1rem" }}
            >
              Save & Continue
            </button>

          </div>
        )}
      </section>

      <section className="card" ref={educationRef}>
        <button
          type="button"
          onClick={function(){ toggle("education"); }}
          aria-expanded={active === "education"}
          aria-controls="panel-education"
        >
          Education
        </button>
        {active === "education" && (
          <div id="panel-education">
            <div>
            <label>
              School / Institution<br />
              <input type="text"
              value={educationForm.schoolName}
              onChange={e =>
              setEducationForm(prev => ({
                ...prev,
                schoolName: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          Degree / Program<br />
          <input
            type="text"
            value={educationForm.degree}
            onChange={e =>
              setEducationForm(prev => ({
                ...prev,
                degree: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          Field of Study<br />
          <input
            type="text"
            value={educationForm.major}
            onChange={e =>
              setEducationForm(prev => ({
                ...prev,
                major: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          City<br />
          <input
            type="text"
            value={educationForm.locationCity}
            onChange={e =>
              setEducationForm(prev => ({
                ...prev,
                locationCity: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          Country<br />
          <input
            type="text"
            value={educationForm.locationCountry}
            onChange={e =>
              setEducationForm(prev => ({
                ...prev,
                locationCountry: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          Start Date<br />
          <input
            type="date"
            value={educationForm.startDate}
            onChange={e =>
              setEducationForm(prev => ({
                ...prev,
                startDate: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          End Date<br />
          <input
            type="date"
            value={educationForm.endDate}
            onChange={e =>
              setEducationForm(prev => ({
                ...prev,
                endDate: e.target.value,
              }))
            }
          />
        </label>
        <br />
    
    <label>
  GPA (numbers only)<br />
  <input
    type="number"
    step="0.01"
    value={educationForm.gpa}
    onChange={e =>
      setEducationForm(prev => ({
        ...prev,
        gpa: e.target.value,
      }))
    }
  />
</label>
      </div>

      <button
        type="button"
        onClick={ async function () { await saveEducationSection();
          advance("education"); }}
      >
        Save & Continue
      </button>
    </div>
  )}
</section>   

      <section className="card" ref={skillsRef}>
        <button
          type="button"
          onClick={function(){ toggle("skills"); }}
          aria-expanded={active === "skills"}
          aria-controls="panel-skills"
        >
          Skills
        </button>
       {active === "skills" && (
    <div id="panel-skills">
      <div>
        <label>
          Skill<br />
          <input
            type="text"
            value={skillForm.skillName}
            onChange={e =>
              setSkillForm(prev => ({
                ...prev,
                skillName: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          Level<br />
          <select
            value={skillForm.level}
            onChange={e =>
              setSkillForm(prev => ({
                ...prev,
                level: e.target.value,
              }))
            }
          >
            <option value="">Select a level</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </label>
        <br />

        <label>
          Notes<br />
          <textarea
            value={skillForm.notes}
            onChange={e =>
              setSkillForm(prev => ({
                ...prev,
                notes: e.target.value,
              }))
            }
            rows={3}
          />
        </label>
      </div>

      <button
        type="button"
        onClick={async function () {
          await saveSkillSection();
          advance("skills");
        }}
      >
        Save & Continue
      </button>
    </div>
  )}
</section>
      
      <section className="card" ref={projectsRef}>
        <button
          type="button"
          onClick={function(){ toggle("projects"); }}
          aria-expanded={active === "projects"}
          aria-controls="panel-projects"
        >
          Projects
        </button>
        {active === "projects" && (
    <div id="panel-projects">
      <div>
        <label>
          Project Name<br />
          <input
            type="text"
            value={projectForm.name}
            onChange={e =>
              setProjectForm(prev => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          Description<br />
          <textarea
            value={projectForm.description}
            onChange={e =>
              setProjectForm(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={3}
          />
        </label>
        <br />

        <label>
          Link (URL)<br />
          <input
            type="url"
            value={projectForm.link}
            onChange={e =>
              setProjectForm(prev => ({
                ...prev,
                link: e.target.value,
              }))
            }
          />
        </label>
      </div>

      <button
        type="button"
        onClick={async function () {
          await saveProjectSection();
          advance("projects");
        }}
      >
        Save & Continue
      </button>
    </div>
  )}
</section>

      <section className="card" ref={languagesRef}>
        <button
          type="button"
          onClick={function(){ toggle("languages"); }}
          aria-expanded={active === "languages"}
          aria-controls="panel-languages"
        >
          Languages
        </button>
        {active === "languages" && (
    <div id="panel-languages">
      <div>
        <label>
          Language<br />
          <input
            type="text"
            value={languageForm.name}
            onChange={e =>
              setLanguageForm(prev => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          Level<br />
          <select
            value={languageForm.level}
            onChange={e =>
              setLanguageForm(prev => ({
                ...prev,
                level: e.target.value,
              }))
            }
          >
            <option value="">Select a level</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
            <option value="NATIVE">Native</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={async function () {
          await saveLanguageSection();
          advance("languages");
        }}
      >
        Save & Continue
      </button>
    </div>
  )}
</section>


      <section className="card" ref={awardsRef}>
        <button
          type="button"
          onClick={function(){ toggle("awards"); }}
          aria-expanded={active === "awards"}
          aria-controls="panel-awards"
        >
          Awards
        </button>
        {active === "awards" && (
    <div id="panel-awards">
      <div>
        <label>
          Award Name<br />
          <input
            type="text"
            value={awardForm.name}
            onChange={e =>
              setAwardForm(prev => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          Issuer<br />
          <input
            type="text"
            value={awardForm.issuer}
            onChange={e =>
              setAwardForm(prev => ({
                ...prev,
                issuer: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          Date Issued<br />
          <input
            type="date"
            value={awardForm.issueDate}
            onChange={e =>
              setAwardForm(prev => ({
                ...prev,
                issueDate: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          Description<br />
          <textarea
            value={awardForm.description}
            onChange={e =>
              setAwardForm(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={3}
          />
        </label>
      </div>

      <button
        type="button"
        onClick={async function () {
          await saveAwardSection();
          advance("awards"); 
        }}
      >
        Save & Continue
      </button>
    </div>
  )}
</section>

    <section className="card" ref={licensesRef}>
  <button
    type="button"
    onClick={function () { toggle("licenses"); }}
    aria-expanded={active === "licenses"}
    aria-controls="panel-licenses"
  >
    Licenses
  </button>

  {active === "licenses" && (
    <div id="panel-licenses">
      <div>
        <label>
          Name<br />
          <input
            type="text"
            value={licenseForm.name}
            onChange={e =>
              setLicenseForm(prev => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          Institution / Issuer<br />
          <input
            type="text"
            value={licenseForm.institution}
            onChange={e =>
              setLicenseForm(prev => ({
                ...prev,
                institution: e.target.value,
              }))
            }
          />
        </label>
        <br />

        <label>
          Description<br />
          <textarea
            value={licenseForm.description}
            onChange={e =>
              setLicenseForm(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={3}
          />
        </label>
      </div>

      <button
        type="button"
        onClick={async function () {
          await saveLicenseSection();
          handleViewResume();
        }}
      >
        Save & View Resume
      </button>
    </div>
  )}
</section>
    </div>
  );
}
