import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #1a2f38;
  padding: 1rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BrandTitle = styled.h1`
  color: #F8F9FA;
  font-size: 1.5rem;
  margin: 0;
  padding-left: 1rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    gap: 0;
    padding: 0;
    background: #1a2f38;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #F8F9FA;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    display: block;
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
    display: block;

    &:hover {
      background: #2A9D8F;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }

    a {
      padding: 1rem;
      border-radius: 0;
      text-align: left;
    }
  }
`;

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

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
      <BrandTitle>Rylie Tengco</BrandTitle>
      {isMobile && (
        <HamburgerButton onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? '✕' : '☰'}
        </HamburgerButton>
      )}
      <NavList isOpen={isOpen || !isMobile}>
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
