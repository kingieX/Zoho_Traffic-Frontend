import NavBar from './Components/NavBar';
import { Link } from 'react-router-dom';
import Truck from './assets/truck.png';
import Car from './assets/car.png';
import Bike from './assets/bike.png';
import Human from './assets/human.png';

import Compass from './assets/compass.png';
import Cancel from './assets/cancel.png'

import { GoogleMap, LoadScript, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useMemo, useRef } from 'react';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = { lat: 6.3231, lng: 8.1120 };

// const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;


const Home = () => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();


  const libraries = useMemo(() => ['places'], []);

  const calculateRoute = async () => {
    if (originRef.current.value === '' || destinationRef.current.value === '' ) {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    });
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  const clearRoute = () => {
    setDirectionResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  return (
    <div className='body'>
      <div className='left'>
        <NavBar />
      </div>
      <div className='sidebar'>
        <div className='flex justify-between items-center bg-white py-2 px-4'>
          <h1 className='text-xl font-semibold'>Traffic Dashboard</h1>
          <div>
            <input type="text" placeholder='Search...' className='border-2 py-1 px-4 rounded-full' />
          </div>
        </div>
        {/* main body */}
        <div className='main bg-blue-200 p-1'>
          <div className='info flex flex-col gap-1'>
            {/* first box */}
            <div className='firstbox'>
              <div className='flex gap-1'>
                <div className='border-2 border-red-500 rounded-full'></div>
                <div>
                  <h2 className='text-xl font-semibold'>Congestion level</h2>
                  <p>Routes with highest avarage Congestion level</p>
                </div>
              </div>
                <div className='mt-5'>
                  <h2 className='text-xl font-light'>Average Distance On This Route: <br />
                    {distance ? (
                      <span>{distance}</span>
                    ) : (
                      <p className='text-center text-md'>No Distance yet</p>
                    )}
                    </h2>
                  <h2 className='text-xl font-light'>Average Time To Destination: <br />
                      {duration ? (
                        <span>{duration}</span>
                      ) : (
                        <p className='text-center'>No Duration</p>
                        )}
                  </h2>
                </div>
            </div>
            {/* second box */}
            <div className='secondbox'>
              {/* incident alerts */}
              <div className='mb-2'>
                <div className='flex gap-1'>
                  <div className='border-2 border-red-500 rounded-full'></div>
                  <div className='flex justify-between items-center gap-12'>
                    <h2 className='text-xl font-semibold'>Incident alerts</h2>
                    <Link to='/incident'><span className='text-blue-400 hover:underline'>make a report</span></Link>
                  </div>
                </div>

                <div className='px-4'>
                  <div className='flex justify-start items-center'>
                    <img src={Truck} alt="" className='w-6 mr-1'/>
                    <h2 className=''>Trucks/Trailers: </h2>
                    <p className='ml-2 font-light'>No incident alert</p>
                  </div>
                  <div className='flex justify-start items-center'>
                    <img src={Car} alt="" className='w-6 mr-1'/>
                    <h2 className=''>Cars/Buses: </h2>
                    <p className='ml-2 font-light'>No incident alert</p>
                  </div>
                  <div className='flex justify-start items-center'>
                    <img src={Bike} alt="" className='w-6 mr-1'/>
                    <h2 className=''>Motorcycles: </h2>
                    <p className='ml-2 font-light'>No incident alert</p>
                  </div>
                  <div className='flex justify-start items-center'>
                    <img src={Human} alt="" className='w-6 mr-1'/>
                    <h2 className=''>Pedestrians: </h2>
                    <p className='ml-2 font-light'>No incident alert</p>
                  </div>
                </div>
              </div>


                {/* weather updates */}
                <div>
                  <div className='flex gap-1'>
                    <div className='border-2 border-red-500 rounded-full'></div>
                    <div className='flex justify-between items-center gap-12'>
                      <h2 className='text-xl font-semibold'>Weather updates</h2>
                    </div>
                  </div>
                  <div className='flex justify-center items-center mt-10'>
                    <p className='font-light'>Weather Report unavailable</p>
                  </div>
                </div>
            </div>
          </div>

          {/* map */}
         <LoadScript googleMapsApiKey='AIzaSyC5WegQYxjWccOWGKwPD1IFLXduO6fLoSc' libraries={libraries}>
            <div className='map'>
              <GoogleMap 
                center={center}
                mapContainerStyle={containerStyle}
                zoom={17}
                options={{
                  zoomControl: true,
                  streetViewControl: true,
                  mapTypeControl: true,
                  fullscreenControl: false,
                }}
                onLoad={map => setMap(map)}
              >
                {directionResponse && 
                  <DirectionsRenderer
                    directions={directionResponse}
                  />}
                <Marker position={center} />
                {/* Add your box overlay here */}
                <div 
                  className='overlay'
                >
                  <div className='px-4 flex flex-col gap-2 flex-row'>
                    <Autocomplete>
                      <input className='px-2 w-22 rounded' type="text" placeholder='Origin...' ref={originRef}/>
                    </Autocomplete>

                    <Autocomplete>
                      <input className='px-2 w-22 rounded' type="text" placeholder='Destination...' ref={destinationRef}/>
                    </Autocomplete>
                    
                    <button className='text-mm font-semibold px-2 btn-color rounded' onClick={calculateRoute}>Route</button>
                  </div>
                  <div className='text-white font-semibold'>
                    <h2>Distance: {distance}</h2>
                    <h2>Duration: {duration}</h2>
                    <div className='flex justify-center items-center gap-1 mt-2'>
                      <img 
                        src={Compass}
                        alt="compass"
                        className='w-8 cursor-pointer hover:opacity-75 transition-opacity'
                        onClick={() => map.panTo(center) }
                      />
                      {/* <button className='btn-color px-2 rounded' onClick={clearRoute}>Cancel</button> */}
                      <img
                        src={Cancel}
                        alt="cancel"
                        className='w-7 h-7 cursor-pointer hover:opacity-75 transition-opacity'
                        onClick={clearRoute}
                      />
                    </div>
                  </div>
                </div>
              </GoogleMap>
            </div>
         </LoadScript>

        </div>
      </div>
    </div>
  )
}

export default Home