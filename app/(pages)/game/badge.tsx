import { X } from "react-feather";

type GameBadgeProps = {
  label: string;
  onRemove: () => void;
};

const badgeColors = [
  "bg-[#9c9cff8f]",
  "bg-green-500",
  "bg-[#ff7777c2]",
  "bg-purple-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-teal-500",
];

const getBadgeColor = (name: string) => {
  return badgeColors[name.length % badgeColors.length];
};

export const GameBadge: React.FC<GameBadgeProps> = ({ label, onRemove }) => {
  return (
    <span
      className={`${getBadgeColor(
        label
      )} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2`}
    >
      {label}
      <button
        onClick={onRemove}
        className="ml-1 hover:bg-white/30 rounded-full p-0.5 cursor-pointer"
        aria-label={`Remove ${label}`}
      >
        <X size={18}/>
      </button>
    </span>
  );
};

export default GameBadge;
