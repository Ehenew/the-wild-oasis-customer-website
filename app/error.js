'use client'; // mandatory

export default function Error({ error, reset }) {
  // Note: Our react error boundary only catches rendering errors, not in callback functions, asynchronous function
  // It does not catch errors that might happen in the route layout, for that you have to create a file named global-error.js

  return (
    <main className='flex justify-center items-center flex-col gap-6'>
      <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
      <p className='text-lg'>{error.message}!</p>

      <button onClick={reset} className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'>
        Try again
      </button>
    </main>
  );
}