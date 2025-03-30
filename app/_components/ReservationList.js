'use client';


import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";
import ReservationCard from "./ReservationCard";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, (currBookings, bookingId) => currBookings.filter(booking => booking.id !== bookingId)); // current state and optimistic update function

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;

// useOptimistic hook
// Syntax
// const [state, updateState] = useOptimistic(initialState, updateFunction)


// Note: The useOptimistic hook in React is used to optimistically update the UI before an asynchronous operation (like a network request) completes. It provides a way to give users instant feedback, making the app feel faster and more responsive.
// When performing operations like updating, deleting, or adding data, waiting for the server response can make the UI feel sluggish. Instead, we can immediately update the UI with the expected outcome and later adjust it if the operation fails.

// How It Works
// Optimistic Update: Immediately update the number of likes in the UI.
// API Request: Send the like request to the server.
// Rollback: If the request fails, revert the UI to the previous state. 🎉


// Key Benefits:
// Improved User Experience: Makes the UI feel snappy and fast.
// Seamless Interaction: Reduces the perceived latency.
// Error Handling: Can easily revert changes if an error occurs.