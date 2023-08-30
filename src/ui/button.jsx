import { ExclamationTriangleIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/outline';

// Generic Button component
const Button = ({ onClick, children, className }) => (
  <button className={`w-13 h-13 cursor-pointer border border-black rounded-full ${className}`} onClick={onClick}>
    {children}
  </button>
);

const IconButton = ({ onClick, imgSrc, className }) => (
  <Button onClick={onClick} className={className}>
    <img alt="icon-button" src={imgSrc} className="w-10 h-10 p-2" />
  </Button>
);

const NavButton = ({ onClick, imgSrc }) => (
  <button onClick={onClick}>
    <img alt="some-alt-title" src={imgSrc} className="w-20 h-20 p-2" />
  </button>
);

const PlayButton = ({ onClick }) => (
  <PlayIcon onClick={onClick} className="w-12 h-12 bg-white cursor-pointer border border-black rounded-full p-2 text-green-400" />
);

const AddButton = ({ onClick }) => (
  <PlusIcon className="bg-white cursor-pointer rounded-full border border-black w-12 h-12 text-black p-2" onClick={onClick} />
);

const LogsIconButton = ({ onClick }) => (
  <ExclamationTriangleIcon onClick={onClick} className="w-12 h-12 bg-white cursor-pointer border border-black rounded-full p-2 text-orange-400" />
);

export { IconButton, PlayButton, AddButton, LogsIconButton, NavButton };
