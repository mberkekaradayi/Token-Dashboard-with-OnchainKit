# Token Dashboard with OnchainKit

A Next.js application that allows users to view their Base Network token balances using OnchainKit and Alchemy SDK.

## Features

- Wallet connection using OnchainKit
- View Base Network token balances
- Responsive design with dark/light mode support
- Real-time token data fetching

## Prerequisites

Before you begin, you'll need to obtain the following API keys:

1. **OnchainKit API Key**

   - Sign up at [OnchainKit](https://onchainkit.xyz)
   - Create a new project to get your API key

2. **Alchemy API Key**
   - Create an account at [Alchemy](https://dashboard.alchemy.com)
   - Create a new project on Base Network
   - Get your API key from the project dashboard

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key_here
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME="OnchainKit Token Dashboard"
```

You can copy the `.env.example` file and replace the values with your actual API keys.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/mberkekaradayi/Token-Dashboard-with-OnchainKit.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Then edit .env with your API keys
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

- [OnchainKit Documentation](https://onchainkit.xyz/getting-started)
- [Next.js Documentation](https://nextjs.org/docs)
- [Alchemy Documentation](https://docs.alchemy.com)

## License

MIT

## Author

Mehmet Berke Karadayi
