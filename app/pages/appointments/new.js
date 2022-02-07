import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createAppointment from "app/appointments/mutations/createAppointment"
import { AppointmentForm, FORM_ERROR } from "app/appointments/components/AppointmentForm"

const NewAppointmentPage = () => {
  const router = useRouter()
  const [createAppointmentMutation] = useMutation(createAppointment)
  return (
    <div>
      <h1>Create New Appointment</h1>

      <AppointmentForm
        submitText="Create Appointment" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateAppointment}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const appointment = await createAppointmentMutation(values)
            router.push(
              Routes.ShowAppointmentPage({
                appointmentId: appointment.id,
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

      <p>
        <Link href={Routes.AppointmentsPage()}>
          <a>Appointments</a>
        </Link>
      </p>
    </div>
  )
}

NewAppointmentPage.authenticate = true

NewAppointmentPage.getLayout = (page) => <Layout title={"Create New Appointment"}>{page}</Layout>

export default NewAppointmentPage
