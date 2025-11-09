import './WorkHistoryCV.css';

function WorkHistoryCV(props) {

    return (
        <div>
            <h3>Work History</h3>
            {props.inputData.map((job, index) => (
                <li key={index} className="job-section">
                    <span>{job.employer} </span>
                    <br />
                    <span>{job.location} </span>
                    <span> | {job.dateRange} </span>
                    <p>{job.description}</p>
                </li>        
            ))}
        </div>
    );
}

export default WorkHistoryCV;
