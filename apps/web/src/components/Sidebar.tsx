import React from "react";
import {
  Megaphone,
  AlertCircle,
  Moon,
  Gift,
  Soup,
  Baby,
  Users,
  Droplets,
  HandCoins,
  GraduationCap,
  Eye,
  MapPin,
  Coins,
  HandHeart,
  Hammer,
} from "lucide-react";

interface Category {
  id: string;
  label: string;
  icon: typeof Megaphone; // any icon component type
}

interface SidebarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  categories: Category[];
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory, categories }) => {
  return (
    <aside className="w-full lg:w-80 shrink-0 p-6 sticky top-10">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6 px-4">
        CATEGORIES
      </h3>
      <nav className="flex flex-col space-y-1">
        <button
          onClick={() => setActiveCategory("ALL")}
          className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-colors ${
            activeCategory === "ALL"
              ? "bg-[#111111] text-white font-bold"
              : "text-gray-600 hover:bg-black/5 hover:text-[#111111] font-medium"
          }`}
        >
          <HandHeart className="w-5 h-5" />
          <span className="text-sm">ALL PROJECTS</span>
        </button>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-colors ${
                isActive
                  ? "bg-[#111111] text-white font-bold"
                  : "text-gray-600 hover:bg-black/5 hover:text-[#111111] font-medium"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm text-left">{cat.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
