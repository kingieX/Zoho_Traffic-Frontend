import Logo from '../assets/logo.svg';
import LoginBg from '../assets/loginBg.png'
import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    // const [userId, setUserId] = useState('');

    const BackToHome = () => {
        navigate("/");
      }

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          email: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
          try {
            const response = await axios.post('http://127.0.0.1:8000/login', values, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log('Login successful:', response.data);
            const { access_token: accessToken, user_id: userId } = response.data;
            login(accessToken, userId);
            // You can redirect or perform other actions upon successful login
            navigate("/home");
          } catch (error) {
            console.error('Login failed:', error.response.data);
            alert(error.response.data.detail);
            // alert('Login failed, change your password')
            // return <div>{error.response.data.detail}</div>
            setErrors(error.response.data); // Set backend errors to display on the form
          } finally {
            setSubmitting(false);
          }
        },
    });
      
  return (
    <div className=''>
        <div className="flex p-7">
            {/* <h1 className="text-2xl text-blue-700 font-bold" onClick={BackToHome}>MeTutor</h1> */}
            <img src={Logo} alt="Logo" onClick={BackToHome} />
        </div>
        <div className='flex p-10 justify-center items-center'>
            <div className=''>
                <img src={LoginBg} alt="" className='image'/>
            </div>
            <div className='box -ml-3 flex flex-row border-2'>
                <div className='flex flex-col justify-center items-center m-4'>
                    <h2 className='text-2xl font-semibold mb-1'>Welcome Back</h2>
                    <p className='text-lg mb-4'>Login into your account</p>

                    <form onSubmit={formik.handleSubmit} className='flex flex-col justify-center my-8'>
                        {/* <input type="text" placeholder='Email' className='border-2 w-96 border-gray-400 rounded-md p-2 m-2' /> */}
                        <input
                            type="email"
                            className='border-2 w-96 border-gray-400 rounded-md p-2 m-2'
                            placeholder='Email'
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                        <div className='text-red-500 px-3 text-lg'>{formik.errors.email}</div>
                        )}
                        {/* <input type="password" placeholder='Password' className='border-2 w-96 border-gray-400 rounded-md p-2 m-2' /> */}
                        <input
                            type="password"
                            className='border-2 w-96 border-gray-400 rounded-md p-2 m-2'
                            placeholder='Password'
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                        <div className='text-red-500 px-3 text-lg'>{formik.errors.password}</div>
                        )}
                        <button 
                            type='submit' 
                            className='btn-color text-white border-1 w-96 border-gray-400 rounded-md p-2 m-2'
                        >
                            Log in
                        </button>
                        <p className='text-sm text-center font-medium'>Don't have an account? <Link to='/register'><span className='font-medium text-blue-700 hover:underline'>Sign up</span></Link></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;