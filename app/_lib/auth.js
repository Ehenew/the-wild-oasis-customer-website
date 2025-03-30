import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { createGuest, getGuest } from "./data-service";

// Configuration object for NextAuth
const authConfig = {
  providers: [
    GoogleProvider({
      // Using environment variables to keep client credentials secure.
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    // Authorization callback to determine if the user is authenticated.
    authorized({ auth, request }) {
      // auth = the session itself
      return !!auth?.user; // Converting to a boolean to check if the user object exists.
    },
    async signIn({ user, account, profile }) {
      // This callback is triggered when a user signs in.

      try {
        // Check if the guest (user) already exists in the database.
        const existingGuest = await getGuest(user.email);

        // If the guest does not exist, create a new guest record.
        if (!existingGuest) await createGuest({ fullName: user.name, email: user.email });

        return true; // Return true to indicate successful sign-in.
      } catch {
        return false; // Return false if an error occurs during sign-in.
      }
    },
    async session({ session, user }) {
      // This session callback runs after the signIn callback and each time the session is checked (whenever the auth function is called).

      // Fetch the guest details from the database using the email.
      const guest = await getGuest(session.user.email);

      // Attach the guest ID to the session object for future reference.
      session.user.guestId = guest.id;

      // Important: Always return the session object,
      // otherwise, it will not be accessible when calling the auth function.
      return session;
    },
  },
  pages: {
    // Custom sign-in page to redirect to when authentication is required.
    signIn: '/login'
  },
};

// Exporting the authentication functions and handlers from NextAuth.
export const {
  auth,        // Function to get the authentication session.
  signIn,      // Function to initiate the sign-in process.
  signOut,     // Function to log out the user.
  handlers: { GET, POST } // HTTP handlers for GET and POST requests.
} = NextAuth(authConfig);
