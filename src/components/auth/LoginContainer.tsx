import React, { useCallback, useState } from "react";
import { useAppStore } from "../../store/store";
import ErrorMessage from "../common/message/ErrorMessage";
import Login from "./Login";

export default function LoginContainer() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = useAppStore((state) => state.login);
  const loginLoading = useAppStore((state) => state.loginLoading);
  const loginError = useAppStore((state) => state.loginError);

  const onLogin = useCallback(() => {
    login(userName, password);
  }, [userName, password, login]);

  return (
    <div className="d-flex justify-content-center pt-xl-5">
      <div style={{ maxWidth: "380px", paddingTop: "8rem" }}>
        <Login
          userName={userName}
          password={password}
          setUserName={setUserName}
          setPassword={setPassword}
          onLogin={onLogin}
          loginLoading={loginLoading}
        />
        {loginError && (
          <ErrorMessage className="mt-3" message="Datos incorrectos." />
        )}
      </div>
    </div>
  );
}
