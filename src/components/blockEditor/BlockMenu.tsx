interface BlockMenuProps {
  onDelete: () => void;
}

const BlockMenu = ({ onDelete }: BlockMenuProps) => {
  return (
    <div className="absolute bottom-0 right-0 bg-white border text-5 border-gray-400 text-xs rounded shadow p-1 z-50 cursor-pointer transition-all hover:scale-105">
      <button onClick={onDelete} className="hover:text-red-500">
        X
      </button>
    </div>
  );
};

export default BlockMenu;
