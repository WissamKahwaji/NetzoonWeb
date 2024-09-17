import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./layouts/header";
import { useEffect } from "react";
import { useGetUserByIdQuery } from "./apis/user/queries";
import { useAppSelector } from "./app/hooks";
import { selectCartValues } from "./features/cart/slice";
import Footer from "./layouts/footer";
import { useGetAllDepartmentsQuery } from "./apis/departments/queries";
import LoadingComponent from "./components/pages/loading/LoadingComponent";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";

// import Footer from "./layouts/footer";

function App() {
  const { pathname } = useLocation();
  const cartValues = useAppSelector(selectCartValues);
  const userId = localStorage.getItem("userId");
  const userChat = localStorage.getItem("username");
  const { data: userInfo } = useGetUserByIdQuery(userId);
  const {
    data: departmentsInfo,
    isError,
    isLoading,
  } = useGetAllDepartmentsQuery();
  useEffect(() => {
    localStorage.setItem("cartValues", JSON.stringify(cartValues));
  }, [cartValues]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isError) return <div>Error !!!</div>;
  if (isLoading) return <LoadingComponent />;
  return (
    <SendbirdProvider
      appId={`D27C6110-9DB9-4EBE-AA85-CF39E2AF562E`}
      userId={userChat ?? ""}
    >
      <div>
        <Navbar
          profileImage={userInfo?.profilePhoto}
          username={userInfo?.username}
          departmentsInfo={departmentsInfo}
        />

        <main className=" mt-[130px] sm:mt-[53px] md:mt-[190px] lg:mt-[114px] xl:mt-[114px]">
          <Outlet />
        </main>

        <Footer departmentsInfo={departmentsInfo} />
      </div>
    </SendbirdProvider>
  );
}

export default App;
