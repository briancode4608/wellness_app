interface QuickLogButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

const QuickLogButton = ({ icon, label, onClick }: QuickLogButtonProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-1.5 bg-card rounded-lg p-3 border border-border shadow-sm active:scale-95 transition-transform min-w-[4.5rem]"
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[0.7rem] font-semibold text-muted-foreground">{label}</span>
  </button>
);

export default QuickLogButton;
