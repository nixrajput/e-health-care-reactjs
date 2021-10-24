import { lazy, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar as closeSnackbarAction,
    createHelpQuestion
} from '../../redux/actions';

const CustomDialog = lazy(() => import('../dialogs/CustomDialog'));

const mapState = ({ auth, userData, help }) => ({
    auth: auth,
    userData: userData,
    help: help
})

function AskHelpDialog({
    show,
    handleClose
}) {

    const { auth, help, userData } = useSelector(mapState);

    const dispatch = useDispatch();
    const showSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

    const [bedRequired, setBedRequired] = useState(false);
    const [inputData, setInputData] = useState({
        message: "",
        location: "",
        disease: "",
        contact: "",
        status: ""
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
        if (inputData.message === "" && inputData.message.length <= 0) {
            handleShowSnackbar(
                "Message can't be empty.",
                "warning",
                "message_field_error"
            )
        }
        else if (inputData.disease === "" && inputData.disease.length <= 0) {
            handleShowSnackbar(
                "Disease can't be empty.",
                "warning",
                "disease_field_error"
            )
        }
        else if (inputData.location === "" && inputData.location.length <= 0) {
            handleShowSnackbar(
                "Location is required.",
                "warning",
                "location_field_error"
            )
        }
        else if (inputData.location !== "" && inputData.location === "Select") {
            handleShowSnackbar(
                "Location is required.",
                "warning",
                "location_field_error"
            )
        }
        else {
            const _data = {
                message: inputData.message,
                location: inputData.location,
                disease: inputData.disease,
                contact: inputData.contact === "" ? userData.currentUser.phone : inputData.contact,
                bedRequired: bedRequired,
                status: inputData.status
            }

            dispatch(createHelpQuestion(_data, auth.uid))
                .then(() => {
                    setInputData({
                        message: "",
                        location: "",
                        disease: "",
                        contact: "",
                        status: ""
                    })
                    setBedRequired(false)
                    handleShowSnackbar(
                        "Posted successfully.",
                        "success",
                        "post_success",
                    )
                    handleClose()
                }).catch((err) => {
                    handleShowSnackbar(
                        err.message,
                        "error",
                        "post_error"
                    );
                });
        }
    }

    const dialogBody = (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start"
        }}>

            <div className="form-item">
                <textarea type="text"
                    placeholder="Write for your help..."
                    name="message"
                    maxLength={200}
                    disabled={help.adding}
                    value={inputData.message}
                    onChange={handleOnChange}
                />
                <div className="char-count">
                    {inputData.message.length}/200
                </div>
            </div>

            <div className="form-item">
                <label htmlFor="disease">Disease *</label>
                <input type="text"
                    placeholder="Disease Name"
                    name="disease"
                    required
                    disabled={help.adding}
                    value={inputData.disease}
                    onChange={handleOnChange}
                />
            </div>

            <div className="form-item">
                <label htmlFor="contact">Contact No. *</label>
                <input type="text"
                    placeholder="Contact No."
                    name="contact"
                    required
                    disabled={help.adding}
                    value={inputData.contact}
                    onChange={handleOnChange}
                />
            </div>

            <div className="form-item">
                <label htmlFor="location">Location *</label>
                <select name="location"
                    required
                    disabled={help.adding}
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

            <div className="form-item">
                <label htmlFor="status">Status *</label>
                <select name="status"
                    required
                    disabled={help.adding}
                    value={inputData.status}
                    onChange={handleOnChange}
                >

                    <option value="Select">Select</option>
                    <option value="Requirement">Requirement</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Fulfilled">Fulfilled</option>

                </select>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 2
            }}>
                <input type="checkbox"
                    name="isHospital"
                    value="isHospital"
                    disabled={help.adding}
                    checked={bedRequired}
                    onChange={
                        () => setBedRequired(!bedRequired)
                    }
                />
                <label htmlFor="isHospital"
                    style={{
                        marginLeft: 10,
                        fontSize: 14,
                        fontWeight: 600
                    }}>Bed required for patient?</label>
            </div>

        </div>
    )

    const dialogActions = (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }}>

            {
                inputData.message.length > 0 &&
                <button className="rounded-filled-btn"
                    style={{
                        padding: "10px 20px",
                        margin: "1rem"
                    }}
                    onClick={handleSubmit}>
                    Post
                </button>
            }

        </div>
    )

    return (
        <div>

            <CustomDialog
                show={show}
                handleClose={handleClose}
                title={"Ask for help"}
                body={dialogBody}
                actions={dialogActions}
                isLoading={help.adding}
            />

        </div>
    )
}

export default AskHelpDialog;
