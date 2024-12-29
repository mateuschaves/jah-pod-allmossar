import {TouchableOpacityProps } from 'react-native'
import React from 'react'
import { ButtonContainer, ButtonText } from './styles';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void
}

export default function Button({ onPress, title, ...props }: ButtonProps) {
  return (
    <ButtonContainer onPress={onPress} {...props}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
}