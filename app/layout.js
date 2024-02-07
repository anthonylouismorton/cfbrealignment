import { ReduxProvider } from '@/redux/provider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CFB Conference Map',
  description: 'CFB Conference History Map',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
