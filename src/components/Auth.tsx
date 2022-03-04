import Head from "next/head";

export default function Auth() {
    return (
        <Head>
            <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: `
                    if (!document.cookie || !document.cookie.includes('mybooksrhcs-auth')) {
                        window.location.href = "/"
                    }
                    `,
                }}
            />
        </Head>
    )
}