import React, {FC} from 'react';
import {Path} from 'react-native-svg';
import SvgIconWrapper from '../../components/SvgIconWrapper';
import {IconProps} from '../../global';

const Down: FC<IconProps> = props => {
  const {size, color} = props;

  return (
    <SvgIconWrapper height={size} width={size} viewBox="0 0 16 16" {...props}>
      <Path
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill={color}
      />
    </SvgIconWrapper>
  );
};

export default Down;
