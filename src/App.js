import { createContext, Suspense, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, useLocation, } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import 'aos/dist/aos.css';
import Aos from 'aos';
import store from './store/store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './shared/Loading';
import NavigationRoutes from './routes/NaviagtionRoutes';
export const GlobalInfo = createContext()


function App() {
  const [VenueEdit, SetVenueEdit] = useState(false)
  const [VenueId, SetVenueId] = useState(null)
  const [TournamentEdit, SetTournamentEdit] = useState(false)
  const [TournamentId, SetTournamentId] = useState(null)
  const [TeamEdit, SetTeamEdit] = useState(false)
  const [TeamId, SetTeamId] = useState(null)
  const [UserEdit, SetUserEdit] = useState(false)
  const [UserId, SetUserId] = useState(null)
  const [DivisionEdit, SetDivisionEdit] = useState(false)
  console.log("🚀 : ~ file: App.js:25 ~ App ~ DivisionEdit", DivisionEdit);
  const [DivisionId, SetDivisionId] = useState(null)

  useEffect(() => {
    Aos.init({
      duration: 2000,
      once: true,
    });
  }, [])
  return (
    <Suspense fallback={<Loading />}>
      <GlobalInfo.Provider value={{VenueEdit,SetVenueEdit,VenueId,SetVenueId,TournamentEdit,SetTournamentEdit,TournamentId,SetTournamentId,TeamEdit, SetTeamEdit,TeamId, SetTeamId,UserEdit, SetUserEdit,UserId, SetUserId,DivisionEdit, SetDivisionEdit,DivisionId, SetDivisionId}}>
        <ProSidebarProvider>
          <Router>
            <NavigationRoutes />
          </Router>
        </ProSidebarProvider>
      </GlobalInfo.Provider>
    </Suspense>
  );
}

export default App;
