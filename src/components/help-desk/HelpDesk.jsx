import './HelpDesk.css';
import { useState, lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllHelps } from '../../redux/actions';
import LoadingSpinner from '../widgets/LoadingSpinner';
import { getTimeFormat } from './dateFormat';
import Img from '../../assets/preventions.svg';

const AskHelpDialog = lazy(() => import('./AskHelpDialog'));

const HomeCurable = [
    "cold", "fever", "cough"
]

const mapState = ({ auth, help, userData }) => ({
    auth: auth,
    help: help,
    userData: userData
})

function HelpDesk() {

    const { auth, help, userData } = useSelector(mapState);

    const dispatch = useDispatch();

    const [showHelpDialog, setShowHelpDialog] = useState(false);

    const handleShowHelpDialog = () => {
        setShowHelpDialog(true)
    }

    const handleCloseHelpDialog = () => {
        setShowHelpDialog(false)
    }

    function getBackgroundColor(status) {

        const lowerSt = status.toLowerCase();

        if (lowerSt === 'requirement') {
            return 'orange';
        }
        if (lowerSt === 'emergency') {
            return 'rgba(248, 83, 83, 0.85)';
        }
        if (lowerSt === "fulfilled") {
            return "var(--activeColor)"
        }
        return 'rgb(201, 201, 201)';
    }

    useEffect(() => {

        dispatch(getAllHelps())
            .catch((err) => {
                console.log(err.message)
            })

        return () => { }
    }, [
        dispatch
    ])

    return (
        <div className="container" id="help-desk">

            <div className="row row-padding"
                style={{
                    paddingTop: 20,
                    paddingBottom: 40
                }}>

                <div className="col-xl-8 col-md-10">

                    <div className="title">
                        <span style={{
                            color: "var(--secondColor)"
                        }}>eHealth</span> Portal
                    </div>

                    <AskHelpDialog
                        show={showHelpDialog}
                        handleClose={handleCloseHelpDialog}
                    />

                    <div className="help-desk-area">

                        {
                            (auth.authenticated &&
                                userData.currentUser.is_hospital === false) &&
                            <div style={{
                                paddingTop: 20
                            }}>
                                <button className="rounded-filled-btn"
                                    style={{
                                        padding: 10,
                                        borderRadius: 20,
                                        fontSize: 12,
                                        margin: "auto"
                                    }}
                                    onClick={handleShowHelpDialog}>
                                    Ask for help
                                </button>
                            </div>
                        }

                        {
                            help.fetching &&
                            <div className="loading-area">
                                <LoadingSpinner />
                            </div>
                        }

                        <div className="help-list">

                            {
                                help.fetched &&
                                    (Array.isArray(help.allData) &&
                                        help.allData.length > 0) ?
                                    help.allData.map((item, index) => {

                                        if (item.userInfo.uid === auth.uid ||
                                            userData.currentUser.is_hospital) {
                                            return (
                                                <div key={index}
                                                    className="custom-help-card">

                                                    <div className="content-area">

                                                        <img
                                                            src={Img}
                                                            alt="img"
                                                            width="100%"
                                                            height="auto"
                                                        />

                                                        <div>
                                                            <div className="top-bar">
                                                                <div className="user-name">
                                                                    {item.userInfo.name}
                                                                </div>

                                                                <div className="date">
                                                                    {
                                                                        item.addedAt &&
                                                                        getTimeFormat({
                                                                            timestamp: item.addedAt,
                                                                            timeFormat: 12
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div className="content">
                                                                {item.message}
                                                            </div>

                                                            <div className="location">
                                                                Location : <span style={{
                                                                    fontWeight: 600
                                                                }}>
                                                                    {item.location}
                                                                </span>
                                                            </div>

                                                            <div className="disease">
                                                                Disease : <span style={{
                                                                    fontWeight: 600
                                                                }}>
                                                                    {item.disease}
                                                                </span>
                                                            </div>

                                                            <div className="contact">
                                                                Contact No. : <span style={{
                                                                    fontWeight: 600
                                                                }}>
                                                                    {item.contact}
                                                                </span>
                                                            </div>

                                                            <div className="bottom-bar">

                                                                <div className="status" style={{
                                                                    backgroundColor: getBackgroundColor(item.status)
                                                                }}>
                                                                    {item.status}
                                                                </div>

                                                                {
                                                                    item.bedRequired &&
                                                                    <div className="bed-status">
                                                                        Bed required
                                                                    </div>

                                                                }

                                                                {
                                                                    item.disease &&
                                                                    HomeCurable.includes(item.disease.toLowerCase()) &&
                                                                    <div className="home-curable">
                                                                        Home Curable
                                                                    </div>
                                                                }

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div style={{
                                                    marginTop: 20,
                                                    textAlign: "center",
                                                    fontWeight: 500
                                                }}>
                                                    You did't ask for any help.
                                                </div>
                                            );
                                        }

                                    })
                                    :
                                    null
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default HelpDesk;
