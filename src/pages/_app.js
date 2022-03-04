import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
