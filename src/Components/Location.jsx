import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { View, Text, Button } from 'react-native';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Request location permission and get the current location
    const getLocation = async () => {
      try {
        const granted = await Geolocation.requestAuthorization('whenInUse');
        if (granted === 'granted') {
          Geolocation.getCurrentPosition(
            (position) => {
              setLocation(position.coords);
            },
            (error) => {
              console.log(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLocation();
  }, []);

  const sendDataToAPI = () => {
    // Check if location is available before sending data
    if (location) {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const apiUrl = 'YOUR_API_ENDPOINT';
      
      // Replace 'YOUR_API_KEY' with any authentication token or API key required
      const apiKey = 'YOUR_API_KEY';

      // Data to send to the API
      const data = {
        latitude: location.latitude,
        longitude: location.longitude,
        // Add any additional data you want to send
      };

      // Make a POST request to the API
      axios.post(apiUrl, data, { 
        headers: { 
          Authorization: `Bearer ${apiKey}` 
        } 
      })
        .then(response => {
          console.log('Data sent successfully:', response.data);
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
    } else {
      console.log('Location data not available.');
    }
  };

  return (
    <View>
      <Text>Location Component</Text>
      {location && (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}
      <Button title="Send Data to API" onPress={sendDataToAPI} />
    </View>
  );
};

export default LocationComponent;