import React from 'react'
import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { useSelector } from 'react-redux';
import logo from "../../assets/logo.svg"
import Logout from './Logout'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const {user} = useSelector((state) => state.auth)
    // const navigate = useNavigate()

    const item = [
      {
        name: 'Home',
        slug: '/',
        active: true
      },
      {
        name: 'Login',
        slug: '/login',
        active: !user
      },
      {
        name: 'Sign Up',
        slug: '/signUp',
        active: !user
      },
      {
        name: 'All Recaords',
        slug: '/all-rec',
        active: user
      },
      {
        name: 'Add Company',
        slug: '/add-company',
        active: user
      },
      {
        name: 'About Us',
        slug: '/about-us',
        active: user
      },
      {
        name: 'Contact Us',
        slug: '/contact-us',
        active: user
      },
    ]
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
            <img className="h-8 w-auto" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {item.map((navItem) => navItem.active ? (
        <Popover.Group className="hidden lg:flex lg:gap-x-12" key={navItem.name}>
          <Link to={navItem.slug} className="text-sm font-semibold leading-6 px-6 text-gray-900">
            {navItem.name}
          </Link>
        </Popover.Group>
        ) : null)}
        {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div> */}

        {
          user && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/logout" className="text-sm font-semibold leading-6 text-gray-900">
            <Logout />
          </Link>
        </div> 
          )
        }
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {item.map((navItem) => navItem.active ? (
              <div className="space-y-2 py-6" key={navItem.name}>
                <Link
                  to={navItem.slug}
                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {navItem.name}
                </Link>
              </div>
              ) : null)}
              { 
              user && (
              <div className="py-6">
                <Link
                  to="/logout"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <Logout />
                </Link>
              </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Navbar