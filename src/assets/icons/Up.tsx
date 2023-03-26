import React, {FC} from 'react';
import {Path} from 'react-native-svg';
import SvgIconWrapper from '../../components/SvgIconWrapper';
import {IconProps} from '../../global';

const Up: FC<IconProps> = props => {
  const {size, color} = props;

  return (
    <SvgIconWrapper height={size} width={size} viewBox="0 0 16 16" {...props}>
      <Path
        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill={color}
      />
    </SvgIconWrapper>
  );
};

export default Up;
