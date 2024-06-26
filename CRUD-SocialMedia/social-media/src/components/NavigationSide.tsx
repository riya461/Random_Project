
import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegNewspaper, FaRegBell, FaSearch } from "react-icons/fa";
import { CiMenuFries } from 'react-icons/ci';
import GitHub from '../assets/github.svg';
const NavigationSide: React.FC = () => {
    const toggleMenu = () => {
        const menu = document.querySelector('.menu');
        menu?.classList.toggle('hidden');
        // transition
        
    }
    return(
        <div>
            <div className="absolute top  my-5 h-12 w-12 dark:text-white">
                <Link to='/settings'>
                <img src={GitHub} alt="" />
                </Link>
            </div>
        <div className=' bg-white my-7 dark:bg-gray-800 rounded-lg p-3 absolute top right-5 border dark:text-white flex '>          
            
            <div className='menu flex align-center mr-3'>
                
                <Link
                to='/'
                className='text-lg font-medium text-gray-900 dark:text-gray-100 px-5  '
                >
                <FaRegNewspaper/>
                </Link>
                <Link
                to='/notifications'
                className='text-lg font-medium text-gray-900 dark:text-gray-100 px-5 '
                >
                <FaRegBell />
                </Link>
                <Link
                to='/search'
                className='text-lg font-medium text-gray-900 dark:text-gray-100 px-5  '
                >
                <FaSearch />
                </Link>
            </div>
            <div>
             {/*  */}
             <button className='' onClick={toggleMenu}>
            <CiMenuFries />
            </button>
            
            </div>
        </div>
        </div>
        
    );
    }
    export default NavigationSide;