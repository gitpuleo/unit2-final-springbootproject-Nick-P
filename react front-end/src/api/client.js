import { useEffect, useState } from "react";



//Not client, using this as scratchpad for fetch
const [allResumes, setAllResumes] = useState(null);

//building endpoints
const fetchResume = async () => {
    
    const resumes = [];

    try {
        const response = await fetch('where you are fetching from');
        const data = await response.json(); //this gets the data out of the response, opening it

        //you can console.log(data) to check it

        data.forEach(resume => {
            let newResume = new Resume(resume.works.id, resume.educations.id //etc?);

        })
    
    }
catch (error) {

    } finally {

    }

    }



//utilize the useEffect() hook to ensure fetching functions are called when the component first loads

useEffect(() => {
    fetchResume();
}, []);