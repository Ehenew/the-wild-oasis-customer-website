import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: 'Update Profile'
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);

  // why we call the SelectCountry in this component and immediately passed to the UpdateProfileForm component as a child? Well, the SelectCountry component does some data fetching, i.e it is a server component, but the UpdateProfileForm component is client component and so we cannot do the data-fetching there, the soloution is fetching the data in this parent server component and pass it as a child to the client component
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
