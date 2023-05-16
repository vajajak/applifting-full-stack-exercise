import { Inter } from 'next/font/google';
import { Navbar } from '../organisms/Navbar/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Cat magazine',
    description: 'Applifting full-stack exercise',
    viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
