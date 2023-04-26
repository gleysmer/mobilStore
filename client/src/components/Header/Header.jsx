import { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import icons from '../../assets/icons-header/icons.js'
import { BsSun, BsMoon, BsFillCartCheckFill, BsFillHeartFill, BsFillPersonFill, BsMoonStarsFill} from "react-icons/bs"
import { RiLogoutCircleRFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa'
import SearchBar from '../SearchBar/SearchBar.jsx';
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { LogOut } from '../../redux/actions/index.js'
import { useNavigate } from 'react-router-dom'
import { LoginSuccess } from '../../redux/actions/index.js'
import useThemeSwitcher from '../hooks/useThemeSwitcher.js'
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Header(){
	
	const user = useSelector((state) => state.User)
	const [Actualizar, setActualizar] = useState(false)
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [mode, setMode] = useThemeSwitcher();
	const [info, infoUser] = useState({});

	  const handleFavorites = () => {

		if(Object.keys(user).length === 0){
			return Swal.fire({
				icon: 'error',
				title: 'Something went wrong',
				text: 'Unvalidated users cannot have a favorites list',
				confirmButtonText: 'Continue'
			  })
		}

		else{
			navigate('/Wishlist');
		}
	  }

	  const handleLogOut = () => {

		Swal.fire({
			icon: 'warning',
			title: 'Do you want to log out?',
			confirmButtonText: 'Yes',
			showDenyButton: true,
		}).then((result) => {
			if(result.isConfirmed){

				dispatch(LogOut());
				navigate('/')

				Swal.fire({
					icon: 'success',
					title: 'The session has been closed'
				})

				setActualizar(!Actualizar);
				
			}})
	  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-100 flex flex-col justify-center duration-300 border-b border-gray-400">
      <div className=" flex items-center gap-20 h-[80px] px-4 p-2">
        <div className="w-1/6 pl-8">
          <img src={icons.logo} className="h-10 w-28" alt="" />
        </div>

        <div className="w-full">
          <SearchBar className="w-full" />
        </div>

        <div className="w-1/3 flex items-center justify-around">

          {/*<div className="w-20 h-10 flex justify-around items-center duration-300 rounded-full bg-gray-400 dark:bg-gray-400">
            {iconComponents?.map((element) => {
				return (
                <button
                  onClick={() => setTheme(element.text)}
                  key={element.text}
                  className={`text-xl rounded-full hover:transform hover:scale-110 ${
                    theme === element.text && "text-slate-900 "
                  }`}
                >
				{element.icon}
                </button>
              );
            })}
		</div>*/}

          {/*<img className='h-[30px] w-[30px] cursor-pointer mr-2' src={theme === "light" ? icons['corazon-negro'] : icons['corazon-blanco']} alt="color" />*/}
          <div className="w-2/3 text-3xl cursor-pointer text-black dark:text-white flex  items-center gap-x-5">

			<button className=' "hover:transform hover:scale-110' onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
				{mode === 'dark' ? <BsSun className='w-6 h-6' /> : <BsMoonStarsFill  className='w-6 h-6'/>}
			</button>

            <BsFillHeartFill
              onClick={() => handleFavorites()}
              className="w-7 h-7 hover:transform hover:scale-110 mt-1"
            />

            <Link to="/Cart">
              <BsFillCartCheckFill className="hover:transform hover:scale-110 w-7 h-7" />
            </Link>

            {Object.keys(user).length === 0 ? (
              <Link to="/login">
                <FaUserCircle  className="hover:transform hover:scale-110 w-7 h-7 mt-1" />
              </Link>
            ) : (
              <Link to={"/Profile"}>
                <img
                  src={user?.data_user.image}
                  alt=""
                  className="hover:transform hover:scale-110 w-7 h-7 rounded-full mt-1"
                />
              </Link>
            )}

            {Object.keys(user).length === 0 ? (
              <></>
            ) : (
				< RiLogoutCircleRFill
                onClick={() => handleLogOut()}
                alt=""
                className="hover:transform hover:scale-110 w-7 h-7 rounded-full"
              />
            )}
          </div>
        </div>
      </div>

      	<div class="flex items-center mx-auto mb-4">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-20 lg:w-full lg:mt-0">

                    <li>
						<Link to={'/'} className={location.pathname === '/' ? 'text-black dark:text-slate-100' : 'text-gray-500'}>
							<a className="block py-2 pr-4 pl-3
						    hover:text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 lg:hover:text-primary-700
							 lg:dark:hover.text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer
						   ">Home</a>
						</Link>
                    </li>

                    <li>
						<Link to={'/Store'} className={location.pathname === '/Store' ? 'text-black dark:text-slate-100' : 'text-gray-500'}>
						<a className="block py-2 pr-4 pl-3
						    hover:text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 lg:hover:text-primary-700
						    lg:dark:hover.text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer
						   ">Marketplace</a>
						</Link>
                    </li>
                    <li>
						<Link to={'/About'} className={location.pathname === '/About' ? 'text-black dark:text-slate-100' : 'text-gray-500'}>
						<a className="block py-2 pr-4 pl-3
						    hover:text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 lg:hover:text-primary-700
						 lg:dark:hover:text-slate-100 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer
						   ">Team</a>
						</Link>
                    </li>
                    <li>
						<Link to={'/QA'} className={location.pathname === '/QA' ? 'text-black dark:text-slate-100' : 'text-gray-500'}>
						<a className="block py-2 pr-4 pl-3
						    hover:text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 lg:hover:text-primary-700
						    lg:dark:hover.text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer
						   ">QA</a>
						</Link>
                    </li>
                    <li>
						<Link to={'/Contact'} className={location.pathname === '/Contact' ? 'text-black dark:text-slate-100' : 'text-gray-500'}>
                        <a className="block py-2 pr-4 pl-3
							hover:text-black border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 lg:hover:text-primary-700
						    lg:dark:hover.text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer
						   ">Contact</a>
						 </Link>
                    </li>
                </ul>
    	</div>

    </div>
  );
}