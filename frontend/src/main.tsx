import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home.tsx";
import Layout from "./Components/Layout.tsx";
import Enterprise from "./Components/Enterprise/Enterprise.tsx";
import EnterpriseDetail from "./Components/Enterprise/EnterpriseDetail.tsx";
import EnterpriseCreate from "./Components/Enterprise/EnterpriseCreate.tsx";
import Store from "./Components/Store/Store.tsx";
import StoreDetail from "./Components/Store/StoreDetail.tsx";
import StoreCreate from "./Components/Store/StoreCreate.tsx";
import Product from "./Components/Product/Product.tsx";
import ProductDetail from "./Components/Product/ProductDetail.tsx";
import ProductCreate from "./Components/Product/ProductCreate.tsx";
import StoreStock from "./Components/Store/StoreStock.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Router>
        <Layout>
              <Routes>
                  <Route path="/enterprise" element={<Enterprise />} />
                  <Route path="/enterprise/:id" element={<EnterpriseDetail />} />
                  <Route path="/enterprise/create" element={<EnterpriseCreate />} />

                  <Route path="/store" element={<Store />} />
                  <Route path="/store/:id" element={<StoreDetail />} />
                  <Route path="/store/stock/:id" element={<StoreStock />} />
                  <Route path="/store/create" element={<StoreCreate />} />

                  <Route path="/product" element={<Product />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/product/create" element={<ProductCreate />} />
                  <Route path="/" element={<Home />}/>
              </Routes>
        </Layout>
      </Router>
  </React.StrictMode>,
)
