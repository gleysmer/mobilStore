import { useEffect, useState } from "react"
import { DeleteProductLocalStorage, UpdateStockProductLocalStorage } from "../../helpers/Cart";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer";
import { getProductCart, deleteProductCart, UpdateStockDB, PostMercadoPago } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2"
import { useForm } from 'react-hook-form';

export default function Cart(){

  const { register, handleSubmit, formState: { errors } } = useForm();
  const user = useSelector((state) => state.User)
  const Phones = useSelector((state) => state.Phones)
  const dispatch = useDispatch();
  const[carrito, setCarrito] = useState([]);
  const[Actualizar, setActualizar] = useState(false);

  useEffect(() => {

    if(user && user.data_user && user.data_user.id ){
      dispatch(getProductCart(user.data_user.id)).then((response) => {
        setCarrito(response.data);
      }).catch(() => {
        setCarrito([]);
      })
    }
  
    else if(window.localStorage.getItem('carrito-ls')){
      setCarrito(JSON.parse(window.localStorage.getItem('carrito-ls')));
    }
  
    else{
      setCarrito({})
    }
    
  }, [Actualizar, user])

  const DeleteProduct = (productId) => {

    if(Object.keys(user).length !== 0){

      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete the product?',
        confirmButtonText: 'Delete',
        showDenyButton: true,
      }).then((result) => {
        if(result.isConfirmed){

          const data = {
            productId: productId,
            userId: user.data_user.id
          }

          dispatch(deleteProductCart(data)).then((response) => {
            Swal.fire({
              icon: 'success',
              title: 'Congratulations!',
              text: response.data.message
            })}).then(() => {
              dispatch(getProductCart(user.data_user.id));
              setActualizar(!Actualizar);
          })
        }
      })
    }

    else{
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure you want to delete the product?',
        confirmButtonText: 'Delete',
        showDenyButton: true,
      }).then((result) => {
        if (result.isConfirmed){
          DeleteProductLocalStorage(productId);
          setActualizar(!Actualizar);
          Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: 'The product was removed from your cart',
          })
        }
      })
    }
  }

  const handleStock = (operator, productId, stock) => {

    if(Object.keys(user).length !== 0){

      const data = {
        userId: user.data_user.id,
        productId: productId,
        operator: operator
      }
      
      dispatch(UpdateStockDB(data)).then((response) => {
        dispatch(getProductCart(user.data_user.id));
        setActualizar(!Actualizar);
      }).catch((response) => {
          return Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            text: response.response.data.message,
          })
      })
    }

    else{

      const valor = UpdateStockProductLocalStorage(operator, productId, stock);
  
      if(valor !== undefined){
         Swal.fire({
          icon: valor.icon,
          title: valor.title,
          text: valor.text,
        })
      }
  
      setActualizar(!Actualizar);
    }
  }

  const GetStockProduct = (id) => {

    for(let i=0; i<Phones.length; i++){
      if(id === Phones[i].id){
        return Phones[i].stock;
      }
    }
  }

  const onSubmit = (data) => {

    if(Object.keys(user).length === 0){
      return Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: 'You have to have an account to buy',
      })
    }

    else{

      const info = {
        userId: user.data_user.id,
        address: data.address,
      }

      dispatch(PostMercadoPago(info)).then((response) => {
        window.open(response.data.init_point, '_blank');
      })
    }
  }

  const RenderEmptyCart = () => {
    return (
      <section className="flex items-center h-[calc(100vh-7rem)] p-16 dark:bg-gray-800 dark:text-gray-100">
	      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		      <div className="max-w-md text-center">
			      <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
				      <span className="sr-only">Error</span>😥
			      </h2>
			        <p className="text-2xl font-semibold md:text-3xl">Sorry, but your cart is empty</p>
			        <p className="mt-4 mb-8 dark:text-gray-400">But don't worry, you can add products from the store</p>
		      </div>
	      </div>
      </section>
    )
  }

  return(

    <div className="Cart">

      <Header />

    <div className="bg-gray-100 dark:bg-gray-800">
      <div class="container mx-auto">

        {
          Object.keys(carrito).length === 0  ? <RenderEmptyCart /> :

        <div class="flex shadow-md py-5 mr-2">
          <div class="w-3/4 h-[calc(100vh-10rem)] px-10 py-4 overflow-auto border dark:bg-gray-900 dark:border-gray-800 text-slate-900 dark:text-slate-100 ">

            <div class="flex justify-between border-b pb-5 dark:border-gray-700">
              <h1 class="font-semibold text-2xl">Shopping Cart</h1>
              <h2 class="font-semibold text-2xl">{carrito?.productcarts.length} Items</h2>
            </div>

            <div class="flex mt-8 mb-5 justify-between dark:text-gray-400">
              <h3 class="font-semibold text-xs uppercase w-2/5 ml-4">Product Details</h3>
              <h3 class="font-semibold text-center text-xs uppercase w-1/5 pr-5">Quantity</h3>
              <h3 class="font-semibold text-center text-xs uppercase w-1/5 pr-3">Stock</h3>
              <h3 class="font-semibold text-center text-xs uppercase w-1/5">Price</h3>
              <h3 class="font-semibold text-center text-xs uppercase w-1/5">Total</h3>
            </div>

            {
             carrito && carrito.productcarts?.map((product) => {
                return (
                <div class="flex items-center py-5 border-b dark:border-gray-700">
                  <div class="flex w-2/5"> 
                    <div class="w-20">
                      <img class="h-24 ml-2" src={product.img} alt="photo" />
                    </div>

                    <div class="flex flex-col justify-between ml-4 flex-grow">
                      <span class="font-bold text-xs uppercase">{product?.name}</span>
                      <span class="text-red-500 text-xs">{product.brand}</span>
                      <a onClick={() => DeleteProduct(product.productId)} class="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer">Remove</a>
                    </div>
                </div>

                  <div class="flex justify-center w-1/5">

                    
                    <svg onClick={() => handleStock('-', product.productId, GetStockProduct(product.productId))} className="fill-current text-gray-600 w-3 cursor-pointer"
                       viewBox="0 0 448 512">
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>

                    <input className="mx-2 border text-center w-8 dark:bg-gray-600" type="text" value={product?.quantity} />

                    <svg onClick={() => handleStock('+', product.productId, GetStockProduct(product.productId))} className="fill-current text-gray-600 w-3 cursor-pointer"
                     viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32
                        32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                    </svg>

                  </div>
          
                  <span class="text-center w-1/5 font-semibold text-sm">{GetStockProduct(product.productId)}</span>
                  <span class="text-center w-1/5 font-semibold text-sm">${product.priceProduct}.00</span>
                  <span class="text-center w-1/5 font-semibold text-sm">${product.totalValue}.00</span>
        </div>
                )
              })
            }
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between w-1/4 px-8 py-4 bg-slate-100">

        <div>
        <h1 class="font-semibold text-2xl border-b pb-5 mb-4">Order Summary</h1>
       
       <div>
          <label class="font-medium inline-block mb-3 text-sm uppercase mt-4">PAYMENT METHOD</label>
        <select {...register("paymentMethod", { required: true })} className="block p-2 text-gray-600 w-full text-sm">
          <option value="">Select payment method</option>
          <option value="MercadoPago">MercadoPago</option>
        </select>
        {errors.paymentMethod && <span className="text-red-500">This field is required</span>}
       </div>

          <div>
            <label class="font-medium inline-block mb-3 text-sm uppercase mt-8">Address</label>
            <input {...register("address", { required: true })} type="text" className="block p-2 w-full text-sm border border-gray-600 text-gray-600" />
            {errors.address && <span className="text-red-500">This field is required</span>}    
          </div>
        </div>

        
          <div class="border-t mt-8">
            <div class="flex font-semibold justify-between py-4 text-sm uppercase">
              <span>Total cost</span>
              <span>${carrito.priceCart}.00</span>
            </div>

            <button type="submit" className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
          </div>
      </form>
    </div>
  }
  </div>
  </div>

            <Footer />
  </div>
  )
}
