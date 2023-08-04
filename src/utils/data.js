export function revertData(data) {
  const dataStart = [];

  data.forEach(({ items, tint }) => {
    const isDungeon = tint === 2;
    items.forEach((item, index) => {
      let order = isDungeon ? index + 1000 : index + 1; // calculate the order based on the isDungeon
      const newItem = { ...item, isDungeon, order };
      dataStart.push(newItem);
    });
  });

  // Sort the items by the order
  dataStart.sort((a, b) => a.order - b.order);

  return dataStart;
}

export function convertData(dataStart) {
  // Separate the items into two arrays based on the isDungeon property
  const notDungeonItems = dataStart.filter(item => !item.isDungeon).sort((a, b) => a.order - b.order);
  const dungeonItems = dataStart.filter(item => item.isDungeon).sort((a, b) => a.order - b.order);

  // TODO: Remove the isDungeon property from the items
  /* notDungeonItems.forEach(item => delete item.isDungeon);
    dungeonItems.forEach(item => delete item.isDungeon); */

  // Create the new array
  const data = [
    {
      id: '0e2f0db1-5457-46b0-949e-8032d2f9997a',
      name: 'Walmart',
      items: notDungeonItems,
      tint: 1,
    },
    {
      id: '487f68b4-1746-438c-920e-d67b7df46247',
      name: 'Indigo',
      items: dungeonItems,
      tint: 2,
    },
  ];

  return data;
}
