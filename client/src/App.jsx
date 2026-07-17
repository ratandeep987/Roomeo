import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnerLayout from "./layouts/OwnerLayout";

import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookRoom from "./pages/BookRoom";
import MyBookings from "./pages/MyBookings";
import OwnerDashboard from "./pages/OwnerDashboard";
import MyHotels from "./pages/MyHotels";
import AddHotel from "./pages/AddHotel";
import OwnerHotelRooms from "./pages/OwnerHotelRooms";
import AddRoom from "./pages/AddRoom";
import EditRoom from "./pages/EditRoom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#13203A",
            color: "#FBF9F4",
            fontSize: "14px",
          },
        }}
      />
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />

          {/* Guest (logged-in, any role) */}
          <Route
            path="/rooms/:id/book"
            element={
              <ProtectedRoute>
                <BookRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* Owner-only, sharing the OwnerLayout sidebar shell */}
          <Route
            path="/owner"
            element={
              <ProtectedRoute ownerOnly>
                <OwnerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<OwnerDashboard />} />
            <Route path="hotels" element={<MyHotels />} />
            <Route path="hotels/new" element={<AddHotel />} />
            <Route path="hotels/:hotelId/rooms" element={<OwnerHotelRooms />} />
            <Route path="hotels/:hotelId/rooms/new" element={<AddRoom />} />
            <Route path="rooms/:id/edit" element={<EditRoom />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
