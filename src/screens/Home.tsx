import SearchBar from '../components/SearchBar';
import styles from './Home.module.scss';

function Home() {
  return (
    <div className={styles.home}>
       <h1 className={styles.LogoText}>Only <span>Free</span> . books</h1>
        <div className={styles.SearchBar} >
            <SearchBar />
        </div>
        
    </div>
  );
}

export default Home;
 