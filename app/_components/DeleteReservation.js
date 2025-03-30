'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from 'react';
import SpinnerMini from './SpinnerMini';

function DeleteReservation({ bookingId, onDelete }) {
  // There are two options for performing server actions:
  // 1. Calling the server action inside a form on server components
  // 2. Calling the server action upon user interaction, like a button click on client components

  // if you are going to write the server action inside a component, then you have to put the 'use server' direct inside the function
  // function deleteReservation(bookingId) {
  //   'use server'
  //   // CODE
  // }



  // this time we are invoking the server action from a button not from a form, and so we cannot use useFormStatus hook on this but at the same time we want to show the user some loading indicater so that an action is being performed in the background, then How? Well likely for us we have the useTransion React 18 hook for 

  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'
    >
      {!isPending ? <>
        <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
        <span className='mt-1'>Delete</span>
      </> : <span className='mx-auto'><SpinnerMini /></span>
      }
    </button>
  );
}

export default DeleteReservation;
