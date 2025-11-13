// Navbar.tsx

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {/* User profile/settings can go here */}
        <div className="text-sm text-gray-600">User: Admin</div>
      </div>
    </header>
  );
}