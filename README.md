# Vehicle Inventory Application

A modern React TypeScript application for searching, filtering, and browsing vehicle inventory by ZIP code. Built with responsive design and optimized performance.

## 🚀 Features

- **ZIP Code Search**: Search for vehicles by entering a 5-digit ZIP code
- **Advanced Filtering**: Filter vehicles by Make and Color
- **Flexible Sorting**: Sort by Price (High/Low) and Make (A-Z)
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Error Handling**: Clear error messages for invalid ZIP codes and empty results
- **Performance Optimized**: Uses React.memo and custom hooks for optimal performance

## 📦 Prerequisites

- Node.js (version 16 or higher)
- npm (version 8 or higher)

## 🛠 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vehicle-inventory
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧪 Running Tests

Run the comprehensive test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## 🏗 Building for Production

Build the application for production:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── SearchBar/      # ZIP code search component
│   ├── VehicleCard/    # Individual vehicle display
│   ├── VehicleGrid/    # Vehicle grid layout
│   └── Filters/        # Filter and sort controls
├── hooks/              # Custom React hooks
│   └── useVehicleSearch.ts # Main search/filter/sort logic
├── data/               # Vehicle data and utilities
│   └── vehicles.ts     # Hardcoded vehicle data
├── types/              # TypeScript type definitions
│   └── Vehicle.ts      # Vehicle interface and types
├── theme/              # Styled-components theme
│   └── index.ts        # Theme configuration
└── __tests__/          # Test files
```