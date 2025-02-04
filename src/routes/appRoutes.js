import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import {
  HomeContainer,
  AboutContainer,
  RecipeContainer,
  ContactContainer,
  PageNotFoundContainer
} from '../containers/pages';
import DashboardContainer from '../containers/DashboardContainer';

import {
  RegisterContainer,
  ActivateContainer,
  LoginContainer,
  LogoutContainer,
  ForgotPasswordContainer,
  ResetPasswordContainer
} from '../containers/auth';

import {
  AddRecipeContainer,
  ViewRecipeContainer,
  UpdateRecipeContainer,
  ViewPublicRecipeContainer
} from '../containers/recipes'

const AppRoutes = ({ user }) => {

  function RequireAuth({ children }) {
    const location = useLocation();

    return user ? (
        children
    ) : (
        <Navigate to="/auth/login" replace state={{ path: location.pathname }} />
    );
  }

  function MustNotAuth({ children }) {
    return !user ? children : <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route exact path="/" element={<HomeContainer />} />
      <Route path="/home" element={<HomeContainer />} />
      <Route path="/about" element={<AboutContainer />} />
      <Route path="/recipes" element={<RecipeContainer />} />
      <Route path="/contact" element={<ContactContainer />} />

      <Route path="/auth/register" element={
        <MustNotAuth>
          <RegisterContainer />
        </MustNotAuth>
      } />
      <Route path="/auth/activate/:email/:token" element={
        <MustNotAuth>
          <ActivateContainer />
        </MustNotAuth>
      } />
      <Route path="/auth/login" element={
        <MustNotAuth>
          <LoginContainer />
        </MustNotAuth>
      } />
      <Route path="/auth/logout" element={<LogoutContainer />} />
      <Route path="/auth/forgot-password" element={
        <MustNotAuth>
          <ForgotPasswordContainer />
        </MustNotAuth>
      } />
      <Route path="/auth/reset-password/:email/:token" element={
        <MustNotAuth>
          <ResetPasswordContainer />
        </MustNotAuth>
      } />

      <Route path="/dashboard" element={
        <RequireAuth>
          <DashboardContainer user={user} />
        </RequireAuth>
      } />

      <Route path="/add-recipe" element={
        <RequireAuth>
          <AddRecipeContainer />
        </RequireAuth>
      } />

      <Route path="/view-recipe/:recipe_uid" element={
        <RequireAuth>
          <ViewRecipeContainer />
        </RequireAuth>
      } />

      <Route path="/view/:recipe_uid" element={
          <ViewPublicRecipeContainer />
      } />

      <Route path="/edit-recipe/:recipe_uid" element={
        <RequireAuth>
          <UpdateRecipeContainer />
        </RequireAuth>
      } />

      <Route element={<PageNotFoundContainer />} />
    </Routes>
  );
};



export default AppRoutes;
