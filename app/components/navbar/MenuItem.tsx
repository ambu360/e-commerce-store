"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  isSignOut?:boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick, isSignOut }) => {
  return (
    <div
      onClick={onClick}
      className={`
        px-4
         py-3
         ${isSignOut ? `hover:bg-rose-300` : "hover:bg-amber-100"} `}
    >
      {label}
    </div>
  );
};

export default MenuItem;
