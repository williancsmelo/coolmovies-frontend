/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: `${process.env.REACT_APP_API_URL}/graphql`
      }
    ]
  },
  reactStrictMode: true
}
