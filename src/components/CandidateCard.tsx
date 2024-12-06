import { type FormEvent, useState } from 'react';
import { searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';

type CandidateCardProps = {
    user1: string;    
}

const CandidateCard = ({ user1 }: CandidateCardProps) => {
    
    const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
        login: '',
        avatar_url: '',
        location: '',
        email: '',
        company: '',
        bio: '',
      });

      const searchCandidateByUser = async (event: FormEvent, username: string) => { //need to define event in html
        event.preventDefault();
        const data: Candidate = await searchGithubUser(username);
    
        setCurrentCandidate(data);
      };

    return (
        <>
        <section>
                <button
                onClick={(event: FormEvent) =>
                    searchCandidateByUser(event, user1)}
                >
                Submit2
            </button>
         </section>
        </>
    )
}

export default CandidateCard;
