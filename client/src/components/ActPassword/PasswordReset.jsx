import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const PasswordReset = () => {

  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
      axios
      .post('http://localhost:3001/user/passwordCode', { email })
      .then((res) => {
         setMessage(res.data.message); 
         setTimeout(() => {
          navigate("/reset")
        }, 5000);
        
      }).catch((err) => {
        setError(err.response.data.message);
      });
      
      
  };
  

  return (

    <div div className="bg-gray-100 dark:bg-slate-800  h-min-screen ">

          <div className='pb-28'>
          <Header/>
          </div>

          <div className= "flex flex-col justify-center card p-6 w-1/2   mx-auto h-full m-20 bg-white dark:bg-gray-900 dark:border-gray-600 objet-cover dark:text-white  objer-cover rounded-xl m-2 pt-10">

          <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center my-8">

            <h1 className="text-black dark:text-slate-100 fond-bold text-4xl font-medium mb-8 mt-4">
            Reset password
            </h1>

              <div className="w-4/5 px-40 items-center">
              <label htmlFor="email" className="font-bold text-slate-900 dark:text-slate-100">Enter your email address:</label>
              </div>

              <div className="w-4/5 my-2 flex items-center relative  mb-12 px-40">
                  <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  required
                  className="w-full  p-1 focus:outline-none focus:shadow-outline border border-gray-300"
                  style={{ maxWidth: '300px' }}
                />
              </div>

            <button
              type="submit"
              className=" bg-gradient-to-r from-red-500 to-blue-900 text-white font-bold py-2 px-4 rounded my-4" 
              style={{ marginTop: '0.5rem', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
            >
              Send confirmation code
            </button>

          </form>

          {message && <p className="text-green-600 mt-2" style={{ maxWidth: '300px' }}>{message}</p>}
          {error && <p className="text-red-600 mt-2" style={{ maxWidth: '300px' }}>{error}</p>}
          </div>

          <div className='my-auto pt-28'>
          <Footer/>
          </div>
          
    </div>
  );
};

export default PasswordReset;