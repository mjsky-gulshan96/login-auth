import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import { Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { profileActions } from './store/profileSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const profile = useSelector((profileStore) => profileStore.profile)
  const [cookies] = useCookies(['connect.sid', 'user']);
  const dispatch = useDispatch()
  
  const getProfile = async () => {
    const res = await axios.get('http://localhost:8000/profile', {
      headers: {
        userToken: cookies.user
      },
      withCredentials: true
    })
    if (res.status == 200) {
      dispatch(profileActions.setProfile({ profile: res.data }))
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    console.log('inside useeffect');
    getProfile()
    return () => {
      console.log('cleanup useeffect');
      controller.abort()
    };
  }, []);


  return (
    <>
      <Outlet />
    </>
  )
}

export default App
