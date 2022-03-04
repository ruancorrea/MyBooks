import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import userData from '../constants/data';
import { IconLogOut } from "./Icons";


export default function Navbar() {
  const router = useRouter();
  console.log(router.asPath);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user, signout } = useAuth();
  const [ menuButtonVisivel, setMenuButtonVisivel ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-6xl  mx-auto px-4 py-5 md:py-10 bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-600">
      <div className="flex  md:flex-row justify-between items-center">
        {/* Logo / Home / Text */}

        <div className="flex flex-col">
          <Link href="/">
              { user ?
               <a>
                  <h1 className="font-semibold text-xl dark:text-gray-100">
                  {user?.name.split(' ', 2).map((n, i) => {
                    return (
                      <small key={i} className="text-lg">{n} </small>
                      )
                    })}
                  </h1>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                    {user?.email}
                  </p>
                </a>
              :
              <></>
              }
          </Link>
        </div>

        <div className="space-x-8 hidden md:block">
                        <Link href="/mybooks">
                            <a
                            className={`text-base  ${
                                router.asPath === "/mybooks"
                                ? "text-gray-800 font-bold dark:text-gray-400"
                                : "text-gray-600 dark:text-gray-300 font-normal "
                            }`}
                            >
                            My Books{" "}
                            {router.asPath === "/mybooks" && (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-arrow-down inline-block h-3 w-3"
                                viewBox="0 0 16 16"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                                />
                                </svg>
                            )}
                            </a>
                        </Link>
                        <Link href="/addbook">
                            <a
                            className={`text-base  ${
                                router.asPath === "/addbook"
                                ? "text-gray-800 font-bold dark:text-gray-400"
                                : "text-gray-600 dark:text-gray-300 font-normal "
                            }`}
                            >
                            Add Book
                            {router.asPath === "/addbook" && (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-arrow-down inline-block h-3 w-3"
                                viewBox="0 0 16 16"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                                />
                                </svg>
                            )}
                            </a>
                        </Link>
                        <Link href="/settings">
                            <a
                            className={`text-base  ${
                                router.asPath === "/settings"
                                ? "text-gray-800 font-bold dark:text-gray-400"
                                : "text-gray-600 dark:text-gray-300 font-normal "
                            }`}
                            >
                            Settings{" "}
                            {router.asPath === "/settings" && (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-arrow-down inline-block h-3 w-3"
                                viewBox="0 0 16 16"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                                />
                                </svg>
                            )}
                            </a>
                        </Link>
                        
            </div>

        <div className="space-x-4 flex flex-row items-center">
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-10 h-10 p-3 rounded focus:outline-none"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="w-4 h-4 text-yellow-500 dark:text-yellow-500"
              >
                {theme === "dark" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
          </button>
            <a
                onClick={() => {signout()}}
                className="cursor-pointer text-base font-normal text-gray-600 dark:text-gray-300"
            >
                {IconLogOut}
            </a>
            <img className="w-8 h-8 rounded-full" src={user?.photoUrl} alt="user photo" />
        </div>
      </div>
        
      <div className="space-x-8 block md:hidden mt-4">
        <Link href="/mybooks">
          <a className="text-base font-normal text-gray-600 dark:text-gray-300">
            My Books
          </a>
        </Link>
        <Link href="/addbook">
          <a className="text-base font-normal text-gray-600 dark:text-gray-300">
            Add Book
          </a>
        </Link>
        <Link href="/settings">
          <a className="text-base font-normal text-gray-600 dark:text-gray-300">
            Settings
          </a>
        </Link>
      </div>
    </div>
  );
}
