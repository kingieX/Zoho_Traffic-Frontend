import { useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const IncidentAlertsForm = () => {
  const { id } = useParams();
  const [locationCoordinates, setLocationCoordinates] = useState(null);

  const initialValues = {
    incident_type: '',
    location: '',
    severity: '',
  };

  const validationSchema = Yup.object({
    incident_type: Yup.string().required('Incident type is required'),
    location: Yup.string().required('Location name is required'),
    severity: Yup.string().required('severity is required'),
  });

  // const incidenceTypeOptions = [
  //   'Light incident',
  //   'Moderate incident',
  //   'Heavy incident',
  // ];

  // const severityOptions = ['Low', 'Moderate', 'High'];

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
      const response = await fetch(`http://127.0.0.1:8000/update/incidence-report/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log('Incidence Alert submitted successfully!');
      } else {
        console.error('Error submitting incident alert:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting tincident alert:', error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  return (
    <div className='form'>
      <h1 className='text-2xl mb-4 font-semibold'>Report an incident</h1>
      <form onSubmit={formik.handleSubmit} className='flex justify-center items-center flex-col gap-3'>
        <label className='flex flex-col'>
          Location Name:
          {/* <Autocomplete
          onLoad={(autocomplete) => {
            console.log('Autocomplete loaded:', autocomplete);
          }}
          onPlaceChanged={() => onPlaceSelected(autocomplete.getPlace())}
          > */}
            <div>
              <input
                type="text"
                className='border-2 w-96 border-gray-400 rounded-md p-2'
                name="location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
                placeholder="Enter location"
              />  
            </div>  
          {/* </Autocomplete> */}
            {formik.touched.location && formik.errors.location ? (
              <div className='text-red-700'>{formik.errors.location}</div>
            ) : null}
        </label>

        <label className='flex flex-col'>
          Incident Type:

          <input
              type="text"
              className='border-2 w-96 border-gray-400 rounded-md p-2'
              name="incident_type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.incident_type}
              placeholder="Enter incident type"
          /> 

          {/* <select
          className='border-2 w-96 border-gray-400 rounded-md p-2'
            name="incident_type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.incident_type}
          >
            <option value="" label="Select incident type" />
            {incidenceTypeOptions.map((option) => (
              <option key={option} value={option} label={option} />
            ))}
          </select> */}
          {formik.touched.incident_type && formik.errors.incident_type ? (
            <div className='text-red-700'>{formik.errors.incident_type}</div>
          ) : null}
        </label>

        <label className='flex flex-col'>
          Severity:

          <input
                type="text"
                className='border-2 w-96 border-gray-400 rounded-md p-2'
                name="severity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.severity}
                placeholder="Enter severity"
              /> 


          {/* <select
            name="severity"
            className='border-2 w-96 border-gray-400 rounded-md p-2'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.severity}
          >
            <option value="" label="Select Severity" />
            {severityOptions.map((option) => (
              <option key={option} value={option} label={option} />
            ))}
          </select> */}
          {formik.touched.severity && formik.errors.severity ? (
            <div className='text-red-700'>{formik.errors.severity}</div>
          ) : null}
        </label>

        <button type="submit" className='btn-color text-white border-1 w-96 border-gray-400 rounded-md p-2 m-2'>Submit Incident Report</button>

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

export default IncidentAlertsForm;
