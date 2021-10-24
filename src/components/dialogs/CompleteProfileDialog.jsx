import { useState, lazy, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar as closeSnackbarAction,
    updateUserProfile,
    getcurrentUserData
} from '../../redux/actions';

const CustomDialog = lazy(() => import('./CustomDialog'));

const mapState = ({ auth, userData }) => ({
    auth: auth,
    userData: userData
})

function CompleteProfileDialog({
    show,
    handleClose
}) {

    const { auth, userData } = useSelector(mapState);

    const dispatch = useDispatch();
    const showSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

    const [isHospital, setIsHospital] = useState(false);
    const [inputData, setInputData] = useState({
        age: "",
        gender: "",
        designation: "",
        instituteName: "",
        phone: "",
        location: ""
    })

    const handleOnChange = (evt) => {
        const { name, value } = evt.target;

        setInputData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const handleShowSnackbar = (message, variant, key, persist) => {
        showSnackbar({
            message: message,
            options: {
                key: key ? key : uuidv4(),
                variant: variant ? variant : "default",
                action: key => (
                    <button
                        onClick={
                            () => closeSnackbar(key)
                        }>
                        <CloseIcon style={{
                            color: "var(--whiteColor)"
                        }} />
                    </button>
                ),
                persist: persist ? true : false,
            }
        })
    }

    const handleSubmit = () => {
        let _data = {};

        if (isHospital) {
            _data = {
                is_hospital: isHospital,
                age: inputData.age ? inputData.age : "",
                gender: inputData.gender ? inputData.gender : "",
                designation: inputData.designation ? inputData.designation : "",
                instituteName: inputData.instituteName ? inputData.instituteName : "",
                phone: inputData.phone ? inputData.phone : "",
                location: inputData.location ? inputData.location : "",
            }
        }
        else {
            _data = {
                is_hospital: isHospital,
                age: inputData.age ? inputData.age : "",
                gender: inputData.gender ? inputData.gender : "",
                phone: inputData.phone ? inputData.phone : "",
                location: inputData.location ? inputData.location : ""
            }
        }

        dispatch(updateUserProfile(auth.uid, _data))
            .then(async () => {
                handleShowSnackbar(
                    "Profile updated.",
                    "success",
                    "profile_update_success"
                )
                dispatch(getcurrentUserData(auth.uid))
                handleClose()
            })
            .catch((err) => {
                handleShowSnackbar(
                    err.message,
                    "error",
                    "profile_update_error",
                    true
                );
            })

    }

    const dialogBody = (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10
        }}>
            {
                (userData.currentUser.is_hospital === undefined) &&
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start"
                }}>
                    <input type="checkbox"
                        name="isHospital"
                        value="isHospital"
                        checked={isHospital}
                        onChange={
                            () => setIsHospital(!isHospital)
                        }
                    />
                    <label htmlFor="isHospital"
                        style={{
                            marginLeft: 10,
                            fontWeight: 600
                        }}>Are you signing up as a hospital?</label>
                </div>
            }

            {
                isHospital ?
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10
                    }}>
                        {
                            !userData.currentUser.instituteName &&
                            <div className="form-item">
                                <label htmlFor="instituteName">Institute Name *</label>
                                <input type="text"
                                    placeholder="Institute Name"
                                    name="instituteName"
                                    required
                                    disabled={userData.updating}
                                    value={inputData.instituteName}
                                    onChange={handleOnChange}
                                />
                            </div>
                        }

                        {
                            !userData.currentUser.location &&
                            <div className="form-item">
                                <label htmlFor="location">Location *</label>
                                <select name="location"
                                    required
                                    disabled={userData.updating}
                                    value={inputData.location}
                                    onChange={handleOnChange}
                                >

                                    <option value="Select">Select</option>
                                    <option value="Amritsar">Amritsar</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Ludhiana">Ludhiana</option>
                                    <option value="Jalandhar">Jalandhar</option>
                                    <option value="New Delhi">New Delhi</option>

                                </select>
                            </div>
                        }

                        {
                            !userData.currentUser.phone &&
                            <div className="form-item">
                                <label htmlFor="phone">Your Phone *</label>
                                <input type="text"
                                    placeholder="Your Phone"
                                    name="phone"
                                    required
                                    disabled={userData.updating}
                                    value={inputData.phone}
                                    onChange={handleOnChange}
                                />
                            </div>
                        }

                        {
                            !userData.currentUser.designation &&
                            <div className="form-item">
                                <label htmlFor="designation">Your Designation *</label>
                                <input type="text"
                                    placeholder="Your Designation"
                                    name="designation"
                                    required
                                    disabled={userData.updating}
                                    value={inputData.designation}
                                    onChange={handleOnChange}
                                />
                            </div>
                        }

                        {
                            !userData.currentUser.age &&
                            <div className="form-item">
                                <label htmlFor="age">Your Age *</label>
                                <input type="text"
                                    placeholder="Your Age"
                                    name="age"
                                    required
                                    disabled={userData.updating}
                                    value={inputData.age}
                                    onChange={handleOnChange}
                                />
                            </div>
                        }

                        {
                            !userData.currentUser.gender &&
                            <div className="form-item">
                                <label htmlFor="gender">Your Gender *</label>
                                <select name="gender"
                                    required
                                    disabled={userData.updating}
                                    value={inputData.gender}
                                    onChange={handleOnChange}
                                >

                                    <option value="Select">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>

                                </select>
                            </div>
                        }

                    </div>
                    :
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10
                    }}>

                        {
                            !userData.currentUser.age &&
                            <div className="form-item">
                                <label htmlFor="age">Your Age *</label>
                                <input type="text"
                                    placeholder="Your Age"
                                    name="age"
                                    required
                                    disabled={userData.updating}
                                    value={inputData.age}
                                    onChange={handleOnChange}
                                />
                            </div>
                        }

                        {
                            !userData.currentUser.gender &&
                            <div className="form-item">
                                <label htmlFor="gender">Your Gender *</label>
                                <select name="gender"
                                    required
                                    disabled={userData.updating}
                                    value={inputData.gender}
                                    onChange={handleOnChange}
                                >

                                    <option value="Select">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>

                                </select>
                            </div>
                        }

                        {
                            !userData.currentUser.phone &&
                            <div className="form-item">
                                <label htmlFor="phone">Your Phone *</label>
                                <input type="text"
                                    placeholder="Your Phone"
                                    name="phone"
                                    required
                                    disabled={userData.updating}
                                    value={inputData.phone}
                                    onChange={handleOnChange}
                                />
                            </div>
                        }

                        {
                            !userData.currentUser.location &&
                            <div className="form-item">
                                <label htmlFor="location">Location *</label>
                                <select name="location"
                                    required
                                    disabled={userData.updating}
                                    value={inputData.location}
                                    onChange={handleOnChange}
                                >

                                    <option value="Select">Select</option>
                                    <option value="Amritsar">Amritsar</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Ludhiana">Ludhiana</option>
                                    <option value="Jalandhar">Jalandhar</option>
                                    <option value="New Delhi">New Delhi</option>

                                </select>
                            </div>
                        }

                    </div>
            }


        </div>
    )

    const dialogActions = (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }}>

            <button
                className="rounded-filled-btn"
                style={{
                    padding: "0.5rem 1rem",
                    margin: "1rem"
                }}
                disabled={userData.updating}
                onClick={handleSubmit}
            >
                Save
            </button>

        </div>
    )

    useEffect(() => {
        if (userData.fetched) {
            const data = userData.currentUser;

            if (data.is_hospital) {
                setIsHospital(true)
                setInputData({
                    age: data.age ? data.age : "",
                    gender: data.gender ? data.gender : "",
                    designation: data.designation ? data.designation : "",
                    instituteName: data.instituteName ? data.instituteName : "",
                    phone: data.phone ? data.phone : "",
                    location: data.location ? data.location : "",
                    totalBed: data.bedStatus ? data.bedStatus.total : "",
                    availableBed: data.bedStatus ? data.bedStatus.available : ""
                })
            }
            else {
                setIsHospital(false)
                setInputData({
                    age: data.age ? data.age : "",
                    gender: data.gender ? data.gender : "",
                    phone: data.phone ? data.phone : "",
                    location: data.location ? data.location : ""
                })
            }
        }
        return () => { }
    }, [
        userData.fetched, userData.currentUser
    ])

    return (
        <div>

            <CustomDialog
                show={show}
                handleClose={handleClose}
                body={dialogBody}
                actions={dialogActions}
                title={"Complete your profile"}
                isLoading={userData.updating}
            />

        </div>
    )
}

export default CompleteProfileDialog;
