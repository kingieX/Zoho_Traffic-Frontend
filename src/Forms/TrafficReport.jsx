import { useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
// import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const TrafficReportForm = () => {
  const { id } = useParams();
  const [locationCoordinates, setLocationCoordinates] = useState(null);

  const initialValues = {
    location_name: '',
    traffic_condition: '',
    road_condition: '',
    weather_condition: '',
    event_type: '',
    is_emergency_vehicle: false,
    additional_info: '',
  };

  const validationSchema = Yup.object({
    // location_name: Yup.string().required('Location name is required'),
    traffic_condition: Yup.string().required('Traffic condition is required'),
    road_condition: Yup.string().required('Road condition is required'),
    weather_condition: Yup.string().required('Weather condition is required'),
    event_type: Yup.string().required('Event type is required'),
    is_emergency_vehicle: Yup.boolean(),
    additional_info: Yup.string(),
  });

  const trafficConditionsOptions = [
    'Light Traffic',
    'Moderate Traffic',
    'Heavy Traffic',
  ];

  const roadConditionsOptions = ['Dry', 'Wet', 'Flooded'];

  const weatherConditionsOptions = ['Clear', 'Rainy', 'Foggy'];

  const eventTypesOptions = ['Accident', 'Construction', 'Other'];

  const onPlaceSelected = (place) => {
    // Update form values with selected location
    formik.setFieldValue('location_name', place.formatted_address);

    // Optionally, you can also update the state with location coordinates
    setLocationCoordinates({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };

  const onSubmit = async (values) => {
    try {
      // Use the coordinates stored in locationCoordinates
      // Combine location coordinates with other form values and send to backend
      const dataToSend = { ...values, ...locationCoordinates };

      // ... continue with the fetch request to send data to the backend
      const response = await fetch(`http://127.0.0.1:8000/update/traffic-report/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log('Traffic report submitted successfully!');
      } else {
        console.error('Error submitting traffic report:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting traffic report:', error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  return (
    <div className='form'>
      <h1 className='text-2xl mb-4 font-semibold'>Report Traffic Condition</h1>
      <form onSubmit={formik.handleSubmit} className='flex justify-center items-center flex-col gap-3'>
        <label className='flex flex-col'>
          Location Name:
          {/* <Autocomplete
          onLoad={(autocomplete) => {
            console.log('Autocomplete loaded:', autocomplete);
          }}
          onPlaceChanged={() => onPlaceSelected(autocomplete.getPlace())}
          > */}
            {/* <div>
              <input
                type="text"
                className='border-2 w-96 border-gray-400 rounded-md p-2'
                name="location_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location_name}
                placeholder="Enter location"
              />  
            </div>   */}
          {/* </Autocomplete> */}
            {formik.touched.location_name && formik.errors.location_name ? (
              <div className='text-red-700'>{formik.errors.location_name}</div>
            ) : null}
        </label>

        <label className='flex flex-col'>
          Traffic Condition:
          <select
          className='border-2 w-96 border-gray-400 rounded-md p-2'
            name="traffic_condition"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.traffic_condition}
          >
            <option value="" label="Select Traffic Condition" />
            {trafficConditionsOptions.map((option) => (
              <option key={option} value={option} label={option} />
            ))}
          </select>
          {formik.touched.traffic_condition && formik.errors.traffic_condition ? (
            <div className='text-red-700'>{formik.errors.traffic_condition}</div>
          ) : null}
        </label>

        <label className='flex flex-col'>
          Road Condition:
          <select
            name="road_condition"
            className='border-2 w-96 border-gray-400 rounded-md p-2'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.road_condition}
          >
            <option value="" label="Select Road Condition" />
            {roadConditionsOptions.map((option) => (
              <option key={option} value={option} label={option} />
            ))}
          </select>
          {formik.touched.road_condition && formik.errors.road_condition ? (
            <div className='text-red-700'>{formik.errors.road_condition}</div>
          ) : null}
        </label>

        <label className='flex flex-col'>
          Weather Condition:
          <select
            name="weather_condition"
            className='border-2 w-96 border-gray-400 rounded-md p-2'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weather_condition}
          >
            <option value="" label="Select Weather Condition" />
            {weatherConditionsOptions.map((option) => (
              <option key={option} value={option} label={option} />
            ))}
          </select>
          {formik.touched.weather_condition && formik.errors.weather_condition ? (
            <div className='text-red-700'>{formik.errors.weather_condition}</div>
          ) : null}
        </label>

        <label className='flex flex-col'>
          Event Type:
          <select
            name="event_type"
            className='border-2 w-96 border-gray-400 rounded-md p-2'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.event_type}
          >
            <option value="" label="Select Event Type" />
            {eventTypesOptions.map((option) => (
              <option key={option} value={option} label={option} />
            ))}
          </select>
          {formik.touched.event_type && formik.errors.event_type ? (
            <div className='text-red-700'>{formik.errors.event_type}</div>
          ) : null}
        </label>

        {/* <label>
          Is Emergency Vehicle:
          <input
            type="checkbox"
            className='p-2 m-2'
            name="is_emergency_vehicle"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.is_emergency_vehicle}
          />
        </label> */}

        {/* <label>
          Additional Info:
          <textarea
            name="additional_info"
            className='border-2 w-96 border-gray-400 rounded-md p-2 m-2'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.additional_info}
          />
        </label> */}

        <button type="submit" className='btn-color text-white border-1 w-96 border-gray-400 rounded-md p-2 m-2'>Submit Traffic Report</button>

        {/* Display the location coordinates for testing purposes */}
        {locationCoordinates && (
          <div>
            Location Coordinates: {locationCoordinates.lat}, {locationCoordinates.lng}
          </div>
        )}
      </form>
    </div>
  );
};

export default TrafficReportForm;
