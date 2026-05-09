import './globals.css'

export const metadata = {
  title: 'Tic Tac Toe',
  description: 'A fully offline tic-tac-toe game with dark/light mode support',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
}

export const viewport = {
  themeColor: '#f8fafc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var stored = localStorage.getItem('ttt-theme');
              var valid = ['light', 'dark', 'cyberpunk', 'retro', 'pastel'];
              var fallback = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              var theme = valid.indexOf(stored) >= 0 ? stored : fallback;
              document.documentElement.setAttribute('data-theme', theme);
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        {children}
      </body>
    </html>
  )
}
