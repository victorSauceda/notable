import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDoctor from "app/doctors/queries/getDoctor"
import updateDoctor from "app/doctors/mutations/updateDoctor"
import { DoctorForm, FORM_ERROR } from "app/doctors/components/DoctorForm"
export const EditDoctor = () => {
  const router = useRouter()
  const doctorId = useParam("doctorId", "number")
  const [doctor, { setQueryData }] = useQuery(
    getDoctor,
    {
      id: doctorId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateDoctorMutation] = useMutation(updateDoctor)
  return (
    <>
      <Head>
        <title>Edit Doctor {doctor.id}</title>
      </Head>

      <div>
        <h1>Edit Doctor {doctor.id}</h1>
        <pre>{JSON.stringify(doctor, null, 2)}</pre>

        <DoctorForm
          submitText="Update Doctor" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateDoctor}
          initialValues={doctor}
          onSubmit={async (values) => {
            try {
              const updated = await updateDoctorMutation({
                id: doctor.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowDoctorPage({
                  doctorId: updated.id,
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

const EditDoctorPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditDoctor />
      </Suspense>

      <p>
        <Link href={Routes.DoctorsPage()}>
          <a>Doctors</a>
        </Link>
      </p>
    </div>
  )
}

EditDoctorPage.authenticate = true

EditDoctorPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditDoctorPage
