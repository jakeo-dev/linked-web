type ButtonProps = {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} flex bg-gray-200 hover:bg-gray-300 active:bg-gray-400/50 text-black text-center justify-center rounded-lg px-3.5 py-1 transition-all`}
    >
      {props.children}
      {/* <div className="flex items-center mx-auto">{props.children}</div> */}
    </button>
  );
}
