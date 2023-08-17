import React, { InputHTMLAttributes, forwardRef } from "react";

type Props = Partial<InputHTMLAttributes<HTMLTextAreaElement>> & {
     label: string;
     rows?: number;
     error?: boolean
}

const TextArea = forwardRef(({label, error = false, required = false, id, ...rest }: Props, ref: any) => {
     return (
    <div>
    <label htmlFor={id || label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label} { required && <span className="text-red-500">*</span> }</label>
    <textarea
    ref={ref} 
    id={id || label} 
    className={`bg-gray-50 border ${error ? 'border-red-600' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-gray-500 block outline-none w-full p-2.5`}
    placeholder={label} 
    {...rest}  />
    </div>
     )
})



export default TextArea;