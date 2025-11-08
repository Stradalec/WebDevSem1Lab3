export function AddButton({ id, className, content, onClick, children }) {
  return (
    <button id={id} className={className} onClick={onClick}>
      {content} {children}
    </button>
  );
}
