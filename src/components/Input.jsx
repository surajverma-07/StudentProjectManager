import React , {forwardRef, useId} from 'react'

// forwardRef is react hook we use when we have one component for input field but we want access of input as thier state individually 
const Input = forwardRef( function Input ({
    label,
    type="text",
    className='',
    ...props 
}, ref ) {
    const id = useId();
   return(
    <div className='w-full '>
        {label && <label className="inline-block mb-1 pl-1 text-orange-600 font-semibold text-xl mx-auto "
                          htmlFor={id}>
              {label}
            </label>}
        <input type={type}
                  className={`px-3 py-2 rounded-lg bg-slate-900 text-slate-100 outline-none focus:bg-slate-700 duration-200 border focus:border-blue-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
                 />    
    </div>
   )
})

export default Input
