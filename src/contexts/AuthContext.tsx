import { createContext, useContext } from 'react'
import useFirebaseAuth from '../hooks/useFirebaseAuth';

//TODO : add type safety
const AuthUserContext = createContext<any>({
  authUser: null,
  loading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signInWithGoogle: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOutUser: async () => {}
});

// custom hook to use the AuthUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext);

const AuthUserProvider = ({ children }: any) => {
  const auth = useFirebaseAuth();
  // eslint-disable-next-line react/react-in-jsx-scope
  return <AuthUserContext.Provider  value={auth}>{children}</AuthUserContext.Provider>;
}

export default AuthUserProvider;


