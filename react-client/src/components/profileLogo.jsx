import '../css/profileLogo.css'
import axios from "axios";
import { useCookies } from 'react-cookie'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { profileActions } from "../store/profileSlice";

const ProfileLogo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [cookies] = useCookies(['user']);

  const handleLogOut = async () => {
    const res = await axios.get('http://localhost:8000/logout', {
      headers: {
        userToken: cookies.user
      },
      withCredentials: true
    })
    if (res.status == 200) {
      console.log(res);
      dispatch(profileActions.removeProfile())
      navigate('/login')
    }
  }

  return (
    <>
        <div className="logo-img">
      <Link to='/profile'>
          <img className="image" src="picture.png" alt="picture" />
      </Link>
        </div>
      <button type="button" className="btn btn-warning" onClick={handleLogOut}>Log Out</button>
    </>
  );
}

export default ProfileLogo;
