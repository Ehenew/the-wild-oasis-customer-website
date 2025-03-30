/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hxupjduozxdsycipkgth.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
        search: '',
      },
    ],
  },

  // output: 'export', //exporting as SSG, this will create an output with 'out' and we can deploy it on any deploying platforms, however the images that we optimize with the next Image component are not going to work, we have to either not optimize them or use another third-party service like cloudinary or sharp for optimization
};


export default nextConfig;
