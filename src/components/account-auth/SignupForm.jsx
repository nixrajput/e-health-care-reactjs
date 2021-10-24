import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import GoogleLogoImg from '../../assets/google_logo.png';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar as closeSnackbarAction,
    registerUser, logoutUser,
    signUpWithGoogle
} from '../../redux/actions';
import LoadingSpinner from '../widgets/LoadingSpinner';

function SignupForm({
    auth,
    inputData,
    handleOnChange,
    handleUserRole,
    userRoles,
    setInputData
}) {

    const history = useHistory();

    const dispatch = useDispatch();
    const showSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

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

    const handleGoogleSignUp = () => {
        dispatch(signUpWithGoogle())
            .then(() => {
                history.push('/');
                handleShowSnackbar(
                    "You are logged in successfully.",
                    "success",
                    "google_sign_up_success",
                );
            })
            .catch((err) => {
                handleShowSnackbar(
                    err.message,
                    "error",
                    "google_sign_up_error",
                )
            })
    }

    const handleSubmit = () => {
        if (inputData.name === "" && inputData.name.length <= 0) {
            handleShowSnackbar(
                "First name field is required.",
                "warning",
                "fname_field_error"
            )
        }
        else if (inputData.email === "" && inputData.email.length <= 0) {
            handleShowSnackbar(
                "Email field is required.",
                "warning",
                "email_field_error"
            )
        }
        else if (inputData.email !== "" && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputData.email)) {
            handleShowSnackbar(
                "Email address is invalid.",
                "warning",
                "email_field_error"
            )
        }
        else if (inputData.phone === "" && inputData.phone.length <= 0) {
            handleShowSnackbar(
                "Phone field is required.",
                "warning",
                "phone_field_error"
            )
        }
        else if (inputData.phone !== "" && inputData.phone.length < 10) {
            handleShowSnackbar(
                "Phone number is invalid. Phone number must be at least 10 digits.",
                "warning",
                "phone_field_error"
            )
        }
        else if (inputData.phone !== "" && !/^\d+$/.test(inputData.phone)) {
            handleShowSnackbar(
                "Phone field is invalid.",
                "warning",
                "phone_field_error"
            )
        }
        else if (inputData.password === "" && inputData.password.length <= 0) {
            handleShowSnackbar(
                "Password field is required.",
                "warning",
                "password_field_error"
            )
        }
        else if (inputData.password !== "" && inputData.password.length < 8) {
            handleShowSnackbar(
                "Password length must be at least 8 characters.",
                "warning",
                "password_field_error"
            )
        }
        else if (!agreeTerms) {
            handleShowSnackbar(
                "You must agree to our Privacy Policy and Terms of Use before creating an account.",
                "warning",
                "agree_field_error"
            )
        }
        else {
            const _data = {
                fname: inputData.fname,
                lname: inputData.lname,
                email: inputData.email,
                phone: inputData.phone,
                pass: inputData.password
            }

            dispatch(registerUser(_data))
                .then(() => {
                    if (auth.authenticated) {
                        dispatch(logoutUser());
                    }
                    setInputData({
                        name: "",
                        email: "",
                        phone: "",
                        password: ""
                    });
                    setAgreeTerms(false);
                    setShowPassword(false);
                    handleUserRole(userRoles.USER_LOGIN);
                    handleShowSnackbar(
                        "Account created successfully.",
                        "success",
                        "register_success",
                        true
                    );
                    handleShowSnackbar(
                        "A verification email has been sent to your email associated with this account. Check your email and verify your account to login.",
                        "success",
                        "ver_email_sent",
                        true
                    );
                }).catch((err) => {
                    handleShowSnackbar(
                        err.message,
                        "error",
                        "signup_error"
                    );
                });
        }
    }

    return (
        <div className="form-card">
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>

                {
                    (auth.authenticating || auth.creating) ?
                        <div>
                            <LoadingSpinner />
                        </div> :
                        <div style={{
                            width: "100%"
                        }}>
                            <div style={{
                                fontSize: "20px",
                                fontWeight: "700",
                                textAlign: "center",
                                marginBottom: 30
                            }}>
                                Register with <span style={{
                                    color: "var(--activeColor)"
                                }}>eHealth</span> portal
                            </div>

                            <div>

                                <div className="form-item">
                                    <label htmlFor="name">Full Name *</label>
                                    <input type="text"
                                        placeholder="Full name"
                                        name="name"
                                        required
                                        disabled={auth.creating}
                                        value={inputData.name}
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="email">Email *</label>
                                    <input type="email"
                                        placeholder="Your email"
                                        name="email"
                                        required
                                        disabled={auth.creating}
                                        value={inputData.email}
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="phone">Phone *</label>
                                    <input type="text"
                                        placeholder="Phone"
                                        name="phone"
                                        required
                                        disabled={auth.creating}
                                        value={inputData.phone}
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="password">Password *</label>
                                    <input type={showPassword ? "text" : "password"}
                                        placeholder="Your password"
                                        name="password"
                                        required
                                        disabled={auth.creating}
                                        value={inputData.password}
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "start",
                                    marginLeft: 4,
                                    marginTop: 10
                                }}>
                                    <input type="checkbox"
                                        name="showPassword"
                                        value="showPassword"
                                        checked={showPassword}
                                        onChange={
                                            () => setShowPassword(!showPassword)
                                        }
                                    />
                                    <label htmlFor="showPassword"
                                        style={{
                                            marginLeft: 8,
                                            fontSize: 14,
                                            fontWeight: 600
                                        }}>Show Password</label>
                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    marginLeft: 4,
                                    marginTop: 10
                                }}>
                                    <input style={{
                                        marginTop: 4
                                    }}
                                        type="checkbox"
                                        name="agreeTerms"
                                        value="agreeTerms"
                                        checked={agreeTerms}
                                        onChange={
                                            () => setAgreeTerms(!agreeTerms)
                                        }
                                    />
                                    <label htmlFor="agreeTerms"
                                        style={{
                                            marginLeft: 8,
                                            fontSize: 14,
                                            fontWeight: 600
                                        }}>I confirm that I have read NixLab's Privacy Policy & Terms of Use and agree to all of their terms.</label>
                                </div>

                                <button className="rounded-filled-btn"
                                    style={{
                                        width: "100%",
                                        marginTop: 30
                                    }}
                                    onClick={handleSubmit}>
                                    Register
                                </button>

                                <button className="rounded-outlined-btn"
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        marginTop: 30,
                                    }}
                                    onClick={handleGoogleSignUp}>
                                    <img style={{
                                        width: 20,
                                        height: 20,
                                        aspectRatio: "1"
                                    }}
                                        src={GoogleLogoImg}
                                        alt="google-logo"
                                        width="100%"
                                        height="auto"
                                        loading="lazy"
                                    />

                                    <div style={{
                                        marginLeft: 10
                                    }}>
                                        Continue with Google
                                    </div>
                                </button>

                                <div style={{
                                    marginTop: 20,
                                    textAlign: "center",
                                    fontWeight: 600,
                                }}>
                                    Already a member? <span
                                        style={{
                                            color: "var(--activeColor)",
                                            cursor: "pointer"
                                        }}
                                        onClick={
                                            () => handleUserRole(userRoles.USER_LOGIN)
                                        }>Login Now</span>
                                </div>

                            </div>
                        </div>
                }


            </div>
        </div>
    )
}

export default SignupForm;
