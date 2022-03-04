import Head from "next/head";
import useAuth from "../hooks/useAuth";
import Image from 'next/image';
import init  from '../../public/init.png';
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Home(){
  const { user, signinGoogle, signinFacebook } = useAuth();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-screen w-screen justify-center">
        <Head>
          <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                  __html: `
                  if (document.cookie.includes('mybooksrhcs-auth')) {
                      window.location.href = "/mybooks"
                  }
                  `,
              }}
          />
      </Head>
        <div className="fixed flex w-screen justify-end bg-gray-100 dark:bg-gray-800">
            <button
                aria-label="Toggle Dark Mode"
                type="button"
                className="py-1 px-1 rounded focus:outline-none dark:bg-gray-800"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
            {mounted && (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="mr-8 mt-2 w-4 h-4 text-yellow-500 dark:text-yellow-500"
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
        </div>

        <div className="flex w-screen justify-center bg-gray-100 items-center dark:bg-gray-800">
            <div className="max-w-md">
                <div className="flex flex-col items-center dark:bg-gray-800">
                    <Image className="mb-3 shadow-lg dark:bg-gray-800" width={250} height={250} src={init} />
                    <h2 className="dark:text-gray-300 flex items-end w-full justify-center text-2xl font-normal leading-normal mt-0 mb-2 text-black">
                        Log in to get free access to the platform.
                    </h2>

                    <div className="flex max-h-screen justify-center mt-4 lg:mt-6 dark:bg-gray-800">
                        <a onClick={() => signinGoogle()}
                            className="w-96 flex cursor-pointer items-center py-3 px-24 text-sm font-medium text-gray-900 
                                    bg-white rounded-lg border border-solid border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300"><img className="mr-2" width={25} src="https://img.icons8.com/fluency/48/000000/google-logo.png"/>
                                Sign in with Google
                            </a>
                    </div>

                    <div className="flex justify-center mt-4 lg:mt-6 dark:bg-gray-800">
                        <a onClick={() => signinFacebook()}
                            className="w-96 flex cursor-pointer items-center py-3 px-24 text-sm font-medium text-gray-900 
                                    bg-white rounded-lg border border-solid border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300"><img className="mr-2" width={25}  src="https://img.icons8.com/fluency/48/000000/facebook.png"/>
                                Sign in with Facebook
                            </a>
                    </div>
                </div>
            </div>
        </div>
    </div>


  )
}