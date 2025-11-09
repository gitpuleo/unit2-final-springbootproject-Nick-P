import './TechnicalSkillsCV.css';

function TechnicalSkillsCV(props) {

    return (
        <div>
            <h3>Technical Skills</h3>
            <table className="tech-skills">
                <thead>
                    <tr>
                        <th>Skill </th>
                        <th>Proficiency </th>
                    </tr>
                </thead>
                <tbody>
                    {props.inputData.map((skill, index) => (
                        <tr key={index}>
                    <td>{skill.skill}</td>
                    <td>{skill.proficiency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TechnicalSkillsCV;




//Use table for this one