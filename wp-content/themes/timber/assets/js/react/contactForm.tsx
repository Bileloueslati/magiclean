import React from "react";
import { createRoot } from "react-dom/client";
import Input from "./components/input";
import { useForm, Controller } from "react-hook-form";
import TextArea from "./components/textArea";
import { ajaxUrl } from "../data";

const ContactForm = ({token}: {token: string}) => {

    const {handleSubmit, control, formState: {isSubmitting, isSubmitSuccessful, errors}} = useForm();

    const onSubmit = async (data: Record<string, string>) => {
          
    try {

      const formData = new FormData();

      formData.append('nonce', token);
        
      formData.append("action", "contact");

      Object.entries(data).filter(([, v]) => Boolean(v)).forEach(([k, v]) => {
        
       formData.append(k, v);
         
      })

      await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
        credentials: 'same-origin',
      });
    } catch(e: any) {}
    
         
    }

    return (
        
       <>
       <form className="my-5 block w-full" onSubmit={handleSubmit(onSubmit)}>

<div className="grid gap-6 mb-6 md:grid-cols-2">

<Controller
control={control}
rules={{required: true}}
name="lastName"
render={({field}) => (
<Input id="lastName" label="Nom" error={!!errors.lastName} required {...field} />
)}

/>


<Controller
control={control}
name="firstName"
rules={{required: true}}
render={({field}) => (
<Input label="Prénom" {...field} error={!!errors.firstName} required />
)}

/>


<Controller
control={control}
rules={{required: true, 
  validate: {
  maxLength: (v) =>
    v.length <= 50 || "L'adresse e-mail doit être une adresse valide",
  matchPattern: (v) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    "L'adresse e-mail doit être une adresse valide",
},}}
name="email"

render={({field}) => (
<Input type="email" label="Email" {...field}  error={!!errors.email} 
{...(errors && errors.email?.message) && {
   errorMessage: errors.email.message as string
}} required />
)}

/>


<Controller
control={control}
name="phone"
render={({field}) => (
<Input id="phone" type="number" label="Numéro de téléphone" {...field} error={!!errors.phone} />
)}

/>
</div>

<Controller
 rules={{required: true}}
control={control}
name="message"
render={({field}) => (
<TextArea rows={5} label="Votre message" error={!!errors.message} required {...field} />

)}

/>


<div className="block">
<div className="inline-block float-right mt-3">

<button hidden={isSubmitSuccessful} disabled={isSubmitting} className="btn flex items-center gap-2 btn disabled:bg-slate-400 disabled:pointer-events-none lg:!px-8">
        {
            isSubmitting && 
          (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
          )
        }
       
        <span>Envoyer</span>
        <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
   
        </button>  

</div>
</div>

 </form>

 {
    isSubmitSuccessful && <div className="w-full flex flex-row gap-3 mt-2 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">  
    <svg className="fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
     <p>Nous avons bien reçu votre message et vous contacterons le plus rapidement possible.</p>
   </div>
 }

       </>
    )
}

const el = document.getElementById("contact_form")!;

const token = el.dataset.token as string;

const formRoot = createRoot(el);

formRoot.render(<ContactForm token={token} />);

