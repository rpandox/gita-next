import './globals.css';

export const metadata = {
  title: 'गीता — a sacred book you scroll through',
  description: 'The Bhagavad Gita, one shloka at a time.',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'गीता' },
};
export const viewport = {
  width: 'device-width', initialScale: 1, viewportFit: 'cover',
  themeColor: '#2b2b2e',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sa">
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html:
          `if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));`
        }} />
      </body>
    </html>
  );
}
