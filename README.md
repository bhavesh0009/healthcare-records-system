# Healthcare Records Management System

A secure and user-friendly web application for managing personal health records, built with Next.js and Firebase.

## Features

- 🔐 Secure Authentication
  - Email/Password login
  - Google Authentication
  - Password reset functionality
  
- 📊 Health Dashboard
  - Visual representation of health metrics
  - Date range filtering
  - Data export functionality

- 📄 Document Management
  - Secure document upload
  - Timeline view of medical history
  - Search and filter capabilities

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Authentication**: Firebase Auth
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/bhavesh0009/healthcare-records-system.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Authentication pages
│   ├── signup/
│   ├── reset-password/
│   ├── timeline/         # Document timeline
│   └── upload/           # Document upload
├── components/           # Reusable components
├── contexts/            # React contexts
├── lib/                 # Utility functions
└── public/              # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
