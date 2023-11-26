import React, { Fragment, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Controller, useForm } from 'react-hook-form'
import Input from './components/input'
import TextArea from './components/textArea'
import { ajaxUrl } from '../data'

export default function Quote({ token }: { token: string }) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm()

  const onSubmit = async (data: Record<string, string>) => {
    try {
      const formData = new FormData()

      formData.append('nonce', token)

      formData.append('action', 'quote')

      Object.entries(data)
        .filter(([, v]) => Boolean(v))
        .forEach(([k, v]) => {
          formData.append(k, v)
        })

      await fetch(ajaxUrl, {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
      })
    } catch (e: any) {}
  }

  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  const handleOpen = () => setOpen(true)

  useEffect(() => {
    if (open) {
      document.querySelector('body')?.classList.add('overflow-hidden')
    } else {
      document.querySelector('body')?.classList.remove('overflow-hidden')
    }
  }, [open])

  return (
    <Fragment>
      <button className="btn flex items-center gap-2" onClick={handleOpen}>
        <span>Demander un devis</span>
        <svg
          className="fill-white"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      </button>

      {createPortal(
        <div
          tabIndex={-1}
          aria-hidden="true"
          className={`${
            open ? 'z-50' : 'opacity-0 -z-[666]'
          } flex flex-col md:justify-center justify-end items-center fixed top-0 left-0 right-0 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full`}
        >
          <div className="absolute top-0 left-0 h-full w-full z-30 backdrop-blur-sm bg-black/50"></div>
          <div
            className={`relative z-40 w-full max-w-2xl h-[600px] overflow-y-auto ${
              open ? 'animate-up' : 'animate-down'
            }`}
          >
            <div className="relative bg-white lg:rounded-lg rounded-t-lg">
              <div className="flex items-start justify-between p-4 lg:p-5 border-b rounded-md">
                <div>
                  <h3 className="h2 text-xl lg:text-3xl text-primary">
                    Demande de devis
                  </h3>
                  <p>Nous vous recontactons rapidement.</p>
                </div>
                <button
                  onClick={handleClose}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                  data-modal-hide="defaultModal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Fermer</span>
                </button>
              </div>
              <div className="p-4 lg:p-5 space-y-5">
                {isSubmitSuccessful ? (
                  <div
                    className="w-full flex flex-row gap-3 mt-2 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
                    role="alert"
                  >
                    <svg
                      className="fill-current w-10 h-10"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                    </svg>
                    <p>
                      Nous avons bien reçu votre demande et vous contacterons le
                      plus rapidement possible.
                    </p>
                  </div>
                ) : (
                  <form
                    className="block w-full"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        name="fullName"
                        render={({ field }) => (
                          <Input
                            id="fullName"
                            label="Nom et prénom"
                            error={!!errors.fullName}
                            required
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                          validate: {
                            maxLength: (v) =>
                              v.length <= 50 ||
                              "L'adresse e-mail doit être une adresse valide",
                            matchPattern: (v) =>
                              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                v
                              ) ||
                              "L'adresse e-mail doit être une adresse valide",
                          },
                        }}
                        name="email"
                        render={({ field }) => (
                          <Input
                            type="email"
                            label="Email"
                            {...field}
                            error={!!errors.email}
                            {...(errors &&
                              errors.email?.message && {
                                errorMessage: errors.email.message as string,
                              })}
                            required
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="company"
                        render={({ field }) => (
                          <Input
                            id="company"
                            placeholder="Nom de l'entreprise"
                            label="Nom de l'entreprise (Si professionnel)"
                            error={!!errors.company}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                          <Input
                            id="phone"
                            type="number"
                            label="Numéro de téléphone"
                            {...field}
                            error={!!errors.phone}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="address"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <div className="col-span-2">
                            <TextArea
                              id="address"
                              label="Adresse"
                              {...field}
                              error={!!errors.address}
                              required
                            />
                          </div>
                        )}
                      />
                      <Controller
                        control={control}
                        name="city"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            id="city"
                            label="Ville"
                            {...field}
                            error={!!errors.city}
                            required
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="postal_code"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            id="postal_code"
                            type="number"
                            label="Code postal"
                            {...field}
                            error={!!errors.postal_code}
                            required
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="surface"
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            id="surface"
                            type="number"
                            label="Surface en m²"
                            {...field}
                            error={!!errors.surface}
                            required
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="interventions"
                        render={({ field }) => (
                          <Input
                            type="number"
                            id="interventions"
                            label="Interventions souhaitées par semaine"
                            {...field}
                          />
                        )}
                      />{' '}
                    </div>

                    <Controller
                      control={control}
                      name="informations"
                      render={({ field }) => (
                        <TextArea
                          id="informations"
                          rows={5}
                          label="Plus de détails"
                          {...field}
                        />
                      )}
                    />

                    <div className="my-2 flex justify-center w-full">
                      <button
                        type="submit"
                        hidden={isSubmitSuccessful}
                        disabled={isSubmitting}
                        className="btn flex items-center gap-2 btn disabled:bg-slate-400 disabled:pointer-events-none lg:!px-8"
                        onClick={handleOpen}
                      >
                        {isSubmitting && (
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}

                        <span>Envoyer</span>
                        <svg
                          className="fill-white"
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 448 512"
                        >
                          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </Fragment>
  )
}

const el = document.getElementById('quote')!

const token = el.dataset.token as string

const formRoot = createRoot(el)

formRoot.render(<Quote token={token} />)
