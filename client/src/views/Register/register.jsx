import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostUser } from '../../redux/actions';
import validation from './validation';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import seePassword from "../../assets/icons-register/seePassword.png"
import { useNavigate } from 'react-router-dom';
import { BsEyeSlash } from "react-icons/bs";
import Swal from 'sweetalert2';
import Styles from "./form.module.css"

export default function Register() {
    const dispatch = useDispatch()
    const [picture, setPicture] = useState('')
    const [seePassword, setSeePassword] = useState(false);
    const navigate = useNavigate()
    const AllUsers = useSelector((state) => state.Users);

    // const history = useHistory()

    // const navigateTo = (url) => {
    //     history.push(url)
    // }

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "game_store");
        await axios
            .post(`https://api.cloudinary.com/v1_1/dwfhsitwe/image/upload`, data)
            .then((response) => setPicture(response.data.secure_url))
    };


    const handleRegister = (values) => {

        let formData = {...values, image: picture}

        dispatch(PostUser(formData)).then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Congratulations!',
            text: 'The user has successfully registered',
          })
          navigate('/login')
        }).catch((response) => {
          console.log(response)
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            text: response.response.data.message
          })
        })
    }


    return (
        <div className="bg-gray-100 dark:bg-gray-800 h-min-screen ">

            <Header/>

            <div className= "flex flex-col justify-center card p-6 w-1/2   mx-auto h-full m-20 bg-white dark:bg-gray-900 dark:border-gray-600 objet-cover dark:text-white  objer-cover rounded-xl">
              <div className="text-center item-center flex justify-center m-8 ">
                <h1 className="text-center m-1 text-2xl font-bold dark:text-white">Phone zone</h1>
              </div>

            <Formik className = "bg-white  rounded-lg  flex flex-col justify-center item-center  text-center m-1 h-full space-y-1 "
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    password: '',
                    image: ''
                }}
                onSubmit={handleRegister}
                validate={validation}
            >
                <Form className='flex flex-col  px-20 ' >

                  <div className='m-1'>                      
                    <label className="font-bold px-20 dark:text-white">Name</label>
                    <div className='item-center justify-center flex flex-col px-20'>
                    <Field name='name' type='text' placeholder='Firstname' className=" rounded-lg p-1 my-2 focus:outline-none  focus:shadow-outline border  dark:bg-blue-300"/>

                    <div className='text-red-600'>
                    <ErrorMessage name='name'/>
                    </div>
                   
                    </div> 
                  </div>

                  <div className='m-1'>
                  <label className="font-bold px-20 dark:text-white">Surname</label>
                   <div className='item-center justify-center flex flex-col px-20'>
                   <Field name='surname' type='text'  placeholder='Surname' className=" rounded-lg p-1 my-2 focus:outline-none focus:shadow-outline border dark:text-white dark:bg-blue-300"/>

                   <div className='text-red-600'>
                     <ErrorMessage name='surname'/>
                   </div>
                    
                   </div>
                  </div>

                  <div className='m-1'>
                    <label className="font-bold px-20 dark:text-white">Email</label>
                    <div className='item-center justify-center flex flex-col px-20'>
                    <Field name='email' type='email' placeholder='Email' className=" rounded-lg p-1 my-2 focus:outline-none dark:text-white focus:shadow-outline border dark:bg-blue-300"/>
                        <div className='text-red-600'>
                        <ErrorMessage name='email'  />
                        </div>
                    </div>
                  </div>

                  <div className='m-1'>
                    <label className="font-bold px-20 dark:text-white">Password</label>
                    <div className='item-center relative justify-center flex flex-col px-20'>
                    <Field name='password' type={seePassword ? "text" : "password"}  placeholder='Password' className="justify-center item-center  rounded-lg p-1 my-2 dark:text-white focus:outline-none focus:shadow-outline dark:bg-blue-300 border"/>
                    <span
                    onClick={() => {
                      setSeePassword(!seePassword);
                    }}
                    className="block lg:inline-block lg:mt-0 absolute right-16 p-7 "
                  >
                    <BsEyeSlash />
                  </span>
      
                    </div>
               
                      <div className='text-red-600 px-20'>
                       <ErrorMessage name='password'/>
                      </div>
                  </div>
                    
                    <div className='m-1'>
                      <label className="font-bold px-20 dark:text-white">Image</label>
                      <div className='item-center justify-center flex flex-col px-20'>
                          <div  style={{ backgroundImage: `url(${picture})` }}></div>                    
                          <Field name='image' type='file' placeholder='image'  className=" rounded-lg p-1 my-2 focus:outline-none focus:shadow-outline border dark:bg-blue-400 dark:text-white" onChange={handleImage}/>  

                         <div className='text-red-600'>
                         <ErrorMessage name='image'/> 
                          </div>                    
                      </div>
                    </div>

                    <div className='m-1'>                    
                      <div  className='item-center justify-center flex flex-col px-20'>
                      <button type='submit' className=" bg-gradient-to-r from-red-500 to-blue-900 text-white font-bold py-2 px-4 rounded mt-3" >Register</button>
                      </div>
                    </div>

                </Form>

            </Formik>
            </div>

                <Footer/>

        </div>
    )
}