import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDoctors from "app/doctors/queries/getDoctors"
const ITEMS_PER_PAGE = 100
export const DoctorsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ doctors, hasMore }] = usePaginatedQuery(getDoctors, {
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
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            <Link
              href={Routes.ShowDoctorPage({
                doctorId: doctor.id,
              })}
            >
              <a>{doctor.name}</a>
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

const DoctorsPage = () => {
  return (
    <>
      <Head>
        <title>Doctors</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewDoctorPage()}>
            <a>Create Doctor</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <DoctorsList />
        </Suspense>
      </div>
    </>
  )
}

DoctorsPage.authenticate = true

DoctorsPage.getLayout = (page) => <Layout>{page}</Layout>

export default DoctorsPage
