import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDoctor from "app/doctors/queries/getDoctor"
import deleteDoctor from "app/doctors/mutations/deleteDoctor"
export const Doctor = () => {
  const router = useRouter()
  const doctorId = useParam("doctorId", "number")
  const [deleteDoctorMutation] = useMutation(deleteDoctor)
  const [doctor] = useQuery(getDoctor, {
    id: doctorId,
  })
  return (
    <>
      <Head>
        <title>Doctor {doctor.id}</title>
      </Head>

      <div>
        <h1>Doctor {doctor.id}</h1>
        <pre>{JSON.stringify(doctor, null, 2)}</pre>

        <Link
          href={Routes.EditDoctorPage({
            doctorId: doctor.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteDoctorMutation({
                id: doctor.id,
              })
              router.push(Routes.DoctorsPage())
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

const ShowDoctorPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.DoctorsPage()}>
          <a>Doctors</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Doctor />
      </Suspense>
    </div>
  )
}

ShowDoctorPage.authenticate = true

ShowDoctorPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowDoctorPage
