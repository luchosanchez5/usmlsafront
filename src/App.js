import { createContext, Suspense, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import "aos/dist/aos.css";
import Aos from "aos";
import Loading from "./shared/Loading";
import NavigationRoutes from "./routes/NaviagtionRoutes";
export const GlobalInfo = createContext();

function App() {
  const [VenueEdit, SetVenueEdit] = useState(false);
  const [VenueId, SetVenueId] = useState(null);
  const [TournamentEdit, SetTournamentEdit] = useState(false);
  const [TournamentId, SetTournamentId] = useState(null);
  const [TeamEdit, SetTeamEdit] = useState(false);
  const [TeamId, SetTeamId] = useState(null);
  const [UserEdit, SetUserEdit] = useState(false);
  const [UserId, SetUserId] = useState(null);
  const [DivisionEdit, SetDivisionEdit] = useState(false);
  const [DivisionId, SetDivisionId] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    Aos.init({
      duration: 2000,
      once: true,
    });
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <GlobalInfo.Provider
        value={{
          VenueEdit,
          SetVenueEdit,
          VenueId,
          SetVenueId,
          TournamentEdit,
          SetTournamentEdit,
          TournamentId,
          SetTournamentId,
          TeamEdit,
          SetTeamEdit,
          TeamId,
          SetTeamId,
          UserEdit,
          SetUserEdit,
          UserId,
          SetUserId,
          DivisionEdit,
          SetDivisionEdit,
          DivisionId,
          SetDivisionId,
          isCollapsed,
          setIsCollapsed,
          isSidebarOpen,
          setIsSidebarOpen,
        }}
      >
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
