import { useEffect, useState } from 'react';
import { GetAllOnlineUsers } from '../fetches';
import { NavbarAlternative } from '../ui/navbar';

const tempData = [
  {
    date: '2023-09-01T00:00:00.000Z',
    quest: 'Quest 1',
    monster: 'Monster 1',
    action: 'Action 1',
    timer: '00:00:00',
  },
  {
    date: '2023-09-01T00:00:00.000Z',
    quest: 'Quest 2',
    monster: 'Monster 2',
    action: 'Action 2',
    timer: '00:00:00',
  },
  {
    date: '2023-09-01T00:00:00.000Z',
    quest: 'Quest 3',
    monster: 'Monster 3',
    action: 'Action 3',
    timer: '00:00:00',
  },
];

const LogPage = () => {
  const [logData, setLogData] = useState([]);

  // fetch online users from backend
  useEffect(() => {
    GetAllOnlineUsers().then(data => {
      if (data !== undefined) {
        setLogData(tempData);
      }
    });
  }, []);

  return (
    <NavbarAlternative title="Log">
      {logData.length === 0 ? <div>Loading...</div> : logData.map((item, index) => <LogItem key={index} data={item} />)}
    </NavbarAlternative>
  );
};

const LogItem = ({ data }) => (
  <div className="flex items-center space-x-8">
    <table>
      <tbody>
        <tr>
          {Object.keys(data).map((key, index) => {
            return <TableRowItem key={index} data={data[key]} />;
          })}
        </tr>
      </tbody>
    </table>
  </div>
);

const TableRowItem = ({ data }) => (
  <td className="px-6 whitespace-nowrap">
    <div className="text-sm text-gray-900">{data}</div>
  </td>
);

export default LogPage;
