import React, { useMemo } from "react";
import { useAppStore } from "../../store/store";
import Notification from "./Notifications";
import TopBar from "./TopBar";
import UserOptions from "./UserOptions";

export default function TopBarContainer() {
  const userName = useAppStore((state) => state.user?.username);
  const logout = useAppStore((state) => state.logout);
  const notifications = useMemo(() => 10, []);

  return (
    // <TopBar statusText={`Hola, ${userName}.`}>
    <TopBar statusText={``}>
      <Notification notifications={notifications} />
      <UserOptions userName={userName || ""} onLogout={logout} />
    </TopBar>
  );
}
