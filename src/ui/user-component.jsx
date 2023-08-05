import { useSelector } from 'react-redux';

export const UserComponent = () => {
  // why redux when we can just use localStorage with jwt
  const { username, avatarurl } = useSelector(state => state.user);
  return (
    <div className="   flex justify-center space-x-2 items-center ">
      <img className="  w-12 h-12 rounded-full" src={avatarurl} alt="user" />
      <div className="text-center  text-lg font-serif text-gray-700">
        Hello,
        <span className=" font-semibold ml-2  text-gray-950">{username ? username : 'please login guest'}</span>{' '}
      </div>
    </div>
  );
};
