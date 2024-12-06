import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import SearchCandidate from '../components/SearchCandidate';

const CandidateSearch = () => {
  return ( 
    <>
      <h1>CandidateSearch</h1>
      <SearchCandidate />
    </>
  );
};

export default CandidateSearch;
