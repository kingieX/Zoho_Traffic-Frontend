import NavBar from "../Components/NavBar";
import TrafficReportForm from "../Forms/TrafficReport";

const TrafficPrediction = () => {
  return (
    <div className='body'>
      <div className='left'>
        <NavBar />
      </div>
      <div className='sidebar2'>
        <div className="mt-10 flex justify-center">
          <TrafficReportForm />
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default TrafficPrediction