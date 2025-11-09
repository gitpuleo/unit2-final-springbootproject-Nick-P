
function InterestsCV(props) {

    return (
        <div>
            <h3>Interests</h3>
            <ul>
            {props.inputData.map((interest, index) => (
                <li key={index}>{interest.interest}</li>
            ))}  
            </ul>
        </div>        
    );
}

export default InterestsCV;


