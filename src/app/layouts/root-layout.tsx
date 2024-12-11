import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="max-w-[1100px] mx-auto">
      <Outlet />
    </div>
  );
}
