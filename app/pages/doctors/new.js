import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createDoctor from "app/doctors/mutations/createDoctor"
import { DoctorForm, FORM_ERROR } from "app/doctors/components/DoctorForm"

const NewDoctorPage = () => {
  const router = useRouter()
  const [createDoctorMutation] = useMutation(createDoctor)
  return (
    <div>
      <h1>Create New Doctor</h1>

      <DoctorForm
        submitText="Create Doctor" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateDoctor}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const doctor = await createDoctorMutation(values)
            router.push(
              Routes.ShowDoctorPage({
                doctorId: doctor.id,
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
        <Link href={Routes.DoctorsPage()}>
          <a>Doctors</a>
        </Link>
      </p>
    </div>
  )
}

NewDoctorPage.authenticate = true

NewDoctorPage.getLayout = (page) => <Layout title={"Create New Doctor"}>{page}</Layout>

export default NewDoctorPage
