import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import WelcomePopup from "@/components/WelcomePopup";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

// Route-level code splitting: each page ships in its own chunk so the first
// load (critical on mobile networks) only downloads the shell + home.
const Home = lazy(() => import("@/pages/Home"));
const Shop = lazy(() => import("@/pages/Shop"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const OurStory = lazy(() => import("@/pages/OurStory"));
const Contact = lazy(() => import("@/pages/Contact"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const TrackOrder = lazy(() => import("@/pages/TrackOrder"));
const ShippingPolicy = lazy(() => import("@/pages/ShippingPolicy"));
const ReturnsRefunds = lazy(() => import("@/pages/ReturnsRefunds"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="font-display text-3xl tracking-[0.25em] text-foreground animate-fade-in">AUREVA</div>
    </div>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]"><Outlet /></main>
      <Footer />
      <CartDrawer />
      <WelcomePopup />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <CartProvider>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:categorySlug" element={<Shop />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/returns" element={<ReturnsRefunds />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </CartProvider>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App