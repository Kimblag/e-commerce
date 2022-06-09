import { Route, Routes } from "react-router-dom";
import TabNav from "./components/tabNav/TabNav";
import Cart from "./pages/Cart";
import CatalogPage from "./pages/CatalogPage";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginSuccess from "./pages/LoginSuccess";
import OrderDetail from "./pages/OrderDetail";
import PaymentCancel from "./pages/PaymentCancel";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import WishList from "./pages/WishList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogue" element={<CatalogPage />} />
      <Route path="/details/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route exact path="/signin/success" element={<LoginSuccess />} />
      <Route exact path="/profile" element={<TabNav />} />
      <Route exact path="/wishlist" element={<WishList />} />
      <Route exact path="/checkout" element={<Checkout />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/order-detail/:id" element={<OrderDetail />} />
    </Routes>
  );
}

export default App;
