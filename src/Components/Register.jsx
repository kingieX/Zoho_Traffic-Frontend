// import google from '../assets/google.svg';
import Logo from '../assets/logo.svg';
import RegisterBg from '../assets/registerBg.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const BackToHome = () => {
        navigate("/");
      }

      const formik = useFormik({
        initialValues: {
          username: '',
          fullname: '',
          role: '',
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          username: Yup.string().required('Required'),
          fullname: Yup.string().required('Required'),
          role: Yup.string(),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
          try {
            const response = await axios.post('http://127.0.0.1:8000/signup', values, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log('Signup successful:', response.data);
            const { access_token: accessToken, user_id: userId } = response.data;
            login(accessToken, userId);
            // You can redirect or perform other actions upon successful signup
            navigate("/home");
          } catch (error) {
            console.error('Signup failed:', error.response.data);
            setErrors(error.response.data); // Set backend errors to display on the form
          } finally {
            setSubmitting(false);
          }
        },
    });

    return (
        <div className='img'>
        <div className="flex p-7">
            {/* <h1 className="text-2xl text-blue-700 font-bold" onClick={BackToHome}>MeTutor</h1> */}
            <img src={Logo} alt="Logo" onClick={BackToHome} />
        </div>
        <div className='flex p-10 justify-center items-center'>
            <div className=''>
                <img src={RegisterBg} alt="" className='image'/>
            </div>
            <div className='box -ml-3 flex flex-row border-2'>
                <div className='flex flex-col justify-center items-center m-4'>
                    <h2 className='text-2xl font-semibold'>Get Started</h2>
                    <p className='text-lg'>Create an account to continue</p>

                    <form onSubmit={formik.handleSubmit} className='flex flex-col justify-center m-4'>
                        <input
                            type="text"
                            className='border-2 w-96 border-gray-400 rounded-md p-2 m-2'
                            placeholder='Username'
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username && (
                        <div className='text-red-500 px-3 text-lg'>{formik.errors.username}</div>
                        )}
                        <input
                            type="text"
                            className='border-2 w-96 border-gray-400 rounded-md p-2 m-2'
                            placeholder='Full Name'
                            name="fullname"
                            value={formik.values.fullname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.fullname && formik.errors.fullname && (
                        <div className='text-red-500 px-3 text-lg'>{formik.errors.fullname}</div>
                        )}

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
                            Create Account
                        </button>
                        <p className='text-sm text-center font-medium'>Already have an account? <Link to='/login'><span className='font-medium text-blue-700 hover:underline'>Login</span></Link></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Register;