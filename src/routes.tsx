import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes as BrowserRouterRoutes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";
import HomePage from "./pages/home";
import SignInPage from "./pages/signIn/SignInPage";
import SignUpPage from "./pages/signup/SignUpPage";
import CategoriesPage from "./pages/categories";
import UsersListByTypePage from "./pages/categories/UsersListByTypePage";
import FactoriesCategoriesListPage from "./pages/categories/FactoriesCategoriesListPage";
import FactoryUsersPage from "./pages/categories/FactoryUsersPage";
import DepartmentCategoriesPage from "./pages/departments/DepartmentCategoriesPage";
import ProductList from "./pages/products/ProductList";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import VehiclesListPage from "./pages/vehicle/VehiclesListPage";
import VehicleDetailsPage from "./pages/vehicle/VehicleDetailsPage";
import RealEstateListPage from "./pages/real-estate/RealEstateListPage";
import RealEstateDetailsPage from "./pages/real-estate/RealEstateDetailsPage";
import DealsCategoriesListPage from "./pages/deals/DealsCategoriesListPage";
import DealsListPage from "./pages/deals/DealsListPage";
import DealsDetailsPage from "./pages/deals/DealsDetailsPage";
import AdsListPage from "./pages/advertising/AdsListPage";
import AdsDetailsPage from "./pages/advertising/AdsDetailsPage";
import NewsListPage from "./pages/news/NewsListPage";
import NewsDetailsPage from "./pages/news/NewsDetailsPage";
import ServiceCategoriesListPage from "./pages/services/ServiceCategoriesListPage";
import ServiceListPage from "./pages/services/ServiceListPage";
import ServiceDetailsPage from "./pages/services/ServiceDetailsPage";
import ProfilePage from "./pages/profiles/ProfilePage";
import CartPage from "./pages/cart";
import DeliveryDetailsPage from "./components/pages/cart/DeliveryDetailsPage";
import SummeryOrderPage from "./components/pages/cart/SummeryOrderPage";

const Routes = () => {
  // const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouterRoutes>
          {/* Public Routes */}

          {/* Main App Routes */}
          <Route path="/" element={<App />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<HomePage />} />
            <Route path="signin" element={<SignInPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route
              path="categories/:userType"
              element={<UsersListByTypePage />}
            />
            <Route path="categories/:userType/:id" element={<ProfilePage />} />
            <Route
              path="categories/facroties-categories"
              element={<FactoriesCategoriesListPage />}
            />
            <Route
              path="categories/facroties-categories/:id"
              element={<FactoryUsersPage />}
            />
            <Route
              path="categories/facroties-categories/:id/:id"
              element={<ProfilePage />}
            />

            <Route
              path="categories/facroties-categories/:id/:id/services/:id"
              element={<ServiceDetailsPage />}
            />

            <Route
              path="departments/:departmentId"
              element={<DepartmentCategoriesPage />}
            />
            <Route
              path="departments/:departmentId/:categoryId/products"
              element={<ProductList />}
            />

            <Route
              path="departments/:departmentId/:categoryId/products/:productId"
              element={<ProductDetailsPage />}
            />
            <Route
              path="/categories/:userType/:userId/:productId"
              element={<ProductDetailsPage />}
            />
            <Route
              path="/categories/:userType/:userId/services/:id"
              element={<ServiceDetailsPage />}
            />

            <Route
              path="vehicles/:vehicleType"
              element={<VehiclesListPage />}
            />
            <Route
              path="vehicles/:vehicleType/:id"
              element={<VehicleDetailsPage />}
            />

            <Route path="real-estate" element={<RealEstateListPage />} />
            <Route path="real-estate/:id" element={<RealEstateDetailsPage />} />

            <Route path="deals" element={<DealsCategoriesListPage />} />
            <Route path="deals/:categoryId" element={<DealsListPage />} />
            <Route
              path="deals/:categoryId/:id"
              element={<DealsDetailsPage />}
            />

            <Route path="ads" element={<AdsListPage />} />
            <Route path="ads/:id" element={<AdsDetailsPage />} />

            <Route path="news" element={<NewsListPage />} />
            <Route path="news/:id" element={<NewsDetailsPage />} />

            <Route path="services" element={<ServiceCategoriesListPage />} />
            <Route path="services/:categoryId" element={<ServiceListPage />} />
            <Route
              path="services/:categoryId/:id"
              element={<ServiceDetailsPage />}
            />

            <Route path="your-cart" element={<CartPage />} />
            <Route path="delivery-details" element={<DeliveryDetailsPage />} />
            <Route path="summery-order" element={<SummeryOrderPage />} />
          </Route>
        </BrowserRouterRoutes>
      </Suspense>
    </Router>
  );
};

export default Routes;
