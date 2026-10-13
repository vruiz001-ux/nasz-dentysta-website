import "./globals.css";

// The <html> element lives in app/[locale]/layout.tsx so `lang` matches the page language.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
