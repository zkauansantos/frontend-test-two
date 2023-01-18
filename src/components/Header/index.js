/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import { useContext, useState } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from '../../contexts/ThemeContext';
import useWidth from '../../hooks/useWidth';
import {
  StyledHeader, ListNavMenu, ContainerLogo, MenuMobile,
} from '../../assets/styles/HeaderStyled';

export default function Header() {
  const { handleToggleTheme, theme, currentTheme } = useContext(ThemeContext);
  const [active, setActive] = useState(false);
  const width = useWidth();

  function toggleActive() {
    setActive(!active);
  }

  return (
    <StyledHeader menuOpen={active} theme={currentTheme}>
      <ContainerLogo menuOpen={active} theme={currentTheme}>
        <Link href="/"><h1>FUTstats</h1></Link>
        <Switch
          className="switch"
          onChange={handleToggleTheme}
          checked={theme === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          checkedHandleIcon={<span>🌞</span>}
          uncheckedHandleIcon={<span>🌑</span>}
          height={25}
          width={width < 425 ? 40 : 50}
          handleDiameter={25}
          onColor="#ccc"
          offColor="#444"
        />
      </ContainerLogo>

      <MenuMobile theme={currentTheme}>
        <div className={active ? 'icon iconActive' : 'icon'} onClick={toggleActive}>
          <div className="hamburguer" />
        </div>

        <div className={active ? 'menuOpen' : 'menuClose'}>
          <nav className="nav-mobile">
            <ListNavMenu theme={currentTheme}>
              <li><Link href="/"> Home</Link></li>
              <li><Link href="/"> Seasons</Link></li>
              <li><Link href="/"> Results</Link></li>
            </ListNavMenu>
          </nav>
        </div>
      </MenuMobile>

      {!active && (
        <nav className="nav-desktop">
          <ListNavMenu menuOpen theme={currentTheme}>
            <li><Link href="/"> Home</Link></li>
            <li><Link href="/"> Seasons</Link></li>
            <li><Link href="/"> Results</Link></li>
          </ListNavMenu>
        </nav>
      )}
    </StyledHeader>
  );
}
