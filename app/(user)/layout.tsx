import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MainLayout from '../components/MainLayout'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <MainLayout>
                {children}
            </MainLayout>
            <Footer />
        </div>
    )
}

export default Layout