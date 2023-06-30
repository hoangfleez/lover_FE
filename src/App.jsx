import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./page/home/Home";
import Body from "./page/home/body/Body";
import AddProvider from "./page/Provider/Setting/AddProvider";
import ShowAndEditInfo from "./page/user/Profile/ShowAndEditInfo";
import DetailProvider from "./page/Provider/detailProvider";
import PersonalPage from "./page/user/personalPage/PersonalPage";
import UserContent from "./page/user/UserContent";
import ShowAccountUser from "./page/admin/ShowAccountUser.jsx";
import ServiceSetting from "./page/Provider/ServiceSetting";
import HomeAdmin from "./page/admin/AdminPage";
import Order from "./page/booking/Order.jsx";
import OrderAccept from "./page/booking/OrderAccept.jsx";
import OrderPendingProvider from "./page/booking/OrderPendingProvider.jsx";
import OrderAcceptProvider from "./page/booking/OrderAcceptProvider.jsx";
import OrderRejectProvider from "./page/booking/OrderRejectProvider.jsx";
import Done from "./page/booking/Done.jsx";
import ShowAll from "./page/home/body/lists/ShowAll";
import ProviderContent from "./page/Provider/ProviderContent/ProviderContent";
import { useSelector } from "react-redux";

function App() {
  let user = useSelector(({ user }) => {
    return user.currentUser;
  });

  return (
    <>
      <Routes>
        <Route path="" element={<Home />}>
          <Route path="" element={<Body />}>
            <Route path="" element={<ShowAll />} />
          </Route>
          <Route path="detail-provider/:id" element={<DetailProvider />} />
          {user ? (
            <>
              <Route path="page" element={<PersonalPage />} />
              <Route path="customer_info" element={<UserContent />}>
                <Route path="" element={<ShowAndEditInfo />} />
                <Route path="order" element={<Order />} />
                <Route path="accept" element={<OrderAccept />} />
              </Route>
              <Route path="provider_setting" element={<ProviderContent />}>
                <Route path="" element={<ServiceSetting />} />
                <Route
                  path="pendingProvider"
                  element={<OrderPendingProvider />}
                />
                <Route
                  path="rejectProvider"
                  element={<OrderRejectProvider />}
                />
                <Route
                  path="acceptProvider"
                  element={<OrderAcceptProvider />}
                />
              </Route>
              <Route path="add-provider" element={<AddProvider />} />
              <Route path="admin" element={<HomeAdmin />} />
              <Route path="user" element={<ShowAccountUser />} />
              <Route path="done" element={<Done />} />
            </>
          ) : (
            <>
              <Route path={"*"} element={<Navigate to={"/"} />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;
