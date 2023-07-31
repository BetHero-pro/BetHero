import { useState } from 'react';

export function useDisabledCheckboxes() {
  const [disabledCheckboxes, setDisabledCheckboxes] = useState([]);

  const disableCheckbox = id => {
    setDisabledCheckboxes(currentDisabledCheckboxes => [...currentDisabledCheckboxes, id]);
  };

  const enableCheckbox = id => {
    setDisabledCheckboxes(currentDisabledCheckboxes => currentDisabledCheckboxes.filter(checkboxId => checkboxId !== id));
  };

  const isCheckboxDisabled = id => disabledCheckboxes.includes(id);

  return { disableCheckbox, enableCheckbox, isCheckboxDisabled };
}
