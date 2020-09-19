import React from 'react';
import Icon from '../../../images/Branding/Icon.png';

interface Props {
  style: { [k: string]: any };
}
const Animation: React.FC<Props> = ({ style }) => {
  return (
    <div className={'landing-background fade-animation'} style={style}>
      <img src={Icon} alt={'Animation'} className={'landing-icon'} />
    </div>
  );
};

export default Animation;
