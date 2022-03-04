import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ContainerBlockProps {
  children: any
  customMeta?: any
  title?: string
  description?: string
}

export default function ContainerBlock(props: ContainerBlockProps) {
  const router = useRouter();

  const meta = {
    title: "My Books",
    description: ``,
    type: "website",
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://yourwebsite.com${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://yourwebsite.com${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Manu Arora" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        
      </Head>
      <main className="dark:bg-gray-800 w-full">
        <Navbar />
        <div>{props.children}</div>
        {/*<Footer />*/}
      </main>
    </div>
  );
}
