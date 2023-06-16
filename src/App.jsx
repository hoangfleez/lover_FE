import { Route, Routes } from "react-router-dom";

import Home from "./page/home/Home";
import Body from "./page/home/body/Body";
import AddProvider from "./page/Provider/AddProvider";
import ShowAndEditInfo from "./page/user/Profile/ShowAndEditInfo";
import DetailProvider from "./page/Provider/detailProvider";


function App() {
    return (
        <>
            <Routes>
                <Route path="" element={<Home/>}>
                    <Route path="" element={<Body/>}/>
                    <Route path="profile" element={<ShowAndEditInfo/>}/>
                    <Route path="add-provider" element={<AddProvider/>}/>
                    <Route path="detail-provider/:id" element={<DetailProvider/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
