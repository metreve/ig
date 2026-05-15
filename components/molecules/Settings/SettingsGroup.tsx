type SettingsGroupProps = {
  title: string;
  items: {
    label: string;
    description?: string;
    icon: React.ElementType;
  }[];
  active?: string;
};

export default function SettingsGroup({
  title,
  items,
  active,
}: SettingsGroupProps) {
  return (
    <div>
      <h2 className="mb-3 text-xs font-semibold text-zinc-500">{title}</h2>

      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className={`flex min-h-12 w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-sm transition ${
                active === item.label
                  ? "bg-zinc-100 dark:bg-[#262a2f]"
                  : "hover:bg-zinc-100 dark:hover:bg-[#161b22]"
              }`}
            >
              <Icon size={24} className="shrink-0" />

              <span>
                <span className="block font-semibold">{item.label}</span>

                {item.description && (
                  <span className="mt-1 block text-xs font-normal leading-snug text-zinc-500">
                    {item.description}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}