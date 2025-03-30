import { signInAction } from "../_lib/actions";

function SignInButton() {
  // This where our users click on the sign in button and logged in to the app, and so it needs to be a client component however we want our authentication and authorization process to remain on the server, ie. we cannot add the onClick on the button. Then what we should do? Well this leads to yet another Next.js concept - server acitons 
  // Server acction allow us to add some interactivity to server components, usually to forms

  return (
    <form action={signInAction}>
      <button className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium'>
        <img
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
