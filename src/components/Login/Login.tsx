import React from "react"
import s from "./Login.module.scss"
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validator";
import { login } from "../../redux/reducers/authReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootStateType } from "../../redux/reduxStore";
import inputErrorStyle from "../common/FormsControls/FormsControls.module.scss"
import Button from "../common/Button/Button";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormPropsType = {
    captchaUrl: null | string
}

const maxLength100 = maxLengthCreator(100);

const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormPropsType> & LoginFormPropsType> = ({
    handleSubmit,
    error,
    captchaUrl,
}) => {
    return (
        <form onSubmit={handleSubmit}
              className={s.formContainer}
        >
            {createField("Email", "email", [required], Input, {}, "", s.field, s.input)}
            {createField("Password", "password", [required, maxLength100], Input, {}, "", s.field, s.input)}
            {createField("Password", "rememberMe", [], Input, {type: "checkbox"}, "Remember me", s.field, "")}

            {captchaUrl && <div>
                <div>
                    <img src={captchaUrl} alt="Captcha"/>
                </div>
            </div>}
            {captchaUrl && createField("Symbols from image", "captcha", [required], Input, {}, "", s.field, s.input)}

            {error && <div className={inputErrorStyle.formSummaryError}>
                {error}
            </div>
            }
            <div className={s.field}>
                <Button type={"submit"} className={s.button}>
                    Submit
                </Button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({form: "login"})(LoginForm);

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    isAuth: boolean
    captchaUrl: null | string
}

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div className={s.container}>
        <div className={s.textContainer}>
            <p className={s.text}>To log in get registered <a href="https://social-network.samuraijs.com/"
                                                              target="_blank">here</a></p>
            <p className={s.text}>Or use common test account credentials:</p>
            <p className={s.text}>Email: free@samuraijs.com</p>
            <p className={s.text}>Password: free</p>
        </div>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, {login})(Login);