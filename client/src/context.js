import { createContext } from 'react';

const LoggedContext = createContext({
  logged: '',
  setLogged: () => {}
});

export default LoggedContext;
