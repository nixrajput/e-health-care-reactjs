import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    getCurrentUser,
    getcurrentUserData,
    checkIsProfileCompleteStepOne,
    checkIsProfileCompleteStepTwo
} from '../../redux/actions';

const Header = lazy(() => import("../header/Header"));
const Routes = lazy(() => import('../routes/Routes'));
const Footer = lazy(() => import("../footer/Footer"));
const Notifier = lazy(() => import('../widgets/Notifier'));

const CompleteProfileDialog = lazy(() => import('../dialogs/CompleteProfileDialog'));

const mapState = ({ auth, userData }) => ({
    auth: auth,
    userData: userData
})

function MainPage() {

    const { auth, userData } = useSelector(mapState);

    const dispatch = useDispatch();

    const [showProfileDialog, setShowProfileDialog] = useState(false);

    const handleShowDialog = () => {
        setShowProfileDialog(true);
    }

    const handleCloseDialog = () => {
        setShowProfileDialog(false);
    }

    useEffect(() => {

        dispatch(getCurrentUser())
            .catch((err) => {
                console.log(err.message)
            })

        if (auth.authenticated && auth.uid !== null) {
            dispatch(getcurrentUserData(auth.uid))
                .catch((err) => {
                    console.log(err.message)
                })

            dispatch(checkIsProfileCompleteStepOne(auth.uid))
                .then(() => {
                    if (userData.checkedProfileStepOne === true) {
                        if (userData.isProfileCompleteStepOne === false) {
                            handleShowDialog()
                        }
                    }
                })
                .catch((err) => {
                    console.log(err.message)
                })

            if (userData.isProfileCompleteStepOne === true) {
                dispatch(checkIsProfileCompleteStepTwo(auth.uid))
                    .then(() => {
                        if (userData.checkedProfileStepTwo === true) {
                            if (userData.isProfileCompleteStepTwo === false) {
                                handleShowDialog()
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err.message)
                    })
            }

        }

        return () => { }
    }, [
        dispatch, auth.authenticated, auth.uid,
        userData.checkedProfileStepOne, userData.checkedProfileStepTwo,
        userData.isProfileCompleteStepOne, userData.isProfileCompleteStepTwo
    ])

    return (
        <div>

            <CompleteProfileDialog
                show={showProfileDialog}
                handleClose={handleCloseDialog}
            />

            <Header />

            <Notifier />

            <div style={{ height: 0 }} id="back-to-top-anchor" />

            <Routes />

            <Footer />

        </div>
    )
}

export default MainPage;
