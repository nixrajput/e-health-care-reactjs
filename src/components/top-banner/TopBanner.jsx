import './TopBanner.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BannerImg from '../../assets/home-banner.svg';

const mapState = ({ auth }) => ({
    auth: auth
})

function TopBanner() {

    const { auth } = useSelector(mapState);

    const history = useHistory();

    return (
        <div className="container" id="top-banner">

            <div className="row row-padding"
                style={{
                    paddingTop: 20,
                    paddingBottom: 40
                }}>

                <div className="col-xl-4 col-md-5">

                    <div style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center"
                    }}>

                        <div className="title">
                            Welcome to <span style={{
                                color: "var(--activeColor)"
                            }}>
                                eHealth
                            </span>
                        </div>

                        <div className="subtitle">
                            An online health care system for all by <strong>NixLab</strong>.
                        </div>

                        {
                            auth.authenticated === false &&
                            <button className="rounded-filled-btn get-started-btn"
                                onClick={
                                    () => history.push("/login")
                                }>
                                Get Started
                            </button>
                        }

                    </div>

                </div>

                <div className={auth.authenticated ? "col-xl-6 col-md-7 small-d-none" : "col-xl-6 col-md-7"} >
                    <object className="banner-img"
                        type="image/svg+xml"
                        data={BannerImg}>
                        svg-animation
                    </object>
                </div>

            </div>

        </div>
    )
}

export default TopBanner;
