import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/components/layouts/PublicLayout';

const NotFoundPage: React.FC = () => (
  <PublicLayout>
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl text-slate-600 mb-8">Page not found</p>
      <Link to="/">
        <Button size="lg">Go back home</Button>
      </Link>
    </div>
  </PublicLayout>
);

export default NotFoundPage;
