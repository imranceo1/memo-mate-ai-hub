
import { lazy } from 'react';

// Lazy load heavy components for better performance
export const Dashboard = lazy(() => import('@/pages/Dashboard'));
export const Chat = lazy(() => import('@/pages/Chat'));
export const Timeline = lazy(() => import('@/pages/Timeline'));
export const Reminders = lazy(() => import('@/pages/Reminders'));
export const Settings = lazy(() => import('@/pages/Settings'));
export const Sharing = lazy(() => import('@/pages/Sharing'));
export const Login = lazy(() => import('@/pages/Login'));
