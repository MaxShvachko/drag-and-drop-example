import { memo, useState } from 'react';

import { StAddButton, StContainer, StInput } from './styles';

export interface Props {
  onAddItem: (value: string) => void;
  placeholder: string;
  buttonText: string;
  disabled?: boolean;
}

function AddItem({
  disabled,
  onAddItem,
  buttonText,
  placeholder
}: Props) {
  const [value, setValue] = useState('');

  const handleAddItem = () => {
    onAddItem(value.trim());
    setValue('');
  };

  return (
    <StContainer>
      <StInput
        value={value}
        placeholder={placeholder}
        onChange={({ target: { value } }) => setValue(value)}
      />
      <StAddButton disabled={!value || disabled} onClick={handleAddItem}>
        {buttonText}
      </StAddButton>
    </StContainer>
  );
}

export default memo(AddItem);
