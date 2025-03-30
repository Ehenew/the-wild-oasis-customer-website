import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { signOutAction } from '../_lib/actions';

function SignOutButton() {
  // as this is a child of a client component, the SideNavigationon, we can use the onClick property on the button but let's use it with a form
  return (
    <form action={signOutAction}>
      <button button className='py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full' >
        <ArrowRightOnRectangleIcon className='h-5 w-5 text-primary-600' />
        <span>Sign out</span>
      </button >
    </form >
  );
}

export default SignOutButton;
