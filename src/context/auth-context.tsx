import React, { useContext, useState } from "react";
import { parseCookies } from "nookies";
import { useQuery } from "react-query";
import { Axios, backendUrl, setAxiosBearerToken } from "../../lib/utils/backend";
import { User } from "../../lib/types/User";

interface AuthContextData {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const AuthContext = React.createContext<AuthContextData>({ setUser: () => {} });

const AuthProvider = ({ children }) => {
  const token = parseCookies().jwtToken;
  const [user, setUser] = useState<User | undefined>(undefined);
  // Run the /me query if jwtToken exists and user have not been fetched yet
  const { data: userInfo, isLoading } = useQuery(
    "me",
    async () => {
      setAxiosBearerToken(token);
      return await Axios.get<User>(backendUrl("auth/me")).then((data) => {
        setUser(data.data);
        return data.data;
      });
    },
    { enabled: token != "" && !user, retry: 1 }
  );

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
