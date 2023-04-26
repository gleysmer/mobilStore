import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useForm } from 'react-hook-form';
import { postSupport } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

export default function Contact(){

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const schema = {
      email: {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      },
      subject: {
        required: true,
        minLength: 10,
      },
      message: {
        required: true,
        minLength: 20,
      },
    };

    const onSubmit = (data) => {
        dispatch(postSupport(data)).then((response) => {
              Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: response.data.message,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Continue",
              })
         });
    };

  return(
    <div className='bg-gray-100 dark:bg-gray-800'>

        <Header />

        <section className="dark:text-gray-100 h-[calc(100vh-7.5rem)]">

            <div className="container flex flex-col w-1/3 mx-auto justify-center p-4 md:p-8">
                <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">PHONEZONE</p>
		        <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Let's talk!</h2>

                <form onSubmit={handleSubmit(onSubmit)} class="space-y-8">
                
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input
                            {...register("email", { required: schema.email.required, pattern: schema.email.pattern })}
                            type="email"
                            id="email"
                            placeholder="name@gmail.com"
                            className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                             focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                              dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light
                               ${errors.email && "border-red-500"}`}
                        />
                        
                        {errors.email && errors.email.type === 'required' && (<p className="text-red-500 text-sm mt-1">Please enter your email address.</p>)}
                        {errors.email && errors.email.type === 'pattern' && (<p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>)}
                    </div>

                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                        <input
                            {...register("subject", { required: schema.subject.required, minLength: schema.subject.minLength })}
                            type="text"
                            id="subject"
                            placeholder="Let us know how we can help you"
                            className={`block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500
                             focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                            dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${errors.subject && "border-red-500"}`}
                        />

                        {errors.subject && errors.subject.type === 'required' && (<p className="text-red-500 text-sm mt-1">Please enter a subject.</p>)}
                        {errors.subject && errors.subject.type === 'minLength' && (<p className="text-red-500 text-sm mt-1">Must be more than 10 characters.</p>)}
                    </div>

                    <div class="sm:col-span-2">
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your message</label>
                        <textarea 
                             {...register("message", { required: schema.message.required, minLength: schema.message.minLength })}
                            id="message" rows="6" className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border
                         border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                          dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${errors.subject && "border-red-500"}`} placeholder="Leave a comment...">
                        </textarea>

                        {errors.message && errors.message.type === 'required' && (<p className="text-red-500 text-sm mt-1">Please enter a valid message.</p>)}
                        {errors.message && errors.message.type === 'minLength' && (<p className="text-red-500 text-sm mt-1">Must be more than 20 characters.</p>)}  
                    </div>

                    <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-500
                        w-full hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Send message
                    </button>

                </form>
            </div>
        </section>

        <Footer />
    </div>
  )
}
