
import MultiUseForm from '../Components/MultiUseForm';
import { useState } from 'react';

function Contact() {
    const [submittedMessage, setSubmittedMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingMessage, setEditingMessage] = useState('');

    function deleteText() {
        setSubmittedMessage("");
    }

    function editText() {
        setIsEditing(true);
        setEditingMessage(submittedMessage);
    }

    function saveText() {
        setSubmittedMessage(editingMessage); 
        setIsEditing(false);
    }

    function feedbackFunction(name, email, text) {
        let messagePreview = `${name}, preview your submission (via ${email}) and edit if desired: \n${text}`;
        setSubmittedMessage(messagePreview);
    }

    return(
        <div className="contact-form">
            <h1>I'd love to hear your thoughts</h1>
            <h2>(On anything, really)</h2>
            <br />
            <MultiUseForm 
            submitBtnText={"Submit Query"}
            submitBehavior={feedbackFunction}
            />
        { submittedMessage && !isEditing && (
            <div className='preview'>
                <p>{submittedMessage}</p>
                <button onClick={editText}>Edit</button>
                <button onClick={deleteText}>Delete</button>
        </div>
    )}
        {isEditing && (
            <div>
                <textarea
                value={editingMessage}
                onChange={(event) => setEditingMessage(event.target.value)}/>
                <br />
                <button onClick={saveText}>Save</button>
            </div>
        )}
        </div>
    );
}

export default Contact;

//Additional state variable needed to handle the "in-between" state when form is in "editing mode". 
