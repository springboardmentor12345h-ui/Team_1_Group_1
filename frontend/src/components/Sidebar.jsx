import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export default function Sidebar({
  title,
  activeTab,
  setActiveTab,
  items,
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
}) {
  const isCollapsed = collapsed ?? false;

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-16 left-0
          h-[calc(100vh-4rem)]
          bg-white
          border-r border-gray-200
          z-40
          flex flex-col
          transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-[68px]" : "w-64"}
        `}
      >
        {/* Header: title + collapse/close button */}
        <div
          className={`
            flex items-center h-14 flex-shrink-0 border-b border-gray-100
            ${isCollapsed ? "justify-center px-2" : "justify-between px-4"}
          `}
        >
          {!isCollapsed && (
            <h3 className="text-sm font-semibold text-gray-800 truncate">
              {title}
            </h3>
          )}

          {/* Desktop collapse toggle */}
          {setCollapsed && (
            <button
              onClick={() => setCollapsed(!isCollapsed)}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 transition flex-shrink-0"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
            </button>
          )}

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 transition"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-1 p-3 flex-1 overflow-hidden">
          {items.map((item) => {
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setMobileOpen(false);
                }}
                title={isCollapsed ? item.label : undefined}
                className={`
                  flex items-center gap-3
                  px-3 py-2.5
                  rounded-lg
                  text-sm
                  text-left
                  w-full
                  transition-all duration-200
                  ${isCollapsed ? "justify-center" : ""}
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}