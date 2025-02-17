"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'

function Header() {
  const { user, isLoaded } = useUser()  // isLoaded will tell if the user status has been fetched
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 bg-white">
          <Image src='/logoipsum-280.svg' width={100} height={80} alt='logo' />

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav
              aria-label="Global"
              className={`absolute top-16 right-0 w-48  mt-3 flex items-center gap-4 bg-white shadow-lg rounded-md p-4 transition-all duration-300 ${
                isMenuOpen ? 'block' : 'hidden'
              } md:block md:static md:bg-transparent md:shadow-none `}
            >
              <ul className="flex flex-col  items-center gap-4 md:flex-row md:gap-6 text-sm">
                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="/">
                    Home
                  </a>
                </li>

                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75" href="/upload">
                    Upload
                  </a>
                </li>

                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75 whitespace-nowrap" href="/aboutus">
                    About Us
                  </a>
                </li>

                <li>
                  <a className="text-gray-500 transition hover:text-gray-500/75 whitespace-nowrap" href="/contactus">
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {isLoaded ? (
                  user ? (
                    <a className="rounded-md shadow-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-400" href="/upload">
                      Dashboard
                    </a>
                  ) : (
                    <>
                      <a className="rounded-md shadow-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-400" href="/files">
                        Get Started
                      </a>
                      <a className="rounded-md shadow-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-400" href="/login">
                        Sign In
                      </a>
                    </>
                  )
                ) : null  // Do not render the buttons if user data isn't loaded yet
                }
              </div>

              <button
                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Toggle menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
