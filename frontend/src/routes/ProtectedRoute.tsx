import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import type { Role } from '../types';

interface Props {
  children: React.ReactNode;
  roles?: Role[]; // if set, only these roles may enter
}

export default function ProtectedRoute({ children, roles }: Props) {
  const { token, user } = useAuth();
  if (!token || !user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
}
