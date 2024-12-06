import { Link, useLocation } from "react-router-dom";

const styles = {
  div: {
    width: '100%',
    margin: '0'
  },
  ul: {
    display: 'flex',
    margin: '1.3vw',
    padding: '1vw',
    listStyle: 'none',
    justifyContent: 'flex-start'
  },
  li: {
    marginLeft: '2vw',
    fontSize: '2vw'
  }
}

const Nav = () => {
  const currentPage = useLocation().pathname;
  return (
    <div style={styles.div}>
      <nav>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <Link
              to='/'
              className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
            >
              Home
            </Link>
          </li>
          <li style={styles.li}>
            <Link
              to='/SavedCandidates'
              className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
              >
              Potential Candidates
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default Nav;
