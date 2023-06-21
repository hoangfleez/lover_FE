import React from "react";
import { useSelector } from "react-redux";
import { useUserProfile } from "../../customHook/useUserProfile";

export default function ServiceSetting() {
  const user = useUserProfile();

  return <>
    {user?.role.name !== "provider"? (<h1>ban can cap nhat CCCD</h1>):(<h1>Ban co the dung tinh nang nay</h1>)}
  </>;
}
