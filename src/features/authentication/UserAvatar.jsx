import { useCurrentUser } from "./useCurrentUser";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  cursor: pointer;
  &:hover {
    color: var(--color-indigo-700);
  }
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserAvatar = () => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const { fullName, avatar } = user.user_metadata;

  return (
    <StyledUserAvatar onClick={() => navigate("/account")}>
      <Avatar src={avatar || "default-user.jpg"} alt={`avatar of ${fullName}`} />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;

