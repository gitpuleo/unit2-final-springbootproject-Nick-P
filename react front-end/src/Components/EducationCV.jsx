import './EducationCV.css';

//key={index} is for react to track where it is in the array map it is working on.

function EducationCV(props) {

    return(
        <div>
            <h3>Education</h3>
        <table className='education-table'>
            <thead>
                <tr>
                    <th>Degree</th>
                    <th>Institution</th>
                    <th>Graduation Year</th>
                    <th>Minor</th>
                </tr>
            </thead>
            <tbody>
                {props.inputData.map((education, index) => (
                <tr key={index}> 
                <td>{education.degree}</td>
                <td>{education.school}</td>
                <td>{education.gradYear}</td>
                <td>{education.minor ? education.minor : " "}</td>
                </tr>
                 ))}
            </tbody>
        </table>
        </div>
    );
}

export default EducationCV;
