import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import { Navbar } from "./containers";

import { connect } from "react-redux";
import { authCheckState } from "./redux/auth/authActions";

import { Loader } from "./components";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const RegisterEntryPage = lazy(() => import("./pages/RegisterEntryPage"));
const MarkTeamEntryPage = lazy(() => import("./pages/MarkTeamEntryPage"));
const EntryLogSheetPage = lazy(() => import("./pages/EntryLogSheetPage"));
const RegisterNewUser = lazy(() => import("./pages/RegisterNewUser"));
const CodePage = lazy(() => import("./pages/CodePage"));
const NotFound404 = lazy(() => import("./pages/NotFound404"));

const renderLoader = () => {
  return <Loader />;
};

function App(props) {
  useEffect(() => {
    props.checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Suspense fallback={renderLoader()}>
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path={ROUTES.REGISTER_ENTRY} element={<RegisterEntryPage />} />
          <Route
            path={ROUTES.MARK_TEAM_ENTRY}
            element={<MarkTeamEntryPage />}
          />
          <Route path={ROUTES.LOG_SHEET} element={<EntryLogSheetPage />} />
          <Route path={ROUTES.NEW_USER} element={<RegisterNewUser />} />
          <Route path={ROUTES.ADMIN_LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.CODE} element={<CodePage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Suspense>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  checkAuth: () => dispatch(authCheckState()),
});

export default connect(null, mapDispatchToProps)(App);
