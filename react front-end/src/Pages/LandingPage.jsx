import DynamicCVGenerator from '../Components/DynamicCVGenerator'
import './LandingPage.css';
import { useState } from 'react';
import ComponentSelector from '../Components/ComponentSelector';

function LandingPage() {

    //For handling state values passed down to the child component:
    const [renderProfessional, setRenderProfessional] = useState(false);
    const [renderService, setRenderService] = useState(false);
    const [renderEducation, setRenderEducation ] = useState(false);
    const [renderTechskills, setRenderTechskills] = useState(false);
    const [renderCertification, setRenderCertification] = useState(false);
    const [renderVolunteering, setRenderVolunteering] = useState(false);
    const [renderInterest, setRenderInterest] = useState(false);
    const [renderWriting, setRenderWriting] = useState(false);
    const [renderPhotos, setRenderPhotos] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    //Refactored to separate component selector from being a child of DynamicCVGenerator, separating concerns and enabling flex styling of Landing Page without breaking the sidebar.
    return(
        <main className='main-format'>
            <ComponentSelector
              renderProfessional={renderProfessional}
              renderService={renderService}
              renderEducation={renderEducation}
              renderTechskills={renderTechskills}
              renderCertification={renderCertification}
              renderVolunteering={renderVolunteering}
              renderInterest={renderInterest}
              renderWriting={renderWriting}
              renderPhotos={renderPhotos}
              hasGenerated={hasGenerated}
              setHasGenerated={setHasGenerated}
              setRenderProfessional={setRenderProfessional}
              setRenderService={setRenderService}
              setRenderEducation={setRenderEducation}
              setRenderTechskills={setRenderTechskills}
              setRenderCertification={setRenderCertification}
              setRenderVolunteering={setRenderVolunteering}
              setRenderInterest={setRenderInterest}
              setRenderWriting={setRenderWriting}
              setRenderPhotos={setRenderPhotos}
            />
            <div className='intro-lander'>
            {!hasGenerated &&(


            <div>
            <header>
              <h1>Welcome to Dynamic CV!</h1>
            </header>
            <h2>Dynamic CV is designed to rebalance a broken recruitment process, allowing candidates to supply their full CV, and obligating  </h2>
            <br/>
            <h3> &larr; Choose on the side panel what information you would like to know about--in this case--me.</h3>
            <br/>
            <h3> &larr; Hit the 'Generate' button to render your selected elements.</h3>
            <br />
            <p>
            Enjoy the concept? Navigate to the License page to download the application for free. Add your data in the CVData.js file in the utils folder to render your own CV. All objects are extensible. See the ReadMe for guidance on substituting your own information. Enjoy and be good.
            </p>
            </div>
            )}
            <section className='main-cv'>
            <DynamicCVGenerator
            renderProfessional={renderProfessional}
            renderService={renderService}
            renderEducation={renderEducation}
            renderTechskills={renderTechskills}
            renderCertification={renderCertification}
             renderVolunteering={renderVolunteering}
            renderInterest={renderInterest}
            renderWriting={renderWriting}
             renderPhotos={renderPhotos}
            hasGenerated={hasGenerated}
            />
            </section>
            </div>
        </main>
    )
}


export default LandingPage;