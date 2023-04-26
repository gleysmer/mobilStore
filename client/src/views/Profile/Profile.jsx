import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getOrders } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export default function Profile(){

    const user = useSelector((state) => state.User);
    const [orders, setorders] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {

        if(Object.keys(user).length !== 0){
            dispatch(getOrders(user.data_user.id))
            .then((response) => {
                    console.log(response.data);
                    setorders(response.data);
                }).catch((error) => {
                    console.log("Error fetching orders:", error);
                });
        }               
    }, [user]);

    const EmptyOrder = () => {
        return(
            <section className="flex items-center p-16 dark:bg-gray-800 dark:text-gray-100 h-[calc(100vh-10rem)]">
	            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		            <div className="max-w-md text-center">
			            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
				            <span className="sr-only">Error</span>🤐
			            </h2>
			            
                        <p className="text-2xl font-semibold md:text-3xl">You have not bought a product</p>
			            <p className="mt-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>
		            </div>
	            </div>
            </section>
        )
    }

  return(
    <div className='dark:bg-gray-800'>

        <Header />

            <div className="max-w-md p-8 ml-4 sm:flex sm:space-x-6 dark:bg-gray-900 dark:text-gray-100">

	            <div className="flex-shrink-0 w-full h-44 sm:h-32 sm:w-32 sm:mb-0">
		            <img src={user.data_user?.image} alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
	            </div>

	            <div className="flex flex-col space-y-4 justify-between">
		            <div>
			            <h2 className="text-2xl font-semibold">{user.data_user?.name} {user.data_user?.surname}</h2>
			            <span className="text-sm dark:text-gray-400">{user.data_user?.rol}</span>
		            </div>
		    
                    <div className="space-y-1">
			            <span className="flex items-center space-x-2">
				            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
					            <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97
                                ,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,
                                172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
				            </svg>

				        <span className="dark:text-gray-400">{user.data_user?.email}</span>
			            </span>
		            </div>
	            </div>
            </div>

        {
            orders.length === 0 ? <EmptyOrder /> :

            <div>



        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 mt-5 mb-10 h-[calc(100vh-8rem)]">

            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">NRO</th>
                        <th scope="col" class="px-6 py-3">DATE</th>
                        <th scope="col" class="px-6 py-3">ADDRESS</th>
                        <th scope="col" class="px-6 py-3">TOTAL</th>
                        <th scope="col" class="px-6 py-3">PENDING</th>
                    </tr>
                </thead>

            <tbody>
                {
                    orders?.map((orden) => {
                        return(
                            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {orden.Nro}
                                </th>
                                <td class="px-6 py-4">
                                    {orden.date.substring(0, orden.date.indexOf("T"))}
                                </td>
                                <td class="px-6 py-4">
                                    {orden.address}
                                </td>
                                <td class="px-6 py-4">
                                    ${orden.total}
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{orden.status}</a>
                                </td>
                            </tr>
                        )
                    })
                }    
            </tbody>
        </table>
        </div>
        </div>
        }

        
			


        <Footer />
    </div>
  )
}
