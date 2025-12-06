export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Return login page without admin layout
  // Auth check is handled client-side in the login page component
  return <>{children}</>
}

