
//Selector component does not have state, only deals with changing the states in its parent ResumeDisplay
export default function SectionSelector(props) {
  return (
    <details style={{ margin: "1rem 0" }}>
      <summary style={{ cursor: "pointer" }}>Section Selector</summary>

      <div style={{ display: "flex", flexDirection: "column", gap: ".5rem", marginTop: ".5rem" }}>
       
        <label>
          <input
            type="checkbox"
            checked={props.showWork}
            onChange={function(){ props.setShowWork(!props.showWork); }}
          />{" "}
          Work History
        </label>

        <div style={{ marginLeft: "1.5rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
          <label>
            <input
              type="checkbox"
              checked={props.showWorkProfessional}
              onChange={function(){ props.setShowWorkProfessional(!props.showWorkProfessional); }}
              disabled={!props.showWork}
            />{" "}
            Professional
          </label>

          <label>
            <input
              type="checkbox"
              checked={props.showWorkInternship}
              onChange={function(){ props.setShowWorkInternship(!props.showWorkInternship); }}
              disabled={!props.showWork}
            />{" "}
            Internships
          </label>

          <label>
            <input
              type="checkbox"
              checked={props.showWorkVolunteer}
              onChange={function(){ props.setShowWorkVolunteer(!props.showWorkVolunteer); }}
              disabled={!props.showWork}
            />{" "}
            Volunteer
          </label>
        
          <label>
            <input
              type="checkbox"
              checked={props.showWorkService}
              onChange={function(){ props.setShowWorkService(!props.showWorkService); }}
              disabled={!props.showWork}
            />{" "}
            Service
          </label>
        </div>

      <label>
        <input
          type="checkbox"
          checked={props.showEducation}
          onChange={() => props.setShowEducation(!props.showEducation)}
        />
        Education
      </label>

      <label>
        <input
          type="checkbox"
          checked={props.showSkills}
          onChange={() => props.setShowSkills(!props.showSkills)}
        />
        Skills
      </label>

      <label>
        <input
          type="checkbox"
          checked={props.showProjects}
          onChange={() => props.setShowProjects(!props.showProjects)}
        />
        Projects
      </label>

        <label>
        <input
          type="checkbox"
          checked={props.showLicenses}
          onChange={() => props.setShowLicenses(!props.showLicenses)}
        />
        Licenses
      </label>

      <label>
        <input
          type="checkbox"
          checked={props.showAwards}
          onChange={() => props.setShowAwards(!props.showAwards)}
        />
        Awards & Honors
      </label>

      <label>
        <input
          type="checkbox"
          checked={props.showLanguages}
          onChange={() => props.setShowLanguages(!props.showLanguages)}
        />
        Languages
      </label>
      </div>
    </details>
  );
}
