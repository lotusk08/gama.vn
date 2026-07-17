// The root page is now rendered directly by layout.tsx via the App component.
// Layout.tsx fetches CMS globals (header, footer) server-side and passes them to App.
// App.tsx fetches page blocks client-side with graceful fallbacks.
export default function Page() {
  return null;
}

