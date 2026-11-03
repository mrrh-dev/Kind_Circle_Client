import type { Metadata } from 'next';
import ManageEventsClient from '@/components/ManageEventsClient';
import PrivateRoute from '@/components/PrivateRoute';

export const metadata: Metadata = { title: 'Manage Events' };

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <ManageEventsClient />
    </PrivateRoute>
  );
}
