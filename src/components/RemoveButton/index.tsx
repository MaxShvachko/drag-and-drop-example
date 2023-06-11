import { StButton, StCrossIcon } from './styles';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
}

export default function RemoveButton({ onClick, disabled }: Props) {
  return (
    <StButton onClick={onClick} disabled={disabled}>
      <StCrossIcon />
    </StButton>
  );
}
