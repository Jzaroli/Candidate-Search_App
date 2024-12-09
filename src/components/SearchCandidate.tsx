import { useEffect, useState } from 'react';
import { searchGithub  } from '../api/API';
import CandidateCard from './CandidateCard';
import Candidate from '../interfaces/Candidate.interface'
import minus from '../assets/images/minus.jpg';
import plus from '../assets/images/plus.jpg';

const styles = {
    div: {
        display: 'flex',
        justifyContent: 'space-between',        
        width: '20vw',
        marginTop: '1vw'
    },
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: '50%',
        width: '6vw',
        height: '6vw',
        margin: '0',
        padding: '0',
        border: 'none',
        overflow: 'hidden',   
    },
    image: {
        borderRadius: '50%',
        width: '6vw',
        height: '6vw',
        margin: '0',
    }
}

function SearchCandidate() {
    //Stores searched username to be passed down to child component CandidateCard:
    const [searchedCandidate, setCandidate] = useState<string>('');
    //Stores the full user's information in the parent components SearchCandidate, after being retrieved:
    const [newCandidateData, setLocalData] = useState<Candidate | null>(null);

    //Searches for candidate and sets the username in state to be passed down to child component
    const searchCandidates = async () => {
        try {
            const data = await searchGithub();
         if (data.length > 0) {  
            // console.log(data[0].login);
            setCandidate(data[0].login);
            console.log('Found Candidates');
        } else {
            console.log('No candidates found');
        }
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };  
    
    //Helps retrieve user information from child:
    const handleDataFromChild = (childData: any) => {
        setLocalData(childData);
      };
    
    //Saves user information to local storage on click from green button:
    const saveToLocalStorage = (newCandidate: Candidate): void => {
        
        // Initializes variable as either a Candidate or an empty array to avoid errors.
        let existingData: Candidate[] = [];
        try {
            const storedData = localStorage.getItem("candidates");
            existingData = storedData ? JSON.parse(storedData) : [];
        // catch sets existingData to empty array as a fall back:
        } catch (error) {
            console.error("Error parsing localStorage data. Reinitializing.", error);
            existingData = [];
        }
        //Adds new candidate to existing data and sets information as array of objects in local storage:
        const updatedData = [...existingData, newCandidate];
        localStorage.setItem("candidates", JSON.stringify(updatedData));
        console.log("Data saved to localStorage!", updatedData);
    };

    //Automatically searches for new candidate on page load:
    useEffect(() => {
        searchCandidates();
    }, []);

    return (
        <>
        <section>
            <CandidateCard user= {searchedCandidate} sendDataToParent={handleDataFromChild}  />
            <div style={styles.div}>
            <button style={styles.btn} onClick={searchCandidates}><img style={styles.image} src={minus}/></button> 
            <button style={styles.btn} onClick={() => { 
                if (newCandidateData) {
                    saveToLocalStorage(newCandidateData);
                    searchCandidates();
                  } else {
                    console.log("No candidate data to save!");
                  }
                }}><img style={styles.image} src={plus}/></button> 
            </div>
        </section>
        
        </>
    );
}

export default SearchCandidate;