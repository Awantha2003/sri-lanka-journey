import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  currentTrip: null,
  savedTrips: [],
  bookings: [],
};

const BookingContext = createContext(undefined);

function bookingReducer(state, action) {
  switch (action.type) {
    case 'START_TRIP':
      return {
        ...state,
        currentTrip: action.payload,
      };
    case 'SAVE_TRIP':
      return {
        ...state,
        savedTrips: [...state.savedTrips, action.payload],
      };
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };
    case 'UPDATE_BOOKING_STATUS':
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking.id === action.payload.id
            ? { ...booking, status: action.payload.status }
            : booking
        ),
      };
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

export default BookingContext;