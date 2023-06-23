
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./pages/header/Header";
import MainRoutes from "./routes/MainRoutes";
import { GetCurrentLocation } from "./services/ShareApi";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem("lat", position.coords.latitude)
        localStorage.setItem("lng", position.coords.longitude)
        dispatch(GetCurrentLocation(position.coords))
        
      }
      )
    }

  }, []);
  return (
    <div>
     <>
      {/* <Header /> for update*/}
     {/* <Header /> for update*/}
     <MainRoutes />
     </>
    </div>
  );
}

export default App;
