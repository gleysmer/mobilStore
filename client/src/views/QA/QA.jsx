import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default function QA(){
  return (

    <div className='bg-gray-100'>
      <Header />

      <section className="dark:bg-gray-800 dark:text-gray-100 h-[calc(100vh-7.5rem)]">

	      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
		      <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">PHONEZONE</p>
		      <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>


		      <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">

			      <div>
				      <h3 className="font-semibold">What advantages do I get by creating an account?</h3>
				      <p className="mt-1 dark:text-gray-400">Creating an account in PHONEZONE will allow you to have access to a personal favorites list, as well as to be able
					   to make purchases..</p>
			      </div>

			      <div>
				      <h3 className="font-semibold">What are reviews? And what are they for?</h3>
				      <p className="mt-1 dark:text-gray-400">They are comments that users share about the products they have purchased. They are totally reliable,
					   since each one represents real shopping experiences in PHONEZONE. Qualifying the quality of the products allows us to have effective feedback and more security
					    when buying.</p>
			      </div>

			      <div>
				      <h3 className="font-semibold">How do I access to my account?</h3>
				      <p className="mt-1 dark:text-gray-400">Whenever you want to log in to PHONEZONE, you can access your account by clicking "Login".
						Add your email address and password, or if you prefer, connect with us through Google+!</p>
			      </div>

           			 <div>
				      <h3 className="font-semibold">What payment methods do I have to buy?</h3>
				      <p className="mt-1 dark:text-gray-400">At the moment, PHONEZONE only handles payments through MercadoPago, through test accounts.</p>
			      </div>

			      <div>
				      <h3 className="font-semibold">Who can write the reviews?</h3>
				      <p className="mt-1 dark:text-gray-400">Only validated users who have previously purchased the product will be able to review it.</p>
			      </div>

           		 	<div>
				      <h3 className="font-semibold">What is the Contact route for?</h3>
				      <p className="mt-1 dark:text-gray-400">Through the Contact route you can inform us about any problem you have with the operation of the page,
					   whether it is a problem with payment, BUGS, visual failures and others.</p>
			      	</div>



		      </div>
	      </div>
    </section>   

    <Footer />
  </div>
  )
}
