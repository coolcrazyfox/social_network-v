import React from "react";
import s from "./FormsControls.module.scss"
import { Field } from "redux-form";

export const FormControl: React.FC<any> = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={hasError ? s.formControlError : ""}>
            <div>
                {props.children}
            </div>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props: any) => {
    const {input, meta, children, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField = (placeholder: string = "", name: string, validators: Array<any>, component: any,
    props = {}, text: string = "", wrapperClass: any, fieldClass: any) => (
    <div className={wrapperClass}>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               {...props}
               className={fieldClass}
        />
        {text}
    </div>
)