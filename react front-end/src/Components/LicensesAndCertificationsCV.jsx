import './LicensesAndCertifications.css';

function LicensesAndCertificationsCV(props) {

     return (
        
        <div className="certs">
            <h3>Licenses & Certifications</h3>
            <ul>
            {props.inputData.map((cert, index) => (
                <li key={index}>
                  <span>{cert.name}</span>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default LicensesAndCertificationsCV;
