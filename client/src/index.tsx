import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import {QueryClient, QueryClientProvider} from "react-query";
import {UserProvider} from "./contexts/UserContext/UserProvider";

export const Context = createContext({userStore: new UserStore()});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
      <UserProvider >
          <App/>
      </UserProvider>
  </QueryClientProvider>




);

