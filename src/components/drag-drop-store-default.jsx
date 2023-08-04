import { Fragment, useCallback } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/react/24/outline';
import { convertData, revertData } from '../utils/data';
import { getUserId } from '../config/user';
import { orderQuests } from '../config/api';

export default function DragDropStoreDefault({ stores, setStores, Content, isCheckboxDisabled, onCheck }) {
  const moveItem = useCallback(
    async (id = null, direction = null) => {
      const allItems = stores[0].items;

      const newItems = allItems.map(item => {
        if (item._id !== id) {
          const newOrder = direction === 'up' ? item.order + 1 : item.order > 1 ? item.order - 1 : 1;
          return { ...item, order: newOrder };
        } else {
          const newOrder = direction === 'up' ? 1 : allItems.length;
          return { ...item, order: newOrder };
        }
      });

      const orderedItems = newItems.sort((a, b) => a.order - b.order);

      setStores(
        stores.map(store => {
          if (store.id === stores[0].id) {
            return { ...store, items: orderedItems };
          } else {
            return store;
          }
        }),
      );

      await orderQuests(getUserId(), orderedItems);
    },
    [stores, setStores],
  );

  const moveQuestion = useCallback(
    (id, direction) => {
      moveItem(id, direction);
    },
    [moveItem],
  );

  const handleDragAndDrop = async results => {
    const { source, destination } = results;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(store => store.id === source.droppableId);
    const storeDestinationIndex = stores.findIndex(store => store.id === destination.droppableId);

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems = source.droppableId !== destination.droppableId ? [...stores[storeDestinationIndex].items] : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    const revertedData = revertData(newStores);
    const convertedData = convertData(revertedData);

    // set in frontend
    setStores(convertedData);

    // update in database
    await orderQuests(getUserId(), revertedData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId="list-container" type="group">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {stores.map((store, index) => {
                return (
                  <Fragment key={store.id}>
                    <Draggable draggableId={store.id} index={index} key={store.id} isDragDisabled={true}>
                      {provided => (
                        <div className="mb-5 mt-5" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                          <StoreList {...store} isCheckboxDisabled={isCheckboxDisabled} onCheck={onCheck} moveQuestion={moveQuestion} />
                        </div>
                      )}
                    </Draggable>
                    {index === 0 && <Content />}
                  </Fragment>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

const CheckboxItemDefault = ({ item, isCheckboxDisabled, onChange }) => (
  <div className="flex items-center  space-x-2">
    <input
      type="checkbox"
      name={item}
      className=" mr-2 w-8 h-8 "
      disabled={isCheckboxDisabled(item)}
      checked={false}
      onChange={e => onChange(item, e)}
      id={item.id}
    />
    <img src="monster.png" alt="monsterImage" width="50" height="50"></img>
    <label className="text-xl font-bold">{item.Quest}</label>
  </div>
);

function StoreList({ items, id, isCheckboxDisabled, onCheck, moveQuestion }) {
  return (
    <Droppable droppableId={id}>
      {provided => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="overflow-auto p-3 bg-white shadow-md rounded-2xl border-2 border-black lg:w-[600px] h-[400px]"
        >
          <div className="items-container">
            {items
              .filter(item => item.isChecked === false)
              .map((item, index) => {
                return (
                  <DraggableItem
                    key={item._id}
                    item={item}
                    itemId={item._id}
                    index={index}
                    moveQuestion={moveQuestion}
                    CheckboxItem={<CheckboxItemDefault item={item} isCheckboxDisabled={isCheckboxDisabled} onChange={onCheck} />}
                  />
                );
              })}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

const ArrowButton = ({ IconComponent, onClick }) => (
  <IconComponent onClick={onClick} className="w-8 h-8  bg-white border-2 border-black  p-1 rounded-full " />
);

const DraggableItem = ({ itemId, index, moveQuestion, CheckboxItem, dndLoading }) => {
  return (
    <Draggable key={itemId} draggableId={itemId} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className=" rounded-lg flex  items-center p-2 justify-between mb-2 w-full bg-orange-100"
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
