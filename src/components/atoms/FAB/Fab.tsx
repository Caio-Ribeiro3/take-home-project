import "./fab.css";

interface iProps {
  onClick: () => void;
  children: React.FC | string;
  disabled?: boolean;
}
const Fab = (props: iProps) => {
  const { onClick, children, disabled } = props;
  return (
    <button disabled={disabled} className="fab" onClick={onClick}>
      {children}
    </button>
  );
};

export default Fab;
