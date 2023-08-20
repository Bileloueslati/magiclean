import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client';
import Modal from './components/modal';

export default function Rgbd() {

    const [accepted, toggle] = useState(true);

    const [modalState, handler] = useState(false);

    const close = () => {

        handleAccepted();

        handler(false);
    }

    const handleAccepted = () => {

        toggle(true);

        localStorage.setItem("rgbd", "true");
    };


    useEffect(() => {

        const isAlreadyAccepted = window.localStorage.getItem("rgbd");

        if(!isAlreadyAccepted) {

            toggle(false)
        }

    }, [])



    
  return (
    <>
     <div hidden={accepted} className='animate-up w-full flex flex-col items-center lg:flex-row gap-1 lg:gap-4 z-50 justify-center fixed bottom-0 left-0 bg-primary text-white text-center py-3 px-3'>
     <p className='text-sm'>En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de Cookies qui garantissent son bon fonctionnement</p>
     <div className='flex flex-row gap-2'>
     <button className='px-3 py-1 bg-white rounded-full text-primary text-sm font-semibold' onClick={handleAccepted}>Accepter</button>
     <button onClick={() => handler(true)} className='px-3 py-1 border rounded-full text-white text-sm'>En savoir plus</button>
     </div>

    </div>

    <Modal open={modalState} handler={handler} title="Les cookies Google Analytics">
        <p>Ce site utilise des cookies de Google Analytics, ces cookies nous aident à identifier le contenu qui vous interesse le plus ainsi qu'à repérer certains dysfonctionnements. Vos données de navigations sur ce site sont envoyées à Google Inc</p>
         <div className="flex flex-row gap-4 justify-center my-3">
            <button onClick={close} className='btn'>Accepter</button>
            <button onClick={close}>S'opposer</button>
         </div>

    </Modal>
    
    </>
    
   
  )
}


const root = createRoot(document.getElementById("rgbd")!);

root.render(<Rgbd />)