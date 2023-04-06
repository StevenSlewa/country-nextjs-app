import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className=" dark:text-lighttext text-darktext  w-full dark:bg-darkblue bg-verylightgray drop-shadow-md fixed z-50">
      <div className="max-w-6xl mx-auto flex flex-wrap md:p-5 p-2 flex-col md:flex-row">
        <div className="flex flex-row items-center justify-between p-3 md:p-1">
          <Link
            href="/"
            className="flex sacramento md:text-3xl text-sm  "
          ><b>Where in the world?</b>
          </Link>
         

          <div className="md:scale-100 scale-75 cursor-pointer leading-none   outline-none focus:outline-none content-end ml-auto">
            <div className="flex flex-col md:flex-row justify-center md:justify-start">
              <div
                onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}
                className=" cursor-pointer  dark:hover:text-white hover:text-black  font-semibold tr04 transition duration-300  hover:-translate-y-1">
                <div className="flex">
                  {
                    theme == "light" ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                      </svg>
                  }

                  <p className=" pl-2 pt-1">
                    Dark Mode
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
