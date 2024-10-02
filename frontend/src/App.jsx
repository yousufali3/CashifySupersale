import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthForm from "./pages/AuthForm";
import Forgetpassword from "./pages/Forgetpassword";
import Carousel from "./components/Carousel";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import MyOders from "./components/MyOders";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/forget-password" element={<Forgetpassword />} />
        {/* Add other routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOders />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
