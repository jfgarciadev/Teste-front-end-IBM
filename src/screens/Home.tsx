import SearchBar from '../components/SearchBar';
import styles from './Home.module.scss';

function Home() {


  return (
    <div className={styles.home}>
        <div className={styles.SearchBar} >
            <SearchBar />
        </div>
        
    </div>
  );
}

export default Home;
 