import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import SearchCandidate from '../components/SearchCandidate';

const styles = {
  h1: {
    fontSize: '3vw',
    margin: '0.2vw',
    marginBottom: '0.8vw'
  }
}

const CandidateSearch = () => {
  return ( 
    <>
      <h1 style = {styles.h1}>Candidate Search</h1>
      <SearchCandidate />
    </>
  );
};

export default CandidateSearch;
