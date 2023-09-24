import React, { InputHTMLAttributes, forwardRef } from "react";

type Props = Partial<InputHTMLAttributes<HTMLInputElement>> & {
     label: string;
     type?: string;
     required?: boolean;
     error?: boolean;
     errorMessage?: string;
     placeholder?: string;
}

const Input = forwardRef(({label, type = "text", errorMessage, placeholder, error = false, required = false, id , ...rest }: Props, ref: any) => {

     return (
    <div>
    <label htmlFor={id || label} className="block mb-2 text-sm font-medium text-gray-900">{label} { required && <span className="text-red-500">*</span> }</label>
    <input 
    ref={ref} 
    type={type} 
    id={id || label} 
    className={`bg-gray-50 border ${error ? 'border-red-600' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-gray-500 block outline-none w-full p-2.5`}
    placeholder={placeholder || label}
    {...rest}  />
    { error && errorMessage && <span className="text-xs text-red-600 block mt-1">{errorMessage}</span>}
    </div>
     )
})



export default Input;