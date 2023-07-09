import './globals.css'
import {Inter, Nabla, Style_Script} from 'next/font/google'
import {ReactNode} from "react";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'SplitTrip - Split expenses on your trips',
    description: 'SplitTrip: Take the stress out of splitting expenses on your trips. SplitTrip helps you effortlessly divide costs among friends, making sure everyone pays their fair share.',
}

interface RootLayoutProps {
    children: ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {children}
        </body>
        </html>
    )
}
