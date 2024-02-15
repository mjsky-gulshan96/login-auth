import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileLogo from "./profileLogo";

const Header = () => {
    const profile = useSelector((profileStore) => profileStore.profile);

    return (
        <>
            <header className="p-3 text-bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to='/' className="nav-link px-2 text-primary">Home</Link></li>
                        </ul>

                        {/*<form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
                        </form>*/}

                        {profile ? <ProfileLogo /> : <div className="text-end">
                            <Link to='/login' className="btn btn-outline-light me-2">Login</Link>
                            <Link to='/register' className="btn btn-warning">Sign-up</Link>
                        </div>
                        }
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
