import { getUserData } from '../config/user';

export const UserComponent = () => {
  // why redux when we can just use localStorage with jwt
  const { userName, avatarID } = getUserData();
  return (
    <div className="   flex justify-center space-x-2 items-center ">
      <img className="  w-12 h-12 rounded-full" src={avatarID} alt="user" />
      <div className="text-center  text-lg font-serif text-gray-700">
        Hello,
        <span className=" font-semibold ml-2  text-gray-950">{userName ? userName : 'please login guest'}</span>{' '}
      </div>
    </div>
  );
};
