import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import {data} from '../../assets/icons-about/photos.js'
import {icons} from '../../assets/icons-about/icons.js'

import { BsLinkedin, BsGithub } from 'react-icons/bs'

export default function About(){

  
  return (
    <div class="bg-gray-100 dark:bg-gray-800" >

        <div>
            <Header />
        </div>

		<section className="dark:text-gray-100 h-[calc(100vh-7.5rem)]">

	      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
		      <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">PHONEZONE</p>
		      <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">The talented people behind the scenes</h2>

		<div className="grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
			{
				data?.map((element) => {
					return(
						<div className="space-y-4">
							<img alt="img1" className="object-cover h-36 w-36 shadow-md shadow-slate-900 mx-auto mb-4 bg-center rounded-full bg-gray-500" src={element.image} />
							<div className="flex flex-col items-center">
							<h4 className="font-semibold">{element.name}</h4>
							<p className=" dark:text-gray-400">Full Stack Developer</p>
							<div className="flex flex-row mx-auto gap-x-2 mt-2">
								<a rel="noopener noreferrer" href={element.Linkedin} title="LinkedIn" className="text-gray-400">
									<BsLinkedin />
								</a>
								<a rel="noopener noreferrer" href={element.GitHub} title="GitHub" className="text-gray-400">
									<BsGithub />
								</a>
							</div>
							</div>
						</div>
					)})
			}
		</div>

	</div>
	</section>

        <Footer />
    

      
      
    </div>
  )
}