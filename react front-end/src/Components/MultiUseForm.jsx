import { useState } from "react";

//not used, but not removed because removal breaks the app
//Contact form also doubles as form for inquiry after CV with different styling and labels
function MultiUseForm(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [recordText, setRecordText ] = useState("");

    return (
        
        <form
            className="multi-form" 
            onSubmit={(event) => {event.preventDefault();
            props.submitBehavior(name, email, recordText)}}
            >
            <label htmlFor="name-input">Name:  </label>
            <input 
            type="text" 
            id="name-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            /> 
            <br/>
            <label htmlFor="email-input">E-mail:  </label>
            <input 
            type="email" 
            id="email-input" 
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            /> 
            <br/>
            <label htmlFor="text-input" >Query:  </label>
            <textarea 
            id="text-input"
            name="feedback-contact"
            value={recordText}
            onChange={(event) => setRecordText(event.target.value)}
            ></textarea>
            <br/>
            <button type="submit">{props.submitBtnText}</button>
            <br/>
        </form>

    );
}

export default MultiUseForm;
