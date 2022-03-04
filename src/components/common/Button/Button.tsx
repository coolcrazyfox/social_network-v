import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

// type of button props. Children in which the name of the button is stored is already described there
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    //red?: boolean
}

const Button: React.FC<SuperButtonPropsType> = (
    {
        className,
        ...restProps // all other props will go to the restProps object, there will also be children
    },
) => {
    const finalClassName = `${className}`;

    return (
        <button
            className={finalClassName}
            {...restProps} // give the button the rest of the props, if any (including children)
        />
    )
}

export default Button;
