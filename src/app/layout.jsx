import './globals.css';

export const metadata = {
  title: 'Ruby Seher · Full Stack Developer',
  description:
    'Full Stack Developer specializing in React, TypeScript, and cloud-native tools. Open to relocation worldwide.',
  keywords: ['Ruby Seher', 'Full Stack Developer', 'React', 'TypeScript', 'Next.js', 'Frontend Developer', 'JPMorgan'],
  authors: [{ name: 'Ruby Seher', url: 'https://github.com/Rubyseher' }],
  openGraph: {
    title: 'Ruby Seher · Full Stack Developer',
    description: 'Full Stack Developer specializing in React, TypeScript, and cloud-native tools.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
