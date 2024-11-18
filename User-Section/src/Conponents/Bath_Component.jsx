
import React, { useEffect, useState } from "react";
export const XTextfield = ({ label = "labelTextfield", placeHolder = "hintText", icon, suffixIcon, validation , onValueChange , onClick, inputType = "text"}) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (onValueChange) {
            onValueChange(value);
        }
        if (validation && !validation(value)) {
            setError(errorMessage);
        } else if (validation) {
            setError("");
        }
    };
    return (

        <div className='w-full'>
            <label className="text-gray-700 text-sm font-medium mb-1">{label}</label>
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 mt-1 shadow-sm">
                {icon && <span className="text-gray-400 mr-2">{icon}</span>}
                <input
                    type={inputType}
                    placeholder={placeHolder}
                    className="w-full outline-none text-gray-700"
                    value={inputValue}
                    onChange={handleChange}
                />
                {suffixIcon && <span className="text-gray-400 mr-2"  
           onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick(); 
        }}
                >{suffixIcon}</span>}
               
            </div>

        </div>
    )
}

