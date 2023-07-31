import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlineArrowDown as DownArrow } from 'react-icons/ai';

const CheckboxItem = ({ quest, isCheckboxDisabled, onChange }) => (
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
    <label className="text-xl font-bold">{quest.Quest}</label>
  </div>
);

const ArrowButton = ({ IconComponent, onClick }) => (
  <IconComponent onClick={onClick} className="w-8 h-8  bg-white border-2 border-black  p-1 rounded-full " />
);

const DraggableItem = ({ quest, index, moveQuestion, isCheckboxDisabled, onChange }) => (
  <Draggable key={quest._id} draggableId={quest._id} index={index}>
    {provided => (
      <div
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
        className=" rounded-lg flex  items-center p-2 justify-between mb-2 w-full max-w-[95%] bg-orange-100"
      >
        <CheckboxItem quest={quest} isCheckboxDisabled={isCheckboxDisabled} onChange={onChange} />
        <div className="group flex space-x-2 relative">
          <ArrowButton
            IconComponent={ArrowSmallUpIcon}
            onClick={() => {
              moveQuestion(quest._id, 'up');
            }}
          />
          <ArrowButton
            IconComponent={ArrowSmallDownIcon}
            onClick={() => {
              moveQuestion(quest._id, 'down');
            }}
          />
        </div>
      </div>
    )}
  </Draggable>
);

export const DragDropList = ({ questions, handleDrop, moveQuestion, onCheck, isCheckboxDisabled }) => {
  const bottomOfDivQuests = useRef(null);
  const handleBottomScrollBtn = () => bottomOfDivQuests?.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <Droppable droppableId="list-container">
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
              {questions.map((quest, index) => (
                <DraggableItem
                  key={quest._id}
                  quest={quest}
                  index={index}
                  moveQuestion={moveQuestion}
                  isCheckboxDisabled={isCheckboxDisabled}
                  onChange={onCheck}
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
