'use server'; // It act as a bridge for going from client to the server components
import { revalidatePath } from "next/cache";
// This directive explicitly tells Next.js that this file is a server action file, ensuring that the function within it runs exclusively on the server.
// It is mandatory to avoid hydration mismatches and security issues, as server actions should never be bundled and sent to the client.

import { auth, signIn, signOut } from "./auth"; // Import the signIn function for handling authentication.
import { supabase } from "./supabase";
import { getBooking, getBookings } from "./data-service";
import { redirect } from "next/navigation";


export async function updateGuest(formData) {
  // console.log(formData);

  const session = await auth();
  if (!session) throw new Error('You must be logged in to update your profile.');

  // data must be ensured for validity 
  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (! /^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error('Please Provide a valid national ID');


  const updateData = {
    nationality,
    countryFlag,
    nationalID
  };
  // console.log(updateData);

  const { error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId); // this is why we put the guestId into the session in the auth.js session function

  if (error) throw new Error('Guest could not be updated');

  // revalidating the catch so that we can see the updated data immediately
  revalidatePath('/account/profile');
}

export async function createBooking(bookingData, formData) {
  console.log(formData);

  const session = await auth();
  if (!session) throw new Error('You must be logged in to delete a reservation');

  // Object.entries(formData.entries()); // if there are large no of form data inputs
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: formData.get('numGuests'),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed'
    // NB: you can use zod for data validation on biggest projects
  };
  // console.log(newBooking);

  const { error } = await supabase
    .from('bookings')
    .insert([newBooking]);

  if (error) throw new Error('Booking could not be created');

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect('/cabins/thankyou');
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in to delete a reservation');

  // A user can only delete his own reservations(protecting a user from deleting someones reservation with curl commands)
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map(booking => booking.id);

  if (!guestBookingIds.includes(bookingId)) throw new Error('You are not allowed to delete this booking');

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');

  revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get('bookingId')); // the server actions cannot access the url, that is why passed the booking is as a hidden field inside the form

  // 1. Authentication
  const session = await auth();
  if (!session) throw new Error('You must be logged in to update a reservation');

  // getting the form data

  // 2. Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map(booking => booking.id);

  if (!guestBookingIds.includes(bookingId)) throw new Error('You are not allowed to update this booking');

  // 3. Building update data
  const updatedFields = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000), // first 1000 characters
  };

  // 4. Mutation
  const { error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', bookingId);

  // 5. Error handling
  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  // 6. Revalidation
  revalidatePath('/account/reservations');

  // 7. Redirecting
  redirect('/account/reservations'); // redirecting user to reservations page
}

export async function signInAction() {
  // Calls the signIn function to authenticate using Google OAuth,
  // redirecting the user to the '/account' page after a successful sign-in.
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}