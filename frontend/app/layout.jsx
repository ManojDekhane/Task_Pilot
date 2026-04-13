import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'TaskPilot - Your AI Accountability Partner',
  description: 'Stop planning, start doing. TaskPilot keeps you accountable when motivation disappears. Your smart productivity companion.',
  generator: 'TaskPilot',
  keywords: ['productivity', 'accountability', 'AI', 'task management', 'habits', 'goals'],
  authors: [{ name: 'TaskPilot' }],
  openGraph: {
    title: 'TaskPilot - Your AI Accountability Partner',
    description: 'Stop planning, start doing. TaskPilot keeps you accountable when motivation disappears.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskPilot - Your AI Accountability Partner',
    description: 'Stop planning, start doing. TaskPilot keeps you accountable when motivation disappears.',
  },
}

export const viewport = {
  themeColor: '#8b5cf6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} bg-background dark`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
