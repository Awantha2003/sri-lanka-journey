import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { SearchSection } from './components/home/SearchSection';
import { PopularDestinations } from './components/home/PopularDestinations';
import { ActivitiesCarousel } from './components/home/ActivitiesCarousel';
import { TestimonialsSection } from './components/home/TestimonialsSection';

import { Dashboard } from './pages/admin/Dashboard';
import { Login } from './pages/auth/Login';
import Register from './pages/auth/Register';
import { AiTripPlanner } from './components/trip-planner/AiTripPlanner';
import ItineraryForm from './components/ItineraryForm';
import ItineraryDashboard from './pages/ItineraryDashboard';
import NearbySuggestions from './pages/NearbySuggestions';
import TravelTime from './pages/TravelTime';
import AdminTourManager from './pages/admin/AdminTourManager'; // ✅

import TourList from './pages/TourList';       // ✅ Tour list page
import TourDetails from './pages/TourDetails'; // ✅ Tour details page

import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <SearchSection />
        <PopularDestinations />
        <ActivitiesCarousel />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/plan-trip" element={<AiTripPlanner />} />
            <Route path="/planner" element={<ItineraryForm />} />
            <Route path="/itinerary-dashboard" element={<ItineraryDashboard />} />
            <Route path="/nearby" element={<NearbySuggestions />} />
            <Route path="/travel" element={<TravelTime />} />
            <Route path="/tours" element={<TourList />} />             {/* ✅ All tours */}
            <Route path="/tours/:id" element={<TourDetails />} />      {/* ✅ Single tour */}
                 
            import AdminTourManager from './pages/admin/AdminTourManager'; // ✅

<Route
  path="/admin/tours"
  element={
    <ProtectedRoute>
      <AdminTourManager />
    </ProtectedRoute>
  }
/>



            {/* Admin Route (Protected) */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
