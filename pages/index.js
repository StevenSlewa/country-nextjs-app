import Head from 'next/head'
import Header from '@/components/Header'
import Main from '@/components/Main'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'



export default function Home() {

  const [countries, setCountries] = useState(undefined)

  const fetchCountries = async () => {
    const res = await fetch('https://restcountries.com/v3.1/all')
    const data = await res.json()

    setCountries(data)
  }

  useEffect(() => {
    fetchCountries();
  }, []);


  return (
    <>
      <Head>
        <title>Countries App</title>
        <meta name="description" content="browse countries" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Main countryList={countries} />
      <Footer />
    </>
  )
}

// export async function getServerSideProps() {
//   const res = await fetch('https://restcountries.com/v3.1/all')
//   const data = await res.json()



//   return {
//     props: {
//       countries: data,
//     },
//   };
// }