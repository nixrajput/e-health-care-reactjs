import './AuthPage.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';

const UserRoles = {
    USER_LOGIN: "USER_LOGIN",
    USER_REGISTER: "USER_REGISTER",
    FORGOT_PASSWORD: "FORGOT_PASSWORD"
}

const mapState = ({ auth }) => ({
    auth: auth
})

function AuthPage() {

    const { auth } = useSelector(mapState);

    const [userRole, setUserRole] = useState(UserRoles.USER_LOGIN);
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
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

    const handleUserRole = (role) => {
        setUserRole(role);
    }

    useEffect(() => {
        const anchor = document.querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return () => { }

    }, [])

    return (
        <div className="page-container" id="auth-page">

            <div className="row" style={{
                paddingTop: 20,
                paddingBottom: 100,
                justifyContent: "center"
            }}>

                <div className="col-xl-10 col-md-12">

                    <div className="form-area">

                        {(() => {
                            switch (userRole) {
                                case UserRoles.USER_LOGIN:
                                    return (
                                        <LoginForm
                                            auth={auth}
                                            inputData={inputData}
                                            setInputData={setInputData}
                                            handleOnChange={handleOnChange}
                                            userRoles={UserRoles}
                                            handleUserRole={handleUserRole}
                                        />
                                    )

                                case UserRoles.USER_REGISTER:
                                    return (
                                        <SignupForm
                                            auth={auth}
                                            inputData={inputData}
                                            setInputData={setInputData}
                                            handleOnChange={handleOnChange}
                                            userRoles={UserRoles}
                                            handleUserRole={handleUserRole}
                                        />
                                    )

                                case UserRoles.FORGOT_PASSWORD:
                                    return (
                                        <ForgotPasswordForm
                                            auth={auth}
                                            inputData={inputData}
                                            setInputData={setInputData}
                                            handleOnChange={handleOnChange}
                                            userRoles={UserRoles}
                                            handleUserRole={handleUserRole}
                                        />
                                    )

                                default:
                                    break;
                            }
                        })()}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AuthPage;
