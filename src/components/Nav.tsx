import { Link, useLocation } from "react-router-dom";

const styles = {
  div: {
    width: '100%'
  },
  ul: {
    display: 'flex',
    margin: '1vw',
    padding: '1vw',
    listStyle: 'none',
    justifyContent: 'flex-start'
  },
  li: {
    marginLeft: '1vw',
    fontSize: '1.5vw'
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
