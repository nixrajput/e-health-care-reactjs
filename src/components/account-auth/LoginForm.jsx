import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import GoogleLogoImg from '../../assets/google_logo.png';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar as closeSnackbarAction,
    loginUser,
    signInWithGoogle
} from '../../redux/actions';
import LoadingSpinner from '../widgets/LoadingSpinner';

function LoginForm({
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

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle())
            .then(() => {
                history.push('/');
                handleShowSnackbar(
                    "You are logged in successfully.",
                    "success",
                    "google_sign_in_success",
                );
            })
            .catch((err) => {
                handleShowSnackbar(
                    err.message,
                    "error",
                    "google_sign_in_error",
                )
            })
    }

    const handleSubmit = () => {
        if (inputData.email === "" && inputData.email.length <= 0) {
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
        else {
            const _data = {
                email: inputData.email,
                pass: inputData.password
            }

            dispatch(loginUser(_data))
                .then(() => {
                    setInputData({
                        fname: "",
                        lname: "",
                        email: "",
                        phone: "",
                        password: ""
                    });
                    history.push('/');
                    handleShowSnackbar(
                        "You are logged in successfully.",
                        "success",
                        "login_success",
                    );
                }).catch((err) => {
                    handleShowSnackbar(
                        err.message,
                        "error",
                        "login_error"
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
                                Login with <span style={{
                                    color: "var(--activeColor)"
                                }}>eHealth</span> portal
                            </div>

                            <div>

                                <div className="form-item">
                                    <label htmlFor="email">Email *</label>
                                    <input type="email"
                                        placeholder="Your email"
                                        name="email"
                                        required
                                        disabled={auth.authenticating}
                                        value={inputData.email}
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="password">Password *</label>
                                    <input type={showPassword ? "text" : "password"}
                                        placeholder="Your password"
                                        name="password"
                                        required
                                        disabled={auth.authenticating}
                                        value={inputData.password}
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginLeft: 4,
                                    marginTop: 10
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}>
                                        <input style={{
                                            width: 16,
                                            height: 16,
                                        }}
                                            type="checkbox"
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
                                        color: "var(--activeColor)",
                                        fontWeight: 700,
                                        cursor: "pointer"
                                    }}
                                        onClick={
                                            () => handleUserRole(userRoles.FORGOT_PASSWORD)
                                        }
                                    >
                                        Forgot Password?
                                    </div>
                                </div>

                                <button className="rounded-filled-btn"
                                    style={{
                                        width: "100%",
                                        marginTop: 40,
                                    }}
                                    onClick={handleSubmit}>
                                    Login
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
                                    onClick={handleGoogleSignIn}>
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
                                    fontWeight: 600
                                }}>
                                    Not a member yet? <span
                                        style={{
                                            color: "var(--activeColor)",
                                            cursor: "pointer"
                                        }}
                                        onClick={
                                            () => handleUserRole(userRoles.USER_REGISTER)
                                        }
                                    >Register Now</span>
                                </div>

                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default LoginForm;
