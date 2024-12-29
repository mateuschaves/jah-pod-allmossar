import { normalizeFontSize } from '@/app/shared/font';
import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  background-color: transparent;
  border-color: white;
  border-width: 1px;
  padding: 10px;
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-size: ${normalizeFontSize(16)}px;
`;