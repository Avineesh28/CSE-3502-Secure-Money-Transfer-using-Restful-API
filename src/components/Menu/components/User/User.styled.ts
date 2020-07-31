import styled from 'styled-components';

export const Avatar = styled.div`
  position: relative;

  img {
    margin-bottom: 1.9rem;
    border-radius: 50%;

    transition: all 0.35s;
  }
`;

export const Username = styled.p`
  font-family: 'Inter-Semibold';

  margin-bottom: 0;
  font-size: 2.4rem;

  transition: color 0.25s, font-size 0.35s;
`;

export const UserId = styled.p`
  color: ${props => props.theme.colors.onTertiary};

  font-size: 1.6rem;

  transition: font-size 0.35s;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 5.6rem;

  &:hover {
    ${Avatar} img {
      opacity: 0.8;
    }

    ${Username} {
      color: ${props => props.theme.colors.onPrimary};
    }
  }
`;

export const Info = styled.span`
  display: flex;
  flex-direction: column;
`;
