import type { Metadata } from 'next';
import ProfileClient from '@/components/ProfileClient';
import PrivateRoute from '@/components/PrivateRoute';

export const metadata: Metadata = { title: 'My Profile' };

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfileClient />
    </PrivateRoute>
  );
}
