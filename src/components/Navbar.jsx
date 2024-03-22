import React from 'react'
import { appleImg, bagImg, searchImg } from '../utils/index'
import { navLists } from '../constants'

const Navbar = () => {
  return (
    <header className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
      <nav className='w-full flex screen-max-width'>
        <img src={appleImg} alt="Logo-apple" />
        <div className='flex flex-1 justify-center max-sm:hidden'>
          {navLists.map((nav, index) => (
            <div key={index} className='px-5 text-sm text-gray hover:text-white cursor-pointer transition-all'>
              {nav}
            </div>
          ))}
        </div>
        <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
          <img src={searchImg} alt="search-img" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  )
}

export default Navbar