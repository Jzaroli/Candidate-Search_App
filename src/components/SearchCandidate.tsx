import { useEffect, useState } from 'react';
import { searchGithub  } from '../api/API';
import CandidateCard from './CandidateCard';
import minus from '../assets/images/minus.jpg';
import plus from '../assets/images/plus.jpg'


const styles = {
    div: {
        display: 'flex',
        justifyContent: 'space-between',        
        width: '20vw',
    },
    btn: {
        margin: '0',
        backgroundColor: 'transparent',
        marginTop: '0.5vw',
        width: '6vw',
        height: '6vw',
        padding: '0.2vw'   
    },
    minus: {
        borderRadius: '50%',
        width: '4vw',
        height: '4vw',
        margin: '0',
        padding: '0.1vw' 
    },
    btn2: {
        borderRadius: '50%',
        marginTop: '1vw',
        fontWeight: 'bold'
    }
}


function SearchCandidate() {
    const [searchedCandidate, setCandidate] = useState<string>('');

    const searchCandidates = async () => {
        try {
            const data = await searchGithub();
            
         if (data.length > 0) {  
            console.log(data[0].login);
            setCandidate(data[0].login);
            console.log('Found Candidates');
        } else {
            console.log('No candidates found');
        }
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };  
    
    useEffect(() => {
        searchCandidates();
    }, []);

    return (
        <>
        <section>
            <CandidateCard user= {searchedCandidate} />
            <div style={styles.div}>
            <button style={styles.btn} onClick={searchCandidates}><img style={styles.minus} src={minus}/></button> 
            <button style={styles.btn} onClick={searchCandidates}><img style={styles.minus} src={plus}/></button> 
            </div>
        </section>
        
        </>
    );
}

export default SearchCandidate;

//EVENT code:
    // event.preventDefault();
    // event: React.MouseEvent
    // <button onClick={searchCandidates}>Submit</button> 
    // <section>
    //     {searchedCandidate ? <p>{searchedCandidate}</p> : null}
    // </section>
 
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