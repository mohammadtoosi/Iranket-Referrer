import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Authentication from "./pages/Authentication";
import Index from "./pages/dashboard/Interduce";
import MyTeam from "./pages/dashboard/MyTeam";
import MyMoney from "./pages/dashboard/MyMoney";
import Profile from "./pages/dashboard/Profile";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Authentication />} />
                <Route
                    path="dashboard"
                    element={
                        //<ProtectedRoute>
                            <Index />
                        //</ProtectedRoute>
                    }
                />
                <Route
                    path="my-team"
                    element={
                        <ProtectedRoute>
                            <MyTeam />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="income"
                    element={
                        <ProtectedRoute>
                            <MyMoney />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
