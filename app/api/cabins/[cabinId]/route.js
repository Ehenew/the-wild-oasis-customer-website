// ✅ Creating an API endpoint using Next.js route handlers
// ⚠️ Important: There should NOT be a `page.js` file inside this folder 
// because route handlers in Next.js are file-based and work inside `app/api/...` directories.

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// ✅ Handles GET requests to fetch cabin details and its booked dates
export async function GET(request, { params }) {
  // NB: You cannot customize the function name, only use GET, POST, PATCH, DELETE, etc
  // Extracting the `cabinId` from request parameters
  const { cabinId } = params;

  try {
    // Fetching cabin details and booked dates simultaneously using Promise.all
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId)
    ]);

    // Returning the response in JSON format
    return Response.json({ cabin, bookedDates });

  } catch (error) {
    return Response.json({ message: "Cabin could not be found" });
  }
}

// export async function POST() {}
