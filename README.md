# Weather App

This is the repository for the Weather application.

## 📷 Screenshots

<div style="display: flex; justify-content: space-between;">

<img src="github/login.png" alt="Weather App Login" style="width: 23%;" />
<img src="github/locations.png" alt="Weather App Locations" style="width: 23%;" />
<img src="github/create-location.png" alt="Weather App Create Location" style="width: 23%;" />
<img src="github/location-details.png" alt="Weather App Location Details" style="width: 23%;" />

</div>

## 🛠️ Technologies Used

- **React Native**: A framework for building native apps using React.
- **Expo**: A framework and platform for universal React applications.
- **TypeScript**: A superset of JavaScript that adds static typing to the code.
- **Zustand**: A small, fast, and scalable bearbones state-management solution.

## ⚙️ Features

- **Data Fetching**: Fetch and display real-time floating rates from an external API using Axios.
- **State Management**: Utilize Zustand for managing application state efficiently.
- **Responsive Design**: Adapts to various screen sizes, providing an optimal experience across devices.
- **Async Storage**: Persist data locally using Async Storage for offline access and faster load times.

## 📦 Project Structure

```bash
src/
├── @types/              # TypeScript type definitions
├── assets/              # Static files like images, fonts, etc.
├── components/          # Reusable components across the application
├── domain/              # Domain logic and entities of the application
├── enums/               # Enum definitions used in the project
├── features/            # Redux reducers, organized by module
├── hooks/               # Custom hooks for reusable logic
├── lib/                 # External libraries and configurations
├── mock/                # Mock data for testing and development
├── query/               # API request functions
├── routes/              # Navigation route definitions
├── schemas/             # Form validation schemas
├── screens/             # Main screens of the application
├── services/            # Service functions related to APIs and other integrations
├── storage/             # Persistent storage configurations
├── store/               # State management
├── theme/               # Application styles and themes
└── utils/               # Utility functions and helpers

```

## 📚 Documentation

### Installation

To run the project locally, follow the steps below:

1. Clone the project:

```bash
git clone https://github.com/enzoodev/weather-app.git
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Configure json-server for API mocking:

- Put your private IP and desired port in the .env file.

4. Start the API server:

- Open a terminal and run.
```bash
yarn server
# or
npm run server
```

5. Start the development server:

- Open other terminal and run.
```bash
yarn start
# or
npm run start
```

6. Run on iOS:

- Open other terminal and run.
```bash
yarn ios
# or
npm run ios
```

7. Run Android:
- Open other terminal and run.
```bash
yarn android
# or
npm run android
```
