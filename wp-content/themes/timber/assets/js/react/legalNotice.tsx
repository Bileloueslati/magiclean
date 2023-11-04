import { createRoot } from "react-dom/client";
import React, { useState } from 'react';
import Modal from "./components/modal";

type Props = {
    html: string
}

const LegalNotice = ({html}: Props) => {

    const parsedData = JSON.parse(html)
    
    const [open, setOpen] = useState(false)

    const handleClick = () => setOpen(true)

    return (

        <>
        <button onClick={handleClick} role="button" className="hover:text-secondary">Mentions légales</button>
        <Modal open={open} handler={setOpen} title="Mentions légales">
            <div dangerouslySetInnerHTML={{__html: parsedData}} />
        </Modal>
        </>
    )
}


const el = document.getElementById("legal_notice")!;

const root = createRoot(el);

const {html} = el.dataset

root.render(<LegalNotice html={html!} />);