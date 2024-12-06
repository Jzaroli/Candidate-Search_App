import { type FormEvent, useState } from 'react';
import { searchGithub  } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';


function SearchCandidate() {
   
    const searchCandidates = async (event: React.MouseEvent) => {
        event.preventDefault();

        try {
            const data = await searchGithub();
            
         if (data.length > 0) {  
            console.log(data[0].login)
            console.log(data)
            console.log('Found Candidates')
        } else {
            console.log('No candidates found')
        }
        } catch (error) {
            console.error('Error fetching candidates:', error)
        }
 };  

    return (
        <>
         <section>
                <button onClick={searchCandidates}>Submit</button>
        </section>
        </>
    );
}

export default SearchCandidate;


 
    // const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    //     login: '',
    //     avatar_url: '',
    //     location: '',
    //     email: '',
    //     company: '',
    //     bio: '',
    //   });

    //   const searchCandidateByUn = async (event: FormEvent, candidate_username: string) => { //need to define event in html
    //     event.preventDefault();
    //     const data: Candidate = await searchGithubUser(candidate_username);
    
    //     setCurrentCandidate(data);
    //     console.log(currentCandidate.location)
    //   };