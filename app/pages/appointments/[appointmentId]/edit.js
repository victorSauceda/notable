import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAppointment from "app/appointments/queries/getAppointment"
import updateAppointment from "app/appointments/mutations/updateAppointment"
import { AppointmentForm, FORM_ERROR } from "app/appointments/components/AppointmentForm"
export const EditAppointment = () => {
  const router = useRouter()
  const appointmentId = useParam("appointmentId", "number")
  const [appointment, { setQueryData }] = useQuery(
    getAppointment,
    {
      id: appointmentId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateAppointmentMutation] = useMutation(updateAppointment)
  return (
    <>
      <Head>
        <title>Edit Appointment {appointment.id}</title>
      </Head>

      <div>
        <h1>Edit Appointment {appointment.id}</h1>
        <pre>{JSON.stringify(appointment, null, 2)}</pre>

        <AppointmentForm
          submitText="Update Appointment" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateAppointment}
          initialValues={appointment}
          onSubmit={async (values) => {
            try {
              const updated = await updateAppointmentMutation({
                id: appointment.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowAppointmentPage({
                  appointmentId: updated.id,
                })
              )
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditAppointmentPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAppointment />
      </Suspense>

      <p>
        <Link href={Routes.AppointmentsPage()}>
          <a>Appointments</a>
        </Link>
      </p>
    </div>
  )
}

EditAppointmentPage.authenticate = true

EditAppointmentPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditAppointmentPage
