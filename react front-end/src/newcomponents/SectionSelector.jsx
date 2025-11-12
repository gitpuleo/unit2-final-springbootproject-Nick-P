
//Selector component does not have state, only deals with changing the states in its parent ResumeDisplay
export default function SectionSelector(props) {
  return (
    <details>
      <summary>Section Selector</summary>

      <label>
        <input
          type="checkbox"
          checked={props.showWork}
          onChange={() => props.setShowWork(!props.showWork)}
        />
        Work
      </label>

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
      
    </details>
  );
}
