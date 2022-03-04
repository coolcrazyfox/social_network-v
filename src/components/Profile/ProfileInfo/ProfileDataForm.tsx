import React, { ComponentType } from "react";
import s from "./ProfileInfo.module.scss";
import { createField, Input, Textarea } from "../../common/FormsControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import { ProfileType } from "../../../redux/reducers/profileReducer";
import inputErrorStyle from "../../common/FormsControls/FormsControls.module.scss";
import Button from "../../common/Button/Button";

export type ProfileDataFormPropsType = {
    profile: ProfileType
}

const ProfileDataForm: ComponentType<ProfileDataFormPropsType & InjectedFormProps<ProfileType, ProfileDataFormPropsType, string>> =
    ({handleSubmit, profile, error}) => {
        return <form onSubmit={handleSubmit} className={s.editFormContainer}>
            <div>
                <div>
                    <Button type={"submit"} className={s.button}>
                        Save info
                    </Button>
                </div>
                {error && <div className={inputErrorStyle.formSummaryError}>
                    {error}
                </div>
                }
                <div className={s.userInfoText}>
                    <span className={s.userInfoText}>Full name: </span>
                    {createField("Full name", "fullName", [], Input, {}, "", "", s.editModeInput)}
                </div>
                <div className={s.flexContainer}>
                    <span className={s.userInfoText}>Looking for a job: </span>
                    <div className={s.editModeInput}>
                        {createField("", "lookingForAJob", [], Input, {type: "checkbox"}, "", "", "")}
                    </div>
                </div>
                <div>
                    <span className={s.userInfoText}>Skills: </span>
                    {createField("Skills", "lookingForAJobDescription", [], Textarea, {}, "", "", s.editModeInput)}
                </div>
                <div>
                    <span className={s.userInfoText}>About me: </span>
                    {createField("About me", "aboutMe", [], Textarea, {}, "", "", s.editModeInput)}
                </div>
            </div>
            <div>
                <span className={s.editModeContacts}>Contacts</span>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key}>
                        {<span className={s.userInfoText}>{key}</span>}: {createField(key, `contacts.${key}`, [], Input, {}, "", "", s.editModeInput)}
                    </div>
                })}
            </div>
        </form>
    }

const ProfileDataFormReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>
({form: "edit-profile"})(ProfileDataForm);

export default ProfileDataFormReduxForm;