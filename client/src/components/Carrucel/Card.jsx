import { PostProductLocalStorage } from "../../helpers/Cart";
import { BsFillHeartFill } from "react-icons/bs"
import WishListService from '../../helpers/WishList'
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { PostProductCart } from "../../redux/actions";
import icons from '../../assets/icons-card/icons.js'
import { BsFillStarFill } from 'react-icons/bs'

export default function Card({id, name, price, image, stock, brand, calification, Reviews}){

    const user = useSelector((state) => state.User)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const handleClickDetail = (id) => {
        navigate(`/details/${id}`);
    };

    const handleClick = () => {

        const product = {
            productId: id,
            name: name,
            priceProduct: parseInt(price),
            img: image,
            stock: stock,
            totalValue: parseInt(price),
            brand: brand.name,
            quantity: 1,
        }

        // TENEMOS QUE COMPROBAR SI EL USUARIO ESTÁ VALIDADO.

        if(window.localStorage.getItem('user-log')){

            const data = {
                productId: id,
                userId: user.data_user.id,
            }

            dispatch(PostProductCart(data)).then((response) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Congratulations!',
                    text: response.data.message
                })
            }).catch((response) => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: response.response.data.message
                })
            })
            
        } else{
            const res = PostProductLocalStorage(product);
                return Swal.fire({
                    icon: res.icon,
                    title: res.title,
                    text: res.text
            })
        }
    }

    const handleFavorites = (id) => {

        if(Object.keys(user).length === 0){
            return Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: "You have to log in to add to favorites"
            })
        }

        else {

            const data = {
                idUser: user.data_user.id,
                idProduct: id,
            }


            WishListService.PostProductWishList(data).then((response) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Congratulations!',
                    text: response.data.message
                })
            }).catch((response) => {
                
                return Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: response.response.data.message
                })
            })
        }
    }
    
    return(
        <div class="w-full max-w-xl bg-white border border-gray-400 rounded-lg dark:bg-gray-900 dark:border-gray-700 transform transition duration-500 hover:scale-105 mt-6 mb-3" >

    <a href="#">
        <img class="rounded-t-lg w-full h-[300px] text-center" src={image} alt="product image" onClick={() => handleClickDetail(id)} />
    </a>

    <div class="px-3 pb-1">

            <div className="flex flex-row justify-between">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-2">{name}</h5>
                <BsFillHeartFill onClick={() => handleFavorites(id)} className="w-5 h-5 mt-3 cursor-pointer text-slate-900 dark:text-gray-400" />
            </div>

            <div className="flex items-center mt-2.5 mb-5 gap-x-2">
                {[...Array(5)].map((_, index) => (
                    <BsFillStarFill
                        key={index}
                        className={`text-${index < calification ? 'yellow' : 'yellow'}-500`}
                    />
                ))}
            </div>


        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 mb-2 dark:text-white">${price}</span>
                <a className="text-white cursor-pointer mb-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => handleClick()}>Add to cart
                </a>
        </div>
    </div>

</div>
  )
}