import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

async function fetchCountryDetails(code) {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  const data = await res.json();
  return data[0].name.common;
}


export default function CountryDetails({ country, borders }) {
  
  const [isSvgSupported, setIsSvgSupported] = useState(true);
  const nativeName = country[0].name.nativeName[Object.keys(country[0].name.nativeName)[Object.keys(country[0].name.nativeName).length - 1]].common


  return (
    <>
      <Header />

      <section className=" min-h-screen dark:text-lighttext text-darktext dark:bg-verydarkblue bg-lightgray">

        <section className="max-w-6xl px-6 md:px-4 sm:px-6 mx-auto md:pt-40 pt-24">

          <BackButton />

          <div className="md:flex items-center justify-between">
            <Image
              className="object-cover h-[14rem]  md:h-[24rem] md:w-[30rem]"
              alt={country[0].flags.alt ?? "Flag"}
              src={ isSvgSupported? country[0].flags.svg : country[0].flags.png}
              width={350}
              height={250}
              unoptimized
              priority
              onError={(p)=>{setIsSvgSupported(false)}}
            />
          
            <div >
              <div className="pt-12 md:pt-0 pb-8 text-2xl"><b>{country[0].name.common}</b></div>

              <div className="md:flex md:text-sm">

                <div >
                  <div className="mb-2">Native Name: <span className="font-thin">{nativeName}</span></div>
                  <div className="mb-2">Population: <span className="font-thin">{country[0].population.toLocaleString()}</span></div>
                  <div className="mb-2">Region: <span className="font-thin">{country[0].region}</span></div>
                  <div className="mb-2">Subregion: <span className="font-thin">{country[0].subregion}</span></div>
                  <div className="mb-2">Capital: <span className="font-thin">{country[0].capital}</span></div>
                </div>

                <div className="md:w-40 md:h-0 h-10"></div>

                <div >
                  <div className="mb-2">Top Level Domain: <span className="font-thin">{country[0].tld[0]}</span></div>

                  <div className="mb-2 md:max-w-[225px] md:break-all">Currencies: <span className="font-thin">
                    {
                      Object.values(country[0].currencies).reverse().map((currency, index, currencies) => (
                        <span key={index}>{index === currencies.length - 1 ? currency.name : currency.name + ', '}</span>
                      ))
                    }
                  </span></div>

                  <div className="mb-2 md:max-w-[225px] md:break-all">Languages: <span className="font-thin">
                    {
                      Object.values(country[0].languages).reverse().map((language, index, languages) => (
                        <span key={index}>{index === languages.length - 1 ? language : language + ', '}</span>
                      ))
                    }

                  </span></div>
                </div>

              </div>



              <div className="mt-16 md:max-w-[500px]">
                <div className="pb-2 font-medium">Border Countries:</div>
                <div className="flex flex-wrap gap-2">
                  {
                    borders.length === 0 ?
                      <span>No borders found.</span>
                      :
                      borders.map((border, index) => (
                        <Link href={`/${border}`} key={index}>
                          <span className="md:px-2 px-4 py-1 rounded-md dark:text-lighttext text-darktext dark:bg-darkblue bg-verylightgray hover:drop-shadow-lg drop-shadow-md">
                            {border}
                          </span>
                        </Link>
                      ))
                  }
                </div>
              </div>



            </div>
          </div>

        </section>

      </section>
    </>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const country = params?.country;

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();

    const borderPromises = data[0].borders
      ? Object.values(data[0].borders)
        .slice(0, -1) // Exclude the last element
        .map((border) => fetchCountryDetails(border))
      : [];

    const borderNames = await Promise.all(borderPromises);

    console.log(borderNames)
    return {
      props: {
        country: data,
        borders: borderNames,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        country: null,
      },
    };
  }
}
