import NavBar from "../Components/NavBar";
import IncidentAlertsForm from "../Forms/IncidentAlertsForm";

const IncidentAlerts = () => {
  return (
    <div className='body'>
      <div className='left'>
        <NavBar />
      </div>
      <div className='sidebar2'>
        <div className="mt-10 pt-10 flex justify-center">
          <IncidentAlertsForm />
        </div>
      </div>
    </div>
  )
}

export default IncidentAlerts