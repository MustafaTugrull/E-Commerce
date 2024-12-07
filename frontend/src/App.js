import BlogList from "./pages/BlogList";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ContactPage from "./pages/ContactPage";
import Account from "./pages/Account";
import ProductDetail from "./pages/ProductDetail";
import ShoppingCart from "./pages/ShoppingCart";
import SingleBlog from "./pages/SingleBlog";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import CategoryList from "./pages/Admin/Categories/CategoryList";
import CreateCategory from "./pages/Admin/Categories/CreateCategory";
import UpdateCategory from "./pages/Admin/Categories/UpdateCategory";
import ProductList from "./pages/Admin/Products/ProductList";
import CreateProduct from "./pages/Admin/Products/CreateProduct";
import UpdateProduct from "./pages/Admin/Products/UpdateProduct";
import Blogs from "./pages/Admin/Blogs/Blogs";
import CreateBlog from "./pages/Admin/Blogs/CreateBlog";
import UpdateBlogs from "./pages/Admin/Blogs/UpdateBlog";
import UserList from "./pages/Admin/Users/UserList";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<Account />} />
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route path="/blogDetail" element={<SingleBlog />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/admin/">
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/create" element={<CreateCategory />} />
          <Route path="categories/update/:id" element={<UpdateCategory />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="products/update" element={<UpdateProduct />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/create" element={<CreateBlog />} />
          <Route path="blogs/update/:id" element={<UpdateBlogs />} />
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
