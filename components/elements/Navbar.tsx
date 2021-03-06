import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { useNavStore } from '../../hooks/stores/nav-store';
import { useThemingStore } from '../../hooks/stores/theming-store';
import { classNames } from '../../utils/classnames';
import { Button } from '../components/Button';
import { Logo } from './Logo';

export function Navbar(): JSX.Element {
  const { topNav } = useNavStore();
  const { setBrowserColor } = useThemingStore();
  const { route } = useRouter();

  useEffect(() => {
    setBrowserColor('rgb(17, 24, 39)');
  }, []);

  return (
    <Popover as="header" className="relative">
      <div className="bg-dark-background pt-6 pb-3">
        <nav
          className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
          aria-label="Global"
        >
          <div className="flex justify-between flex-1">
            <div className="flex items-center justify-between w-full md:w-auto">
              <div>
                <Link href="/">
                  <a title="Homepage">
                    <span className="sr-only">Rapid Review</span>
                    <Logo fmeStyle={'light'} />
                  </a>
                </Link>
              </div>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="inline-flex items-center px-4 py-2 border border-gray-600 text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-100 hover:border-gray-700">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="flex items-center space-x-3 hidden md:flex md:ml-10 space-x-8 ">
              {topNav.map((item) => (
                <Link key={item.label} href={item.href}>
                  <a
                    target={item.href.startsWith('http') ? '_blank' : '_self'}
                    className={classNames(
                      route === item.href
                        ? 'text-white hover:text-gray-200 font-bold'
                        : 'text-gray-200 hover:text-gray-400',
                      'text-base font-medium'
                    )}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
              <Link key="LinkButton" href="/#contact">
                <a
                  className={
                    'w-full text-center block px-4 py-2 border border-gray-600 text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-100 hover:border-gray-700'
                  }
                >
                  Kontakt
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 z-10 inset-x-0 p-2 transition transform origin-top md:hidden"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <Logo />
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center px-4 py-2 border border-gray-600 text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-100 hover:border-gray-700">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="pt-5 pb-6">
              <div className="px-2 space-y-1">
                {topNav.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <a
                      className={classNames(
                        route === item.href ? 'text-red-700' : '',
                        'block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50'
                      )}
                    >
                      {item.label}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="mt-6 px-5">
                <Link key="LinkButton" href="/#contact">
                  <a
                    className={
                      'w-full text-center block px-4 py-2 border border-gray-600 text-base font-medium rounded-md text-gray-600 bg-white hover:bg-gray-100 hover:border-gray-700'
                    }
                  >
                    Kontakt
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
