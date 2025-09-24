import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import StatisticsPage from "./components/statistics/StatisticsPage.tsx";
import Chatbot from "./components/ChatBot.tsx";
import GameDetailPage from "./components/GameDetailPage.tsx";
import RouteGuard from "./components/RouteGuard.tsx";
import SecurityContextProvider from "./context/SecurityContextProvider.tsx";
import {StompContextProvider} from "./context/StompContext.tsx";
import ProfilePage from "./components/ProfilePage.tsx";
import HomePage from "./components/HomePage.tsx";
import StorePage from "./components/StorePage.tsx";
import AnalyticsPage from "./components/analytics/AnalyticsPage.tsx";
import PredictionsPage from "./components/predictions/PredictionsPage.tsx";
import AddGamePage from "./components/AddGamePage.tsx";
import MyGamesPage from "./components/MyGamesPage.tsx";
import InvitationToPlayGamePopUp from "./components/invitationToPlayGamePopUp/InvitationToPlayGamePopUp.tsx";

const queryClient = new QueryClient();

function Layout() {
    return (
        <div className="main">
            <Navbar/>
            <div className="container">
                <Outlet/>
            </div>
            <Chatbot/>
            <Footer/>
        </div>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <SecurityContextProvider>
                    <StompContextProvider>
                        <Routes>
                            <Route path="/" element={<Layout/>}>
                                <Route index element={<HomePage/>}/>
                                <Route
                                    path="/store"
                                    element={
                                        <RouteGuard allowedRoles={["normal-player", "admin"]}>
                                            <StorePage/>
                                        </RouteGuard>
                                    }
                                />
                                <Route
                                    path="/store/:name"
                                    element={
                                        <RouteGuard allowedRoles={["admin", "normal-player"]}>
                                            <GameDetailPage/>
                                        </RouteGuard>
                                    }
                                />
                                <Route
                                    path="/my-games"
                                    element={<RouteGuard allowedRoles={["normal-player"]}><MyGamesPage/></RouteGuard>}
                                />

                                <Route
                                    path="/statistics"
                                    element={
                                        <RouteGuard allowedRoles={["admin"]}>
                                            <StatisticsPage/>
                                        </RouteGuard>
                                    }
                                />
                                <Route
                                    path="/analytics"
                                    element={
                                        <RouteGuard allowedRoles={["admin"]}>
                                            <AnalyticsPage/>
                                        </RouteGuard>
                                    }
                                />
                                <Route
                                    path="/predictions"
                                    element={
                                        <RouteGuard allowedRoles={["admin"]}>
                                            <PredictionsPage/>
                                        </RouteGuard>
                                    }
                                />
                                <Route
                                    path="/add-game"
                                    element={
                                        <RouteGuard allowedRoles={["admin"]}>
                                            <AddGamePage/>
                                        </RouteGuard>}
                                />

                                <Route
                                    path="/profile"
                                    element={
                                        <RouteGuard allowedRoles={["normal-player"]}>
                                            <ProfilePage/>
                                        </RouteGuard>
                                    }
                                />
                            </Route>
                        </Routes>
                        <InvitationToPlayGamePopUp />
                    </StompContextProvider>
                </SecurityContextProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}


export default App;
