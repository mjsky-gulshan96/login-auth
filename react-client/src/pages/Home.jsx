import Header from '../components/Header';
import { useSelector } from 'react-redux';

const Home = () => {
    const profile = useSelector((profileStore) => profileStore.profile)

    return (
        <>
            <Header/>
        </>
    );
}

export default Home;
