import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAppointment from "app/appointments/queries/getAppointment"
import deleteAppointment from "app/appointments/mutations/deleteAppointment"
export const Appointment = () => {
  const router = useRouter()
  const appointmentId = useParam("appointmentId", "number")
  const [deleteAppointmentMutation] = useMutation(deleteAppointment)
  const [appointment] = useQuery(getAppointment, {
    id: appointmentId,
  })
  return (
    <>
      <Head>
        <title>Appointment {appointment.id}</title>
      </Head>

      <div>
        <h1>Appointment {appointment.id}</h1>
        <pre>{JSON.stringify(appointment, null, 2)}</pre>

        <Link
          href={Routes.EditAppointmentPage({
            appointmentId: appointment.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteAppointmentMutation({
                id: appointment.id,
              })
              router.push(Routes.AppointmentsPage())
            }
          }}
          style={{
            marginLeft: "0.5rem",
          }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowAppointmentPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.AppointmentsPage()}>
          <a>Appointments</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Appointment />
      </Suspense>
    </div>
  )
}

ShowAppointmentPage.authenticate = true

ShowAppointmentPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowAppointmentPage
