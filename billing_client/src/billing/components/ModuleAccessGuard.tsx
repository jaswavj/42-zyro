import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../../state/store';
import { defaultAppPath, hasModuleAccess, moduleIdForPath } from '../config/menu.config';
import { routerPathNames } from '../../routes/routerPathNames';

export const DefaultAppRedirect: React.FC = () => {
  const moduleIds = useSelector((s: RootState) => s.loginData.moduleIds || []);
  return <Navigate to={defaultAppPath(moduleIds)} replace />;
};

const ModuleAccessGuard: React.FC = () => {
  const location = useLocation();
  const moduleIds = useSelector((s: RootState) => s.loginData.moduleIds || []);
  const needed = moduleIdForPath(location.pathname);
  if (needed != null && !hasModuleAccess(moduleIds, needed)) {
    const dest = defaultAppPath(moduleIds);
    const destModule = moduleIdForPath(dest);
    if (destModule == null || hasModuleAccess(moduleIds, destModule)) {
      return <Navigate to={dest} replace />;
    }
    return <Navigate to={routerPathNames.users.changePassword} replace />;
  }
  return <Outlet />;
};

export default ModuleAccessGuard;
