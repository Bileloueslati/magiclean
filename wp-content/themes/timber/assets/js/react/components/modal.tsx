import React, { Fragment, useEffect, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';


type Props = PropsWithChildren & {

     open: boolean;
     handler(value: boolean): void;
     title: string;
     subtitle?: string;
}

export default function Modal({open, handler, children, title, subtitle}: Props) {

    const handleClose = () => handler(false);

    useEffect(() => {

        if(open) {

            document.querySelector("body")?.classList.add("overflow-hidden")
        } else {

            document.querySelector("body")?.classList.remove("overflow-hidden")
        }


    }, [open])

  return (
    <Fragment>



    {createPortal(
    <div tabIndex={-1} aria-hidden="true" className={`${open ? 'z-50' : 'opacity-0 -z-[666]'} flex flex-col justify-center items-center fixed top-0 left-0 right-0 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full`}>
    <div className="absolute top-0 left-0 h-full w-full z-30 backdrop-blur-sm bg-black/50"></div>
    <div className={`relative z-40 max-w-[95%] lg:max-w-2xl max-h-full ${open ? "animate-up": "animate-down"}`}>
        <div className="relative bg-white rounded-lg shadoW">
            <div className="flex items-start justify-between p-4 lg:p-5 border-b rounded-md">
                <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-primary">
                    {title}
                </h3>
                {subtitle && <p>{subtitle}</p>}
                </div>
                <button onClick={handleClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Fermer</span>
                </button>
            </div>
            <div className="px-4 lg:px-5 py-3">
                {children}

                
            </div>
           
        </div>
    </div>
</div>, document.body)}



    </Fragment>
  )
}

