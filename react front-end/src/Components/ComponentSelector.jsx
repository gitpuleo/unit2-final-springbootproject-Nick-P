import { useState } from "react";
import "./ComponentSelector.css";

//This will incorporate useState in order to handle dynamically rendering the dropdown menus
function ComponentSelector(props) {
  const [openWork, setOpenWork] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  const [openMisc, setOpenMisc] = useState(false);

  //Updates state based on user interaction and sends that information back up to the parent component.

  return (
    <div className="sidenav">
      <button
        onClick={() => setOpenWork((prevValue) => !prevValue)}
        className="dropdown-btn"
      >
        Work History
        <i className="fas fa-caret-down"></i>
      </button>
      {openWork && (
        <div className="dropdown-container">
          <label>
            Professional
            <input
              type="checkbox"
              checked={props.renderProfessional}
              onChange={() =>
                props.setRenderProfessional((prevValue) => !prevValue)
              }
            />
          </label>
          <label>
            Service
            <input
              type="checkbox"
              checked={props.renderService}
              onChange={() => props.setRenderService((prevValue) => !prevValue)}
            />
          </label>
        </div>
      )}
      <label className="no-drop-btn">
        Education
        <input
          type="checkbox"
          checked={props.renderEducation}
          onChange={() => props.setRenderEducation((prevValue) => !prevValue)}
        />
      </label>
      <button
        onClick={() => setOpenSkills((prevValue) => !prevValue)}
        className="dropdown-btn"
      >
        Technical Skills
        <i className="fas fa-caret-down"></i>
      </button>
      {openSkills && (
        <div className="dropdown-container">
          <label>
            Technical Skills
            <input
              type="checkbox"
              checked={props.renderTechskills}
              onChange={() =>
                props.setRenderTechskills((prevValue) => !prevValue)
              }
            />
          </label>
          <label>
            Licenses & Certifications
            <input
              type="checkbox"
              checked={props.renderCertification}
              onChange={() =>
                props.setRenderCertification((prevValue) => !prevValue)
              }
            />
          </label>
        </div>
      )}
      <button
        onClick={() => setOpenMisc((prevValue) => !prevValue)}
        className="dropdown-btn"
      >
        Miscellaneous
        <i className="fas fa-caret-down"></i>
      </button>
      {openMisc && (
        <div className="dropdown-container">
          <label>
            Volunteering
            <input
              type="checkbox"
              checked={props.renderVolunteering}
              onChange={() =>
                props.setRenderVolunteering((prevValue) => !prevValue)
              }
            />
          </label>
          <label>
            Interests
            <input
              type="checkbox"
              checked={props.renderInterest}
              onChange={() =>
                props.setRenderInterest((prevValue) => !prevValue)
              }
            />
          </label>
        </div>
      )}
      <label className="no-drop-btn">
        Writing
        <input
          type="checkbox"
          checked={props.renderWriting}
          onChange={() => props.setRenderWriting((prevValue) => !prevValue)}
        />
      </label>
      <label className="no-drop-btn">
        Photos
        <input
          type="checkbox"
          checked={props.renderPhotos}
          onChange={() => props.setRenderPhotos((prevValue) => !prevValue)}
        />
      </label>
      <br />
      <button
        className="generate-btn"
        onClick={() => props.setHasGenerated(true)}
      >
        Generate
      </button>
    </div>
  );
}

export default ComponentSelector;
