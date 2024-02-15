import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
    return (
        <>
            <Header />
            <section className="vh-100" style={{ "backgroundColor": "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ "borderRadius": "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                            <RegisterForm />
                                            <p className="small text-center fw-bold mt-2 pt-1 mb-0">Already have an account? <Link to='/login'
                                        className="link-success">Sign In</Link></p>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="register.webp" className="img-fluid" alt="Sample image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;
