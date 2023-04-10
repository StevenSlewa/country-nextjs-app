import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { useTheme } from "next-themes";
import Loading from "./Loading";

const BootstrapInput = styled(InputBase)(({ theme }) => ({

  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    fontSize: 16,
    padding: '12px 26px 12px 12px',
    transition: theme.transitions.create(['border-color', 'white']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',

    ].join(','),
  },
}));

export default function Main({ countryList }) {

  const [countries, setCountries] = useState(countryList);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setRegion] = useState('');
  const { theme } = useTheme();
  const [searchVal, setSearchVal] = useState("");
  const [currPage, setCurrPage] = useState(1);

  const handleChange = (event) => {
    setCurrPage(1);

    setRegion(event.target.value);

    setCountries(countryList?.filter((country) => {
      return country.region == event.target.value;
    }));
  };



  const handleSearch = (event) => {
    setCurrPage(1);

    const searchValue = event.target.value.toLowerCase();

    setSearchVal(searchValue);

    setCountries((prevCountries) => {
      return countryList?.filter((country) => {
        return country.name.common.toLowerCase().includes(searchValue);
      });
    });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  useEffect(() => {
    const uniqueRegions = countryList?.reduce((acc, country) => {
      if (!acc.includes(country.region)) {
        acc.push(country.region);
      }
      return acc
    }, [])

    setCountries(countryList)
    setRegions(uniqueRegions)



  }, [countryList]);



  return (
    <section className="body-font dark:text-lighttext text-darktext dark:bg-verydarkblue bg-lightgray">

      {
        countries === undefined ? <div className="pt-48 pb-16"><Loading /></div> : <>
          <section className="pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center md:flex md:justify-between">
              <div className="pt-24 md:pt-36">
                <div className="relative md:w-96 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center px-4 ">
                    <svg className=" z-10 h-6 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search for a country..."
                    onChange={handleSearch}
                    name="country"
                    className=" pl-16 w-full pr-10 py-3 rounded-md outline-none dark:text-lighttext text-darktext dark:bg-darkblue bg-verylightgray font-semibold hover:drop-shadow-lg drop-shadow "
                  />
                </div>
              </div>

              <div className=" pt-8 md:pt-36">
                <div className="relative w-1/3">

                  <FormControl
                    sx={{
                      width: 180,
                      '.MuiSvgIcon-root': {
                        fill: theme === "light" ? "black !important" : "white !important"
                      }
                    }} >
                    <Select
                      displayEmpty
                      id="demo-customized-select"
                      value={selectedRegion}
                      onChange={handleChange}
                      input={<BootstrapInput className="dark:bg-darkblue bg-verylightgray font-semibold hover:drop-shadow-lg drop-shadow rounded-md" />}
                      inputProps={{ 'aria-label': 'Without label' }}
                      MenuProps={{
                        classes: {
                          paper: 'dark:bg-darkblue bg-verylightgray',
                          list: 'dark:text-lighttext text-darktext'
                        },
                        disableScrollLock: true,
                        PaperProps: {
                          style: {
                            marginTop: '5px',
                          },
                        }
                      }}
                      className=" dark:text-lighttext text-darktext"
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <p >Filter by Region</p>;
                        }

                        return selected;
                      }}
                    >
                      {
                        regions.map((region) => {
                          return <MenuItem key={region} value={region}>{region}</MenuItem>

                        })
                      }
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>

          </section>


          <section className="relative pb-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

              <div className="grid md:grid-cols-4 gap-12 px-12 md:px-0">

                {
                  countries.map((country, index) => {
                    return (
                      (index >= (8 * (currPage - 1)) && index < (8 * currPage)) &&

                      <Link key={country.name.common} href={`/${country.name.common}`}>
                        <div
                          className="rounded-md  dark:text-lighttext text-darktext dark:bg-darkblue bg-verylightgray hover:drop-shadow-lg drop-shadow-sm">
                          <Image
                            className="object-cover rounded-t-md h-40 w-60"
                            alt={country.flags.alt ?? "Flag"}
                            loader={(p) => country.flags.png}
                            src={country.flags.png}
                            width={350}
                            height={250}
                            unoptimized
                            priority
                          />
                          <div className="px-5 pt-5 pb-10">

                            <div className="pb-5">
                              {

                                searchVal.trim() === "" ? (
                                  <b>{country.name.common}</b>
                                ) : (
                                  <span>
                                    {country.name.common
                                      .split(RegExp(`(${searchVal})`, "gi"))
                                      .map((part, i) => {

                                        return part.toLowerCase() === searchVal.toLowerCase() ? (
                                          <b key={i}>{part}</b>
                                        ) : (
                                          part
                                        )

                                      })
                                    }
                                  </span>
                                )
                              }

                            </div>

                            <div className="text-xs">
                              <div className="mb-1">Population: <span className="font-thin">{country.population.toLocaleString()}</span></div>
                              <div className="mb-1">Region: <span className="font-thin">{country.region}</span></div>
                              <div>Capital: <span className="font-thin">{country.capital}</span></div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                }

              </div>
            </div>

            <div className="flex justify-center mt-8">

              <ul class="inline-flex items-center -space-x-px ">
                {
                  currPage > 1 &&
                  <>
                    <li>
                      <button onClick={() => setCurrPage(currPage - 1)} className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      </button>
                    </li>
                    {
                      (currPage > 1 && currPage - 2 > 1) &&
                      <li>
                        <button onClick={() => setCurrPage(currPage - 2)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                          {currPage - 2}
                        </button>
                      </li>
                    }
                    <li>
                      <button onClick={() => setCurrPage(currPage - 1)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        {currPage - 1}
                      </button>
                    </li>
                  </>

                }
                <li>
                  <button href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                    {currPage}
                  </button>
                </li>

                {
                  currPage < Math.ceil(countries?.length / 8) &&
                  <>
                    <li>
                      <button onClick={() => setCurrPage(currPage + 1)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        {currPage + 1}
                      </button>
                    </li>
                    {
                      currPage + 1 < Math.ceil(countries?.length / 8) &&

                      <li>
                        <button onClick={() => setCurrPage(currPage + 2)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                          {currPage + 2}
                        </button>
                      </li>
                    }
                    <li>
                      <button onClick={() => { setCurrPage(currPage + 1); handleScrollToTop() }} className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                      </button>
                    </li>
                  </>
                }
              </ul>
            </div>

          </section>
        </>

      }
    </section>
  );
}
