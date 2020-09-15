import React from 'react';
import { COLORS } from '@app/common';

interface Props {
  text: string;
  onClick?:
    | ((event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void)
    | undefined;
}
const CustomLink: React.FC<Props> = ({ onClick, text }) => {
  return (
    <p onClick={onClick} className={'link'} color={COLORS.PRIMARY}>
      {text}
    </p>
  );
};

export default CustomLink;
