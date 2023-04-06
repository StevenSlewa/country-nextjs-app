import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

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


  const handleChange = (event) => {
    setRegion(event.target.value);

    setCountries(countryList.filter((country) => {
      return country.region == event.target.value;
    }));
  };

  const handleSearch = (event) => {
    setCountries(countryList.filter((country) => {
      return country.name.common.toLowerCase().startsWith(event.target.value.toLowerCase());
    }));
  };

  useEffect(() => {
    const uniqueRegions = countryList.reduce((acc, country) => {
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

      <section className="pb-8">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center md:flex md:justify-between">
          <div className="pt-24 md:pt-36">
            <div className="relative md:w-96 w-full">
              <div className="absolute inset-y-0 left-0 flex items-center px-4 ">
                <svg className="h-6 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
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
                   width: 180 , 
                '.MuiSvgIcon-root ': {
              fill: "dark:text-lighttext text-darktext !important",
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
              countries.map((country) => {
                return (
                  <Link href={`/${country.name.common}`}>
                    <div key={country.name.common} className="rounded-md  dark:text-lighttext text-darktext dark:bg-darkblue bg-verylightgray hover:drop-shadow-lg drop-shadow-sm">
                      <Image
                        className="object-cover rounded-t-md h-40 w-60"
                        alt={country.flags.alt ?? "Flag"}
                        loader={() => country.flags.png}
                        src={country.flags.png}
                        width={350}
                        height={250}
                        unoptimized />
                      <div className="px-5 pt-5 pb-10">
                        <div className="pb-5"><b>{country.name.common}</b></div>
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
      </section>
    </section>
  );
}
