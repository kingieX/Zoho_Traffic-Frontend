import NavBar from "../Components/NavBar"
import { useState, useEffect } from "react";
import { useAuth } from '../AuthContext';
import { useParams } from "react-router-dom";

const ReportsAnalytics = () => {
  const { userId, accessToken } = useAuth();
  const {id, user_id} = useParams
  const [trafficDetails, setTrafficDetails] = useState('');
  const [incidentDetails, setIncidentDetails] = useState('');


  // fetch Traffic details
  useEffect(() => {
    const fetchTrafficDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/traffic-results/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        setTrafficDetails(data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching traffic details:', error);
      }
    };

      fetchTrafficDetails();
  }, [userId, accessToken]);


  // fetch Incident details
  useEffect(() => {
    const fetchIncidentDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/incidence-report/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        setIncidentDetails(data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching incident details:', error);
      }
    };

      fetchIncidentDetails();
  }, [userId, accessToken]);


  return (
    <div className='body'>
      <div className='left'>
        <NavBar />
      </div>
      <div className='sidebar2 p-4'>
        <h1 className="text-4xl font-semibold mb-4">Reports & Analytics</h1>
        <div className="border-2 p-2 mb-2">
          <h1 className="text-2xl font-semibold">Traffic Reports</h1>

          {trafficDetails ? (
            <div className="flex px-2 flex-col gap-4 text-xl">
              <p>Speed: {trafficDetails.speed}</p>
              <p>Latitude: {trafficDetails.latitude}</p>
              <p>Longitude: {trafficDetails.longitude}</p>
              <p>Traffic condition{trafficDetails.traffic_condition}</p>
              <p>Road condition: {trafficDetails.road_condition}</p>
            </div>
          ) : (
            <p className="font-light text-center">No Traffic Report available </p>
          )}
        </div>

        <div className="border-2 p-2 mb-2">
          <h1 className="text-2xl font-semibold">Incident Reports</h1>
          
          {incidentDetails ? (
            <div className="flex px-2 flex-col gap-4 text-xl">
              <p>Incident type: {incidentDetails.incident_type}</p>
              <p>Location: {incidentDetails.location}</p>
              <p>Severity: {incidentDetails.severity}</p>
            </div>
          ) : (
            <p className="font-light text-center">No incident Report available </p>
          )}
        </div>

        <div className="border-2 p-2 mb-2">
          <h1 className="text-2xl font-semibold">Weather Reports</h1>
          <p className="font-light text-center">No Weather Report available </p>

        </div>
      </div>
    </div>
  )
}

export default ReportsAnalytics