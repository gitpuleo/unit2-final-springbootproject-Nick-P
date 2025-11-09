import './VolunteeringCV.css';

function VolunteeringCV(props) {

    return (
        <div className='volunteering'>
            <h3>Volunteering</h3>
            <ul>
              {props.inputData.map((volunteer, index) => (
                <li key={index}>
                    <strong>{volunteer.name}</strong>
                    <span> | {volunteer.dateRange}</span>
                    <p>{volunteer.description}</p>
                </li>    
                ))}  
            </ul>
            
        </div>
    );
}

export default VolunteeringCV;
