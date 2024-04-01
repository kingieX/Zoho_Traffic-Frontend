import Logo from './assets/logo.svg';
import LoginBg from './assets/loginBg.png'
import Traffic from './assets/traffic.gif';
import { useNavigate } from "react-router-dom";

const Zoho = () => {
  const navigate = useNavigate();

  const BackToHome = () => {
    navigate("/");
  }

  const HandleSignUp = () => {
    navigate("/register");
  }

  const HandleLogIn = () => {
    navigate("/login");
  }

  return (
    <div className=''>
      <div className="flex justify-between items-center px-8 py-2">
        {/* <h1 className="text-2xl text-blue-700 font-bold" onClick={BackToHome}>MeTutor</h1> */}
        <img src={Logo} alt="Logo" onClick={BackToHome} />
        <div>
          <button onClick={HandleSignUp} className="btn-color px-8 py-2 rounded-2xl mr-2">Sign up</button>
          <button onClick={HandleLogIn} className="btn-color2 text-primary border px-8 py-2 rounded-2xl ml-2">Login</button>
        </div>
      </div>
      <div className='border'></div>


      {/*  */}
      <div className="flex flex-col justify-start items-center my-5">
        {/* <img src={LoginBg} alt="" className='w-40'/> */}
        <h1 className="text-6xl font-bold mb-2">Navigating the Future</h1>
        <h2 className="text-md text-center font-medium mb-5">Your Ultimate Hub for Smart Traffic Solutions and Seamless Commutes.</h2>
        <div className='flex flex-col justify-center items-center mb-2'>
          <div className='border border-black mb-4'>
            <img src={Traffic} alt="" className='traffic'/>
          </div>
          <div className='text-left'>
            <div className='flex flex-col justify-center items-center mb-2'>
              <h2 className='text-4xl text-centeS font-semibold mb-2'>Experience Effortless Commutes:</h2>
              <div className='flex flex-col text-2xl flex-wrap gap-3 font-semibold'>
                <p>~ Real-Time Traffic Updates</p>
                <p>~ Incident Alerts</p>
                <p>~ Congestion Monitoring</p>
                <p>~ Incident Alerts</p>
                <p>~ Weather Reports</p>
              </div>
            </div>
          </div>
        </div>
        <p className='mb-4'>All at Your Fingertips! Navigate with Confidence for a Smoother Journey Ahead.</p>
          <div className='flex gap-5 mb-5'>
            <button onClick={HandleSignUp} className="btn-color px-6 py-2 rounded-xl">Get Started</button>
            <button onClick={HandleLogIn} className="btn-color2 border text-blue-700 px-6 py-2 rounded-xl">Learn more</button>
          </div>
        </div>
      </div>
  )
}

export default Zoho;