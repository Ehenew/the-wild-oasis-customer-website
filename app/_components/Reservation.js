import { auth } from "../_lib/auth";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";

async function Reservation({ cabin }) {
  // why don't we fetch all the data inside the components instade of passing them as a prop? Well, the child components, i.e DateSelector and Reservation form have user interaction and so they have to be clien components, that is why we fetached the data inside this component and pass it as a prop
  const session = await auth();

  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id)

  ]);


  return (
    <div className='grid grid-cols-2 border border-primary-800 min-h-[400px]'>
      <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
      {session?.user ? <ReservationForm cabin={cabin} user={session.user} /> : <LoginMessage />}
    </div>
  );
}

export default Reservation;
