import { useEffect, useState } from 'react';
import { searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';

const styles = {
    div: {
        display: 'flex',
        flexDirection: 'column' as React.CSSProperties['flexDirection'],
        justifyContent: 'left',
        width: '20vw',
    },
    img: {
        borderRadius: '10% 10% 0% 0%',
        width: '20vw',
        height: '20vw'
    },
    h2: {
        fontSize: '1.5vw',
        margin: '0',
    },
    card: {
        width: '20vw',
        height: '20vw',
        boxSizing: 'border-box' as 'border-box',
        backgroundColor: 'black',
        borderRadius: '0% 0% 10% 10%',
        padding: '1.5vw',
        display: 'flex',
        flexDirection: 'column' as React.CSSProperties['flexDirection'],
    },
    p: {
        display: 'flex',
        flexDirection: 'row' as React.CSSProperties['flexDirection'],
        fontSize: '1.2vw',
        margin: '0.2vw'
    }
}

type CandidateCardProps = {
    user: string;    
}

const CandidateCard = ({ user }: CandidateCardProps) => {
    // console.log('this is the user type:', typeof user)
    const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
        login: '',
        avatar_url: '',
        location: '',
        email: '',
        company: '',
        bio: '',
      });

      const searchCandidateByUser = async (username: string) => {
        try {
            if (!username) {
                console.error('No username provided to search');
                return;
            }
            const data: Candidate = await searchGithubUser(username); // Fetch data
            console.log('Fetched user:', data);

            const candidate: Candidate ={
                login: data.login || '',
                avatar_url: data.avatar_url || '',
                location: data.location || '',
                email: data.email || '',
                company: data.company || '',
                bio: data.bio ||'',
            }
            console.log('current candidate', candidate)
            setCurrentCandidate(candidate); // Update the state with the fetched candidate
        } catch (error) {
            console.error('Error fetching user:', error);
        }
      };

    useEffect(() => {
        // if (user) {
            searchCandidateByUser(user); // Pass the `user` prop as the username
        // }
    }, [user]);

    return (
        <>
        <div style={styles.div}>
            <img style={styles.img} src={currentCandidate.avatar_url} alt='Candidate Logo'></img>
            <div style={styles.card}>
                <h2 style = {styles.h2}>{currentCandidate ? <p>{currentCandidate.login}</p> : null}</h2>
                {currentCandidate ? <p style = {styles.p}>Location: {currentCandidate.location}</p> : null}
                {currentCandidate ? <p style = {styles.p}>Email: {currentCandidate.email}</p> : null}
                {currentCandidate ? <p style = {styles.p}>Company: {currentCandidate.company}</p> : null}
                {currentCandidate ? <p style = {styles.p}>Bio: {currentCandidate.bio}</p> : null}
            </div>
        </div>
        </>
    )
}

export default CandidateCard;

// {user ? <p>{user} in the p tag</p> : null}

// {/* <button
//                 onClick={(event: FormEvent) =>
//                     searchCandidateByUser(event, user)}
//                 >
//                 Submit2
//                 </button> */}