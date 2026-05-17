// MyContext.js
import { createContext, useState } from "react";
import ls from "localstorage-slim";
import { iProfile } from "../models/profle";

export const AppContext = createContext({});
export default function AppStateProvider(props:any) {
  const [user, setUser] = useState<iProfile|null>(ls.get("wwph_usr", {decrypt : true}));

  const updateUser = (u:iProfile) => {
    ls.set("wwph_usr", u, {encrypt : true});
    setUser(u)
  };


  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

// export default {AppContext, useContextValues};
