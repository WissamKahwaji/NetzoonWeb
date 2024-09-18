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
import Checkout from "./components/pages/checkout";
import MyProfilePage from "./pages/my-profile/MyProfilePage";
import EditProfilePage from "./pages/profiles/EditProfilePage";
import ProtectedRoute from "./components/const/protected-route/ProtectedRoute";
import ManageOrderPage from "./pages/orders/ManageOrderPage";
import MyOrdersPage from "./pages/orders/MyOrdersPage";
import OrderDetailsPage from "./pages/orders/OrderDetailsPage";
import MyProductsPage from "./components/pages/product/MyProductsPage";
import MyFavoritesListPage from "./pages/profiles/MyFavoritesListPage";
import NetzoonCreditsPage from "./pages/profiles/NetzoonCreditsPage";
import AddItemPage from "./pages/add-item/AddItemPage";
import AddProductPage from "./pages/products/AddProductPage";
import AddEditServicePage from "./pages/services/AddEditServicePage";
import AddEditDealPage from "./pages/deals/AddEditDealPage";
import AddEditNewsPage from "./pages/news/AddEditNewsPage";
import AddEditDeliveryServicePage from "./pages/delivery-service/AddEditDeliveryServicePage";
import AddEditVehiclePage from "./pages/vehicle/AddEditVehiclePage";
import AddEditRealEstatePage from "./pages/real-estate/AddEditRealEstatePage";
import AddEditAdsPage from "./pages/advertising/AddEditAdsPage";
import AddAdsFromProfilePage from "./pages/advertising/AddAdsFromProfilePage";
import AllProductsPage from "./pages/products/AllProductsPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import AddAccountPage from "./pages/profiles/AddAccountPage";
import ForgetPasswordPage from "./pages/signIn/ForgetPasswordPage";
import ResetPasswordPage from "./pages/signIn/ResetPasswordPage";
import CompleteProfilePage from "./pages/profiles/CompleteProfilePage";
import MorePage from "./pages/more/MorePage";
import PrivacyPolicyPage from "./pages/more/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/more/TermsOfUsePage";
import ContactsPage from "./pages/more/ContactsPage";
import OpinionsPage from "./pages/more/OpinionsPage";
import ComplaintsPage from "./pages/more/ComplaintsPage";
import QuestionsPage from "./pages/more/QuestionsPage";
import RequestsPage from "./pages/more/RequestsPage";
import SendEmailPage from "./pages/more/SendEmailPage";
import ChatPage from "./pages/chat/ChatPage";

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
              path="departments/:departmentId/:categoryId/products/:productId/edit"
              element={<AddProductPage />}
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
            <Route
              path="vehicles/:vehicleType/:id/edit"
              element={<AddEditVehiclePage />}
            />

            <Route path="real-estate" element={<RealEstateListPage />} />
            <Route path="real-estate/:id" element={<RealEstateDetailsPage />} />
            <Route
              path="real-estate/:id/edit"
              element={<AddEditRealEstatePage />}
            />

            <Route path="deals" element={<DealsCategoriesListPage />} />
            <Route path="deals/:categoryId" element={<DealsListPage />} />
            <Route
              path="deals/:categoryId/:id"
              element={<DealsDetailsPage />}
            />
            <Route
              path="deals/:categoryId/:id/edit"
              element={<AddEditDealPage />}
            />

            <Route path="ads" element={<AdsListPage />} />
            <Route path="ads/:id" element={<AdsDetailsPage />} />
            <Route path="ads/:id/edit" element={<AddEditAdsPage />} />

            <Route path="news" element={<NewsListPage />} />
            <Route path="news/:id" element={<NewsDetailsPage />} />
            <Route path="news/:id/edit" element={<AddEditNewsPage />} />

            <Route path="services" element={<ServiceCategoriesListPage />} />
            <Route path="services/:categoryId" element={<ServiceListPage />} />
            <Route
              path="services/:categoryId/:id"
              element={<ServiceDetailsPage />}
            />
            <Route
              path="services/:categoryId/:id/edit"
              element={<AddEditServicePage />}
            />
            <Route
              path="my-account/services/:id"
              element={<ServiceDetailsPage />}
            />

            <Route element={<ProtectedRoute />}>
              <Route path="add" element={<AddItemPage />} />
              <Route path="add/product" element={<AddProductPage />} />
              <Route path="add/service" element={<AddEditServicePage />} />
              <Route path="add/deal" element={<AddEditDealPage />} />
              <Route path="add/news" element={<AddEditNewsPage />} />
              <Route path="add/adv" element={<AddEditAdsPage />} />
              <Route
                path="add/adv/profile"
                element={<AddAdsFromProfilePage />}
              />
              <Route path="add/all-products" element={<AllProductsPage />} />
              <Route
                path="add/delivery-service"
                element={<AddEditDeliveryServicePage />}
              />

              <Route
                path="add/vehicle/:category"
                element={<AddEditVehiclePage />}
              />
              <Route
                path="add/real-estate"
                element={<AddEditRealEstatePage />}
              />

              <Route path="my-account" element={<MyProfilePage />} />
              <Route
                path="my-account/netzoon-credits"
                element={<NetzoonCreditsPage />}
              />
              <Route path="my-account/products" element={<MyProductsPage />} />
              <Route
                path="my-account/favorites"
                element={<MyFavoritesListPage />}
              />
              <Route
                path="my-account/edit-profile"
                element={<EditProfilePage />}
              />
              <Route path="my-account/edit" element={<CompleteProfilePage />} />
              <Route
                path="my-account/manage-orders"
                element={<ManageOrderPage />}
              />
              <Route
                path="my-account/manage-orders/:id"
                element={<OrderDetailsPage />}
              />
              <Route path="my-account/my-orders" element={<MyOrdersPage />} />
              <Route
                path="my-account/my-orders/:id"
                element={<OrderDetailsPage />}
              />
              <Route
                path="my-account/add-account"
                element={<AddAccountPage />}
              />

              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="your-cart" element={<CartPage />} />
              <Route path="chat" element={<ChatPage />} />

              <Route path="more/contacts" element={<ContactsPage />} />
              <Route path="more/contacts/opinions" element={<OpinionsPage />} />
              <Route
                path="more/contacts/complaints"
                element={<ComplaintsPage />}
              />
              <Route
                path="more/contacts/question"
                element={<QuestionsPage />}
              />
              <Route path="more/contacts/requests" element={<RequestsPage />} />
              <Route
                path="more/contacts/send-email"
                element={<SendEmailPage />}
              />
            </Route>

            <Route path="more" element={<MorePage />} />
            <Route path="more/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="more/terms-of-use" element={<TermsOfUsePage />} />

            <Route path="forget-password" element={<ForgetPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="delivery-details" element={<DeliveryDetailsPage />} />
            <Route path="summery-order" element={<SummeryOrderPage />} />
            <Route path="summery-order/checkout" element={<Checkout />} />
          </Route>
        </BrowserRouterRoutes>
      </Suspense>
    </Router>
  );
};

export default Routes;
