import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAppointments from "app/appointments/queries/getAppointments"
const ITEMS_PER_PAGE = 100
export const AppointmentsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ appointments, hasMore }] = usePaginatedQuery(getAppointments, {
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () =>
    router.push({
      query: {
        page: page - 1,
      },
    })

  const goToNextPage = () =>
    router.push({
      query: {
        page: page + 1,
      },
    })

  return (
    <div>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <Link
              href={Routes.ShowAppointmentPage({
                appointmentId: appointment.id,
              })}
            >
              <a>{appointment.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const AppointmentsPage = () => {
  return (
    <>
      <Head>
        <title>Appointments</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewAppointmentPage()}>
            <a>Create Appointment</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AppointmentsList />
        </Suspense>
      </div>
    </>
  )
}

AppointmentsPage.authenticate = true

AppointmentsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AppointmentsPage
