import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlineArrowDown as DownArrow } from 'react-icons/ai';
import useDragDrop from '../hooks/useDragDrop';
import { useNavigate } from 'react-router-dom';

const CheckboxItemDefault = ({ quest, isCheckboxDisabled, onChange }) => (
  <div className="flex items-center  space-x-2">
    <input
      type="checkbox"
      name={quest}
      className=" mr-2 w-8 h-8 "
      disabled={isCheckboxDisabled(quest)}
      checked={false}
      onChange={e => onChange(quest, e)}
      id={quest._id}
    />
    <img src="monster.png" alt="monsterImage" width="50" height="50"></img>
    <label className="text-xl font-bold">{quest.Quest}</label>
  </div>
);

const CheckboxItemPlaylist = ({ quest, isCheckboxDisabled, onChange, onClick }) => (
  <div className="flex items-center  space-x-2">
    <input
      type="checkbox"
      name={quest}
      className=" mr-2 w-8 h-8 "
      disabled={isCheckboxDisabled(quest)}
      checked={false}
      onChange={e => onChange(quest, e)}
      id={quest._id}
    />
    <label onClick={() => onClick(quest)} className="text-xl font-bold">
      {quest.name}
    </label>
  </div>
);

const ArrowButton = ({ IconComponent, onClick }) => (
  <IconComponent onClick={onClick} className="w-8 h-8  bg-white border-2 border-black  p-1 rounded-full " />
);

const DraggableItem = ({ type, item, itemId, index, moveQuestion, CheckboxItem, dndLoading }) => {
  return (
    <Draggable key={itemId} draggableId={itemId} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className=" rounded-lg flex  items-center p-2 justify-between mb-2 w-full max-w-[95%] bg-orange-100"
        >
          {CheckboxItem}
          <div className="group flex space-x-2 relative">
            <ArrowButton
              IconComponent={ArrowSmallUpIcon}
              onClick={() => {
                if (!dndLoading) {
                  moveQuestion(itemId, 'up');
                }
              }}
            />
            <ArrowButton
              IconComponent={ArrowSmallDownIcon}
              onClick={() => {
                if (!dndLoading) {
                  moveQuestion(itemId, 'down');
                }
              }}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export const DragDropPlaylist = ({ currentId, type, list, setList, apiFunc, onCheck, isCheckboxDisabled }) => {
  // states
  const [dndLoading, setDndLoading] = useState(false);

  // hook
  const { handleDrop, moveQuestion } = useDragDrop(list, currentId, setList, apiFunc, setDndLoading);
  const bottomOfDivQuests = useRef(null);
  const handleBottomScrollBtn = () => bottomOfDivQuests?.current?.scrollIntoView({ behavior: 'smooth' });

  const navigate = useNavigate();
  const onClick = item => {
    if (type !== 'playlist') {
      console.log('clicked');
    }

    // nav to playlist
    navigate('/playlistmainpage', { state: { playlist: item } });
  };

  // render item based on type
  const renderCheckboxItem = quest => {
    if (type === 'playlist') {
      return <CheckboxItemPlaylist quest={quest} isCheckboxDisabled={isCheckboxDisabled} onChange={onCheck} onClick={onClick} />;
    } else {
      return <CheckboxItemDefault quest={quest} isCheckboxDisabled={isCheckboxDisabled} onChange={onCheck} />;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <Droppable droppableId="list-container" type="group">
        {provided => (
          <div className="p-6">
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="overflow-auto bg-white pt-4 flex flex-col mx-auto justify-start shadow-md rounded-2xl border-2 border-black items-center lg:w-[600px] h-[400px]"
            >
              <button
                onClick={handleBottomScrollBtn}
                className="flex fixed top-[80px] ml-[550px]  bg-white p-2 rounded-full border-black shadow-lg border-2 hover:transform hover:scale-110 transition duration-500"
              >
                <DownArrow size={20} />
              </button>
              {list.map((quest, index) => (
                <DraggableItem
                  key={quest._id}
                  item={quest}
                  itemId={quest._id}
                  index={index}
                  moveQuestion={dndLoading ? null : moveQuestion} // Prevent moving when loading
                  isLoading={dndLoading}
                  CheckboxItem={renderCheckboxItem(quest)}
                  type={type}
                />
              ))}
              {provided.placeholder}
              <div ref={bottomOfDivQuests} />
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
