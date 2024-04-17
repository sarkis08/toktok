/** @type {import('next').NextConfig} */
const nextConfig = {

    compiler: {
        styledComponents: true,
        swcMinify: true,
        swcPlugins: [
            ["next-superjson-plugin", {}]
        ]
    },

    images: {
        remotePatterns: [
            {
                hostname: "res.cloudinary.com",
            },
            {
                hostname: "avatars.githubusercontent.com",
            },
            {
                hostname: "lh3.googleusercontent.com",
            }
        ]
    }
};

export default nextConfig;
