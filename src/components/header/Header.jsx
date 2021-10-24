import './Header.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
    logoutUser
} from '../../redux/actions';
import Logo from '../../assets/logo.png';

const mapState = ({ auth, userData }) => ({
    auth: auth,
    userData: userData
})

function Header() {

    const { auth, userData } = useSelector(mapState);

    const dispatch = useDispatch();

    const history = useHistory();

    const profileOptionsRef = useRef();

    const [mobileNav, setMobileNav] = useState(true);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);

    const handleResetMobileNav = () => {
        setMobileNavActive(false);
    }

    const handleLogout = () => {
        if (showProfileOptions) {
            setShowProfileOptions(false);
        }
        dispatch(logoutUser())
            .catch((err) => {
                console.log(err.message);
            })
    }

    useEffect(() => {
        window.addEventListener("load", () => {
            if (window.innerWidth <= 992) {
                setMobileNav(true);
            }
            else {
                setMobileNav(false);
            }
        })

        window.addEventListener("resize", () => {
            if (window.innerWidth <= 992) {
                setMobileNav(true);
            }
            else {
                setMobileNav(false);
            }
        })
        return () => {
            window.removeEventListener("load", () => { })
            window.removeEventListener("resize", () => { })
        }
    }, [])

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (
                showProfileOptions &&
                profileOptionsRef.current &&
                !profileOptionsRef.current.contains(e.target)
            ) {
                setShowProfileOptions(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [showProfileOptions])

    return (
        <div className="header" id="header">
            <div className="logo"
                onClick={
                    () => {
                        if (mobileNav) handleResetMobileNav()
                        history.push("/")
                    }
                }>
                <img className="logo-img"
                    width="100%"
                    height="100%"
                    src={Logo}
                    alt="logo-img"
                    loading="lazy"
                />
            </div>

            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <div className={
                    mobileNav ?
                        mobileNavActive ?
                            "mobile-nav mobile-nav-active"
                            : "mobile-nav"
                        :
                        "nav-menu"
                }>
                    <ul>

                        <li>
                            <button onClick={
                                () => {
                                    if (mobileNav) handleResetMobileNav()
                                    history.push("/")
                                }
                            }>
                                Home
                            </button>
                        </li>

                        <li>
                            <button onClick={
                                () => {
                                    if (mobileNav) handleResetMobileNav()
                                    history.push("/about")
                                }
                            }>
                                About Us
                            </button>
                        </li>
                    </ul>

                    <div className="sign-in-area">

                        {
                            auth.authenticated ?
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                                    ref={profileOptionsRef}>

                                    <div className="user-header-btn"
                                        onClick={
                                            () => setShowProfileOptions(true)
                                        }>
                                        {
                                            mobileNav ?
                                                <li style={{
                                                    marginTop: 10,
                                                    marginBottom: 10
                                                }}>
                                                    <button>
                                                        {
                                                            userData.currentUser.name
                                                        }
                                                    </button>
                                                </li>
                                                :
                                                <button className="user-text-btn">
                                                    {
                                                        userData.currentUser.name
                                                    }
                                                </button>
                                        }
                                    </div>

                                    <div className={
                                        showProfileOptions ?
                                            "user-profile-options show-options" :
                                            "user-profile-options"
                                    }>

                                        <ul>

                                            <li>
                                                <button>
                                                    Profile
                                                </button>
                                            </li>

                                            <li>
                                                <button
                                                    onClick={handleLogout}>
                                                    Logout
                                                </button>
                                            </li>

                                        </ul>

                                    </div>

                                </div> :
                                <button className="rounded-filled-btn sign-in-btn"
                                    onClick={
                                        () => {
                                            if (mobileNav) handleResetMobileNav()
                                            history.push("/login")
                                        }
                                    }
                                >
                                    Login
                                </button>
                        }

                    </div>

                </div>


                {/* Mobile Nav Toggle */}
                <button className="mobile-nav-toggle"
                    onClick={
                        () => setMobileNavActive(!mobileNavActive)
                    }>
                    {
                        mobileNavActive ?
                            <CloseIcon />
                            :
                            <MenuIcon />
                    }
                </button>
                {/* Mobile Nav Toggle */}

            </div>
        </div >
    )
}

export default Header;