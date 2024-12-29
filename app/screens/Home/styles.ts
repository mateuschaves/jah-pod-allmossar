import { normalizeFontSize } from '@/app/shared/font';
import styled from 'styled-components/native';

interface ContainerProps {
  can: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  background-color: ${({ can, theme }) => (can ? theme.colors.backgroundSuccess : theme.colors.backgroundDanger)};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textHighlight};
  font-size: ${normalizeFontSize(24)}px;
  font-weight: 700;
  text-align: center;
`;


export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.textHighlight};
  font-size: ${normalizeFontSize(20)}px;
  text-align: center;
  margin-top: 10px;
`;