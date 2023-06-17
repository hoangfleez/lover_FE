import { Route, Routes } from "react-router-dom";

import Home from "./page/home/Home";
import Body from "./page/home/body/Body";
import AddProvider from "./page/Provider/AddProvider";
import ShowAndEditInfo from "./page/user/Profile/ShowAndEditInfo";
import DetailProvider from "./page/Provider/detailProvider";
import PersonalPage from "./page/user/personalPage/PersonalPage";
import UserContent from "./page/user/UserContent";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />}>
          <Route path="" element={<Body />} />
          <Route path="page" element={<PersonalPage />} />
          <Route path="customer_info" element={<UserContent />}>
            <Route path="" element={<ShowAndEditInfo />} />
          </Route>
          <Route path="add-provider" element={<AddProvider />} />
          <Route path="detail-provider/:id" element={<DetailProvider />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
