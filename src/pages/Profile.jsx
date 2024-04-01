import NavBar from "../Components/NavBar";
import { useAuth } from '../AuthContext';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { logout, userId, accessToken } = useAuth();
  const [userDetails, setUserDetails] = useState('');

      // fetch user details
      useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:8000/users/${userId}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
    
            const data = await response.json();
            setUserDetails(data);
            console.log(response);
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        };
    
        if (userId) {
          fetchUserDetails();
        }
      }, [userId, accessToken]);

       // handle logout
      const handleLogout = () => {
        // Call the logout function from the authentication context
        logout();

        navigate('/');
      }

      const handleRoute = () => {
        navigate('/home')
      }


  return (
    <div className='body'>
      <div className='left'>
        <NavBar />
      </div>
      <div className='sidebar2'>
        {userDetails && (
          <div className="flex justify-start items-center border-2 border-gray-400 p-4">
          <div className="flex justify-center items-center btn-color border-2 w-40 h-40 border-gray-700 rounded-full">
          <p className='text-9xl font-medium'>{userDetails.username.charAt(0).toUpperCase()}</p>
          </div>
          <div className="ml-5">
            <h1 className="text-4xl font-semibold">{userDetails.fullname}</h1>
            <h2 className="text-xl font-semibold">Username: <span className="font-medium">{userDetails.username}</span></h2>
            <p className="text-xl">Email: <span className="font-light">{userDetails.email}</span></p>
            <div className="flex justify-start items-center gap-10 mt-4">
              {userDetails.role ? (
                <p className="font-semibold mr-12">Role: <span className="font-light">{userDetails.role}</span></p>
              ) : (
                <p className="font-semibold mr-12 pr-12">Role: <span className="font-light">No role set</span></p>
              )}
              <button 
                className='btn-color ml-12 px-2 py-2 rounded-xl hover:bg-white hover:border-2 hover:border-gray-300'
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
        )}

        <div className="p-4">
          <h1 className="text-2xl font-semibold">Recent Routes</h1>
          <ul className="p-2 text-lg">
            <li className="border p-2 mb-2 cursor-pointer hover:text-xl" onClick={handleRoute}>Udensi - Presco campus</li>
            <li className="border p-2 mb-2 cursor-pointer hover:text-xl" onClick={handleRoute}>Waterworks - Ogoja Road</li>
            <li className="border p-2 mb-2 cursor-pointer hover:text-xl" onClick={handleRoute}>Nkaliki - Presco campus</li>
            <li className="border p-2 mb-2 cursor-pointer hover:text-xl" onClick={handleRoute}>Ishieke - Ogoja Road</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile