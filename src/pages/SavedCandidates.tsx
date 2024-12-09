import { useEffect, useState } from 'react';
import type Candidate from '../interfaces/Candidate.interface';
import minus from '../assets/images/minus.jpg';

const styles = {
  h1: {
    fontSize: '3vw',
    margin: '0.2vw',
    marginBottom: '1.8vw'
  },
  table: {
    width: '80%',
    border: '0.05vw solid black',
    borderCollapse: 'collapse',
  },
  p: {
    fontSize: '1.5vw',
    fontWeight: 'bold'
  },
  th: {
    border: '0.05vw solid black',
    padding: '0.5vw',
    fontSize: '1.5vw',
    width: '10vw'
  },
  td: {
    border: '0.05vw solid black',
    padding: '0.5vw',
    fontSize: '1.2vw',
  },
  tdavatar: {
      width: '15vw',
      height: '15vw',
      borderRadius: '50%'
  },
  div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    width: '4vw',
    height: '4vw',
    padding: '0',
    border: 'none',
    overflow: 'hidden',
  },
  image: {
    borderRadius: '50%',
    width: '4vw',
    height: '4vw',
    margin: '0'
  },
  href: {
    fontSize: '1.2vw',
  }
}

const SavedCandidates = () => {
  //State variable for storing candidates in memory, than parsing to JSX:
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  //Pulls candidates from local storage:
  const pullFromStorage = () => {
    //Pulls from local storage
    const storedData = localStorage.getItem("candidates");
    // console.log(storedData);
    try {
      //Condition for if there are no candidates in storage:
      if (!storedData) {
        console.log('there are no candidates to show')
      //Parses local storage data and sets to component state:
      } else if (storedData) {
        const parsedData: Candidate[] = JSON.parse(storedData);
        setCandidates(parsedData);
      }
    } catch (error) {
       console.log('An error occured', error);
    }
  }

  //Conducts pulling from local storage on component render:
  useEffect(() => {
    pullFromStorage();
  }, []);

  const deleteCandidate = (login: string | null) => {
    const updatedCandidates: Candidate[] = candidates.filter((candidate) => candidate.login !== login);
    setCandidates(updatedCandidates);
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
  }

  return (
    <>
      <h1 style = {styles.h1}>Potential Candidates</h1>
      {candidates.length > 0 ? (
        <table>
          <thead>
            <tr>
                <th style={styles.th}>Avatar</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Github</th>
                <th style={styles.th}>Bio</th>
                <th style={styles.th}>Reject</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index}>
                  <td style={styles.td}>
                    <img style={styles.tdavatar} src={candidate.avatar_url}/>
                  </td>
                  <td style={styles.td}>{candidate.login}</td>
                  <td style={styles.td}>{candidate.location || "N/A"}</td>
                  <td style={styles.td}>{candidate.email || "N/A"}</td>
                  <td style={styles.td}>{candidate.company || "N/A"}</td>
                  <td style={styles.td}><a style = {styles.href} href={candidate.url || '#'} target="_blank">GitHub</a></td>
                  <td style={styles.td}>{candidate.bio || "N/A"}</td>
                  <td style={styles.td}>
                    <div style={styles.div}>
                      <button style={styles.button} onClick={() => deleteCandidate(candidate.login)} ><img style={styles.image} src={minus}/></button> 
                    </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.p}>There are no candidates saved yet!</p>
      )}
    </>
  );
};

export default SavedCandidates;
