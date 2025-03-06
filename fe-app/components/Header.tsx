"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import styled from "styled-components";

const LOGO_URL = process.env.NEXT_PUBLIC_LOGO_URL!;

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const querySuffix = queryString ? `?${queryString}` : "";

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

        {/* Navigation & Language Links */}
        <RightContainer>
          <Nav>
            <NavList>
              <NavItem>
                <StyledLink href={`/${locale}`}>
                  {t("home")}
                </StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink href={`/${locale}/applications`}>
                  {t("applications")}
                </StyledLink>
              </NavItem>
            </NavList>
          </Nav>

          {/* Language Switcher */}
          <LanguageSwitcher>
            <LangLink
              href={`/en${pathname.replace(/^\/(en|fr)/, "")}${querySuffix}`}
            >
              En
            </LangLink>
            <Divider>|</Divider>
            <LangLink
              href={`/fr${pathname.replace(/^\/(en|fr)/, "")}${querySuffix}`}
            >
              Fr
            </LangLink>
          </LanguageSwitcher>
        </RightContainer>
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
    gap: 12px;
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

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Nav = styled.nav``;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 24px;
  margin: 0;
  padding: 0;
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

// Language Switcher
const LanguageSwitcher = styled.div`
  display: flex;
  gap: 12px;
`;

const LangLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  color: #666;
  font-size: 14px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

const Divider = styled.span`
  color: #ccc;
  font-size: 14px;
`;