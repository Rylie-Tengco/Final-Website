import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #264653;
  padding: 1rem;
  z-index: 1000;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavItem = styled.li`
  a {
    color: #F8F9FA;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    background: ${props => props.active ? '#2A9D8F' : 'transparent'};

    &:hover {
      background: #2A9D8F;
    }
  }
`;

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'About Me' },
    { path: '/education', label: 'Education' },
    { path: '/hobbies', label: 'Hobbies' },
    { path: '/goals', label: 'Goals' },
    { path: '/experience', label: 'IT Experience' },
    { path: '/gallery', label: 'Photo Gallery' },
    { path: '/minigame', label: 'Minigame' },
    { path: '/feedback', label: 'Feedback' }
  ];

  return (
    <NavContainer>
      <NavList>
        {navItems.map((item) => (
          <NavItem 
            key={item.path} 
            active={location.pathname === item.path}
          >
            <Link to={item.path}>{item.label}</Link>
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
}

export default Navbar;
