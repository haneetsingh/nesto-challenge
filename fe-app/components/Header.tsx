"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL!;

export default function Header() {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        {/* Logo */}
        <LogoContainer>
          <Image
            src={LOGO_URL}
            alt="nesto logo"
            width={120}
            height={50}
            priority={true}
          />
        </LogoContainer>

        {/* Navigation */}
        <Nav>
          <NavList>
            <NavItem>
              <StyledLink href="/">Home</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink href="/applications">Applications</StyledLink>
            </NavItem>
          </NavList>
        </Nav>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 12px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 120px;
    height: auto;
  }
`;

const Nav = styled.nav`
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 24px;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
`;

const NavItem = styled.li`
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 600;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #007bff;
  }
`;
