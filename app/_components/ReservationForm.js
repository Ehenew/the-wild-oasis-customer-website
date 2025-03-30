'use client';

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { id, maxCapacity, regularPrice, discount } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  // We have to options to pass addtional data along with the form. 1. Using hidden input fileld and 2. the bind method(first argument the new value the this keyword points to ) and it returns a brand new function
  const createBookingWithData = createBooking.bind(null, bookingData); // pre-populating createBooking with booking data, and the when the form gets submitted the createBooking function is already pupulated with that data and the only data that it waits for will be the data from the form
  // Note: with bind the second argument, i.e bookingData will become  the first argument for the createBooking function in the server actions not the formData, and so we have to pass it as a first argument
  // export async function createBooking(formData) {
  //   console.log(formData); // bookingData
  // }
  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

        <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createBooking}
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange(); // reseting the selected date
        }}
        className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'
      >
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          {!(startDate && endDate) ?
            <p className='text-primary-300 text-base'>Start by selecting dates</p> :
            <SubmitButton pendingLabel='Reserving...'>Reserve now</SubmitButton>
          }
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
