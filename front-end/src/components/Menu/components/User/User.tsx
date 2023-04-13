import React from 'react';

import AvatarImage from 'assets/images/aside/user-avatar.png';

import { Container, Avatar, Username, UserId, Info } from './User.styled';

interface Props {
  className?: string;
}

const User: React.FC<Props> = ({ className }) => {
  return (
    <Container className={className}>
      <Avatar>
        <img src={AvatarImage} alt="Username" />
      </Avatar>

      <Info>
        <Username>Robin Hood</Username>
        <UserId>CSE3502</UserId>
      </Info>
    </Container>
  );
};

export default User;
