import { useRef } from "react";
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import { MdEmail, MdOutlineWifiPassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate()
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const cpassword = useRef();
    const cbox = useRef();

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        if (password.current.value!== cpassword.current.value) {
            return;
        }
        const data = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            cBox: cbox.current.value
        }
        try {
            const res = await axios.post('http://localhost:8000/register', data)
            console.log(res);
            if (res.status == 200) navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
            <div className="d-flex flex-row align-items-center mb-4">
                <FaUser className="fas fa-user fa-lg me-3 fa-fw" />
                <div className="form-outline flex-fill mb-0">
                    <input type="text" id="name" className="form-control" ref={name} />
                    <label className="form-label" htmlFor="name">Your Name</label>
                </div>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
                <MdEmail className="fas fa-envelope fa-lg me-3 fa-fw" />
                <div className="form-outline flex-fill mb-0">
                    <input type="email" id="email" ref={email} className="form-control" />
                    <label className="form-label" htmlFor="email">Your Email</label>
                </div>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
                <MdOutlineWifiPassword className="fas fa-lock fa-lg me-3 fa-fw" />
                <div className="form-outline flex-fill mb-0">
                    <input type="password" id="pass" className="form-control" ref={password} />
                    <label className="form-label" htmlFor="pass">Password</label>
                </div>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
                <MdOutlineWifiPassword className="fas fa-key fa-lg me-3 fa-fw" />
                <div className="form-outline flex-fill mb-0">
                    <input type="password" id="cpass" className="form-control" ref={cpassword} />
                    <label className="form-label" htmlFor="cpass">Repeat your password</label>
                </div>
            </div>
            <div className="form-check d-flex justify-content-center mb-5">
                <input className="form-check-input me-2" type="checkbox" value="" id="cbox" ref={cbox} />
                <label className="form-check-label" htmlFor="cbox">
                    I agree all statements in <a href="#!">Terms of service</a>
                </label>
            </div>
            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button className="btn btn-primary btn-lg">Register</button>
            </div>
        </form>
    );
}

export default RegisterForm;
