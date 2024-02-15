import { Link } from 'react-router-dom';
import { useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MdOutlineWifiPassword, MdEmail } from "react-icons/md";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { profileActions } from '../store/profileSlice';

const LoginForm = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const password = useRef();
  const email = useRef();
  const rememberMe = useRef(false)

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const data = {
      email: email.current.value,
      password: password.current.value,
      rememberMe: rememberMe.current.checked
    }
    try {
      const res = await axios.post('http://localhost:8000/login', data, {
        withCredentials: true
      })
      if (res.status == 200) {
        dispatch(profileActions.setProfile({profile: res.data}))
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleGoogle = () => {
    window.open('http://localhost:8000/auth/google/callback', "_self")
  }

  const handleLinkedin = () => {
    window.open('http://localhost:8000/auth/linkedin/callback', "_self")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
        <p className="lead fw-normal mb-0 me-3">Sign in with</p>
        <button type="button" className="btn btn-dark btn-floating mx-1" onClick={handleGoogle}>
          <FcGoogle className="login-icons" />
        </button>

        <button type="button" className="btn btn-dark btn-floating mx-1">
          <FaTwitter className="login-icons" />
        </button>

        <button type="button" className="btn btn-dark btn-floating mx-1" onClick={handleLinkedin}>
          <FaLinkedin className="login-icons" />
        </button>
      </div>

      <div className="divider d-flex align-items-center my-4">
        <p className="text-center fw-bold mx-3 mb-0">Or</p>
      </div>

      <div className="form-outline mb-4">
        <input type="email" id="email" className="form-control form-control-lg"
          placeholder="Enter a valid email address" ref={email} />
        <label className="form-label" htmlFor="email"><MdEmail />Email address</label>
      </div>

      <div className="form-outline mb-3">

        <input type="password" id="password" ref={password} className="form-control form-control-lg"
          placeholder="Enter password" />
        <label className="form-label" htmlFor="password"><MdOutlineWifiPassword />Password</label>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div className="form-check mb-0">
          <input className="form-check-input me-2" ref={rememberMe} type="checkbox" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>
        <a href="#!" className="text-body">Forgot password?</a>
      </div>

      <div className="text-center text-lg-start mt-4 pt-2">
        <button className="btn btn-primary btn-lg"
          style={{ "paddingLeft": "2.5rem", "paddingRight": "2.5rem" }}>Login</button>
        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to='/register'
          className="link-danger">Register</Link></p>
      </div>

    </form>
  );
}

export default LoginForm;
