import { Route, Routes } from "react-router-dom";
import "../styles/App.scss";
import Navbar from "./Navbar";
import Login from "./Login";
import ProductList from "./ProductList";
import Signup from "./Signup";
import NotFound from './NotFound';
import Hero from "./Hero";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, setEntities } from '../store/slices/productsSlice';


function App() {


  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productsSlice.entities);


  useEffect(() => {
    if (productList.length === 0) {
      dispatch(fetchProducts()).then((resultAction) => {
        if (fetchProducts.fulfilled.match(resultAction)) {
          dispatch(setEntities(resultAction.payload));
        }
      });
    }
  }, [productList, dispatch]);



  return (

    <div className="app">

      <Navbar
      />
      <div className="app__container">
        <Routes>
          <Route path="/"
            element={
              <>
                <Hero />
                <ProductList
                />

              </>}
          ></Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </div>

  );
}

export default App;
