import { navLinks } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LeftSideBar = () => {
    return (
        <div className='h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue shadow-xl max-lg:hidden'>
            <Image src="/logo.png" alt='logo' width={150} height={70} />
            <div className='flex flex-col gap-12'>
                {navLinks.map((link) => (
                    <Link href={link.url} key={link.label}>{link.icon} <p>{link.label}</p></Link>
                ))}
            </div>
        </div>
    )
}

export default LeftSideBar
