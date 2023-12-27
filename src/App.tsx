import "./App.scss";
import MyRoutes from "./routers/routes";
import React, { useEffect } from "react";
import { useAppStore } from "./store/store";
import { useNavigate } from "react-router-dom";
// import SignIn from './components/Signin';
import { UserAPIType } from "../src/api/auth-api";
import { getLocal } from "./services/local-storage";



function App() {
  const isLogged = useAppStore((state) => state.isLogged);

  const navigate = useNavigate();

  const getUser = useAppStore((state) => state.getUser);

  const user = getLocal<UserAPIType>("user");


  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLogged) {
      
      if (user?.username == 'jurp_peru') {
        navigate("/reservorios");
        return;
      }else{
        navigate("/escritorio");
        return;
      }
    }
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  return <MyRoutes />;
}

export default App;