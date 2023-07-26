import { useNavigate } from 'react-router-dom';
import { PowerIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export const Navbar = ({ Content, RightSide }) => {
  const navigate = useNavigate();
  function backArrowClick() {
    navigate('/welcome');
  }

  return (
    <div className="flex justify-between">
      <div className="flex-1 relative">
        <div className="absolute left-4 top-10 transform -translate-y-1/2">
          <PowerIcon
            onClick={backArrowClick}
            className=" m-0 bg-white border-black cursor-pointer w-12 h-12 p-2 ml-3 shadow-xl border rounded-full "
          />
        </div>
      </div>
      <div className="flex-1 mx-auto rounded-lg flex flex-col items-center mt-4">{Content}</div>
      <div className="flex-1 flex justify-end mr-4">
        <div className="flex flex-col">{RightSide}</div>
      </div>
    </div>
  );
};

export const NavbarPage = ({ title, RightSide }) => {
  return (
    <div className="flex justify-between">
      <div className="flex-1 relative">
        <ArrowLeftComponent />
      </div>
      <div className="flex-1">
        <h2 className=" text-3xl text-blue-300 border bg-white rounded-xl mx-auto font-semibold italic text-center p-4 m-4">{title}</h2>
      </div>
      <div className="flex-1 flex justify-end">
        <div className="pr-4">{RightSide}</div>
      </div>
    </div>
  );
};

export const NavbarAlternative = ({ title, children }) => (
  <div className="flex flex-col bg-blue-200 w-screen h-screen">
    <ArrowLeftComponent />
    <div className="flex flex-col mt-8 items-center">
      <h1 className="text-4xl font-bold underline">{title}</h1>
      <div className="pt-8 gap-4 flex flex-col">{children}</div>
    </div>
  </div>
);

export const ArrowLeftComponent = () => {
  const navigate = useNavigate();
  function backArrowClick() {
    navigate('/');
  }
  return (
    <div className="absolute left-4 top-10 transform -translate-y-1/2">
      <ArrowLeftIcon onClick={backArrowClick} className="bg-white border-black cursor-pointer w-12 h-12 p-2  shadow-xl border rounded-full" />
    </div>
  );
};
