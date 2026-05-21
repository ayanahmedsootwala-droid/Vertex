import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd(), 'src', 'pages');
const pages = [
  'HomePage',
  'InventoryPage',
  'CarDetailPage',
  'ComparePage',
  'AuctionsListPage',
  'AuctionDetailPage',
  'BlogPage',
  'SellCarPage',
  'UserDashboardPage',
  'LoginPage',
  'RegisterPage',
  'NotFoundPage',
  'DealerPublicPage',
  'ContactPage'
];
const dealershipPages = [
  'DealershipDashboard',
  'DealershipInventory',
  'DealershipLeads',
  'DealershipSales',
  'DealershipAnalytics',
  'DealershipCommunication',
  'DealershipTeam',
  'DealershipActivity'
];
const adminPages = [
  'AdminDashboard',
  'AdminInventory',
  'AdminModeration',
  'AdminVehicleDatabase',
  'AdminUsers',
  'AdminDealerships',
  'AdminAuctions',
  'AdminAuctionAnalytics',
  'AdminAnalytics',
  'AdminInquiries',
  'AdminBlog',
  'AdminTestimonials',
  'AdminBrands',
  'AdminHomepageSections',
  'AdminBrandCarousel',
  'AdminHeroBanner',
  'AdminTheme',
  'AdminBrandSettings',
  'AdminSeoSettings',
  'AdminSettings',
  'AdminPerformance',
  'AdminReports',
  'AdminImageCompression',
  'AdminNumberPlateBlur',
  'AdminGithub',
  'AdminSourceCode'
];

function createPage(dir, name) {
  const content = `import React from 'react';

const ${name}: React.FC = () => (
  <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900">
    <div className="max-w-3xl rounded-3xl border border-slate-300 bg-white/90 p-10 shadow-xl">
      <h1 className="text-4xl font-semibold mb-4">${name}</h1>
      <p className="text-base leading-7 text-slate-600">This is a placeholder page generated to make the app compile and run.</p>
    </div>
  </main>
);

export default ${name};
`;
  fs.writeFileSync(path.join(dir, `${name}.tsx`), content, 'utf8');
}

fs.mkdirSync(root, { recursive: true });
fs.mkdirSync(path.join(root, 'dealership'), { recursive: true });
fs.mkdirSync(path.join(root, 'admin'), { recursive: true });

pages.forEach((name) => createPage(root, name));
dealershipPages.forEach((name) => createPage(path.join(root, 'dealership'), name));
adminPages.forEach((name) => createPage(path.join(root, 'admin'), name));

console.log('Created', pages.length + dealershipPages.length + adminPages.length, 'page stub files.');
