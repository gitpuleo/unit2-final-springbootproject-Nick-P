//Not client, using this as scratchpad for fetch
/*

import { useEffect, useState } from "react";

const [allResumes, setAllResumes] = useState(null);

//building endpoints
const fetchResume = async () => {
    
    const resumes = [];

    try {
        const response = await fetch('http://localhost:8080/resumes');

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `ERROR - Status ${response.status}`);
        } else {

        const data = await response.json(); //this gets the data out of the response, opening it

        //you can console.log(data) to check it

        data.forEach(resume => {
            let newResume = new Resume(resume.works.id,
                 resume.educations.id,
                resume.skills.id,
            );

        })
    
    }
}catch (error) {
    console.error(error.message)

    } finally {
        setAllResumes(resumes);
        //setting the state in the finally block
    }

    }



//utilize the useEffect() hook to ensure fetching functions are called when the component first loads

useEffect(() => {
    fetchResume();
}, []);


useEffect(() =? {
    if  (allResumes !== null) {
        setIsLoading(false);
    }
})



*/