import { useState } from "react";
import { useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

//Component for inputting(post) a new resume through forms, including editing(put) and delete functionality
export default function ResumeForm() {


const [active, setActive] = useState("work");

//auto-scroll references
const workRef = useRef(null);
const educationRef = useRef(null);
const skillsRef = useRef(null);
const projectsRef = useRef(null);
const languagesRef = useRef(null);
const awardsRef = useRef(null);
const licensesRef = useRef(null);

let nextMap = { work: "education", education: "skills", skills: "projects", projects: "languages", languages: "awards", awards: "licenses" }; //auto-advancing sequence

  //methods for auto-advancing accordians open and closed
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


//PUT and POST for work section
async function saveWorkSection() {
  try {
    for (let i = 0; i < workEntries.length; i++) {
      const item = workEntries[i];

      //payload is the data sent in the request
      const payload = {
        company: item.company,
        jobTitle: item.jobTitle,
        locationCity: item.locationCity,
        locationState: item.locationState,
        locationCountry: item.locationCountry,
        type: item.type,
        startDate: item.startDate,
        endDate: item.endDate,
        isCurrent: item.isCurrent,
        summary: item.summary
      };

      let response;

      if (item.id == null) {
        response = await fetch(
          API_BASE + "/resumes/" + RESUME_ID + "/works",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          }
        );
      } else {  //else statement allows PUT in place of POST if item.id check shows checked id exists
        response = await fetch(
          API_BASE + "/works/" + item.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          }
        );
      }

      if (!response.ok) {
        alert("Save Failed");
        return;
      }

      // pull new id
      const saved = await response.json();

      // state handling
      setWorkEntries(function (prev) {
        const next = prev.slice();
        const copy = Object.assign({}, next[i]);
        copy.id = saved.id; // assume backend returns { id: ..., ... }
        next[i] = copy;
        return next;
      });
    }

    //error handling given complexity
    advance("work");
  } catch (error) {
    console.error(error);
    alert("Error saving work entries");
  }
}





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
            {/* Education form fields */}
            <button type="button" onClick={function(){ /* save */ advance("education"); }}>
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
            {/* Skills form fields */}
            <button type="button" onClick={function(){ /* save */ advance("skills"); }}>
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
            {/* project form fields */}
            <button type="button" onClick={function(){ /* save */ advance("projects"); }}>
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
            {/* language form fields */}
            <button type="button" onClick={function(){ /* save */ advance("languages"); }}>
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
            {/* award form fields */}
            <button type="button" onClick={function(){ /* save */ advance("awards"); }}>
              Save & Continue
            </button>
          </div>
        )}
      </section>

      <section className="card" ref={licensesRef}>
        <button
          type="button"
          onClick={function(){ toggle("licenses"); }}
          aria-expanded={active === "licenses"}
          aria-controls="panel-licenses"
        >
          Licenses
        </button>
        {active === "licenses" && (
          <div id="panel-licenses">
            {/* license form fields */}
            <button type="button" onClick={function(){ /* save */ advance("licenses"); }}>
              Save & Finish
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
