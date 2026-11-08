
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { navigation } from '../../data/navigation.js';
import './Header.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState('');

  function closeMenu() {
    setMobileOpen(false);
    setExpanded('');
  }

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link
          className="site-header__brand"
          to="/"
          onClick={closeMenu}
          aria-label="VIGI, accueil"
        >
          <img src={`${import.meta.env.BASE_URL}images/vigi-logo.jpg`} alt="Logo VIGI"/>

          <span className="site-header__brand-name">
            <span className="site-header__brand-title">
              VIGI
              <img
                src={`${import.meta.env.BASE_URL}images/logo-eupol.png`}
                alt="EU.Pol"
                className="site-header__eupol"
              />
            </span>
            <small>Ministère de l’Intérieur</small>
          </span>
        </Link>

        <button
          className="site-header__toggle"
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

        <nav
          className={`site-header__nav ${mobileOpen ? 'site-header__nav--open' : ''}`}
          aria-label="Navigation principale"
        >
          {navigation.map((item) => (
            <div className="nav-group" key={item.label}>
              <button
                className="nav-group__trigger"
                type="button"
                aria-expanded={expanded === item.label}
                onClick={() =>
                  setExpanded(expanded === item.label ? '' : item.label)
                }
              >
                {item.label}
                <ChevronDown
                  size={17}
                  className={
                    expanded === item.label
                      ? 'nav-group__chevron--open'
                      : ''
                  }
                />
              </button>

              {expanded === item.label && (
                <div className="nav-group__dropdown">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      onClick={closeMenu}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}

          <NavLink
            className="site-header__contact"
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          <NavLink
            className="site-header__account"
            to="/espace-adherent"
            onClick={closeMenu}
          >
            Mon espace adhérent
          </NavLink>

          <NavLink
            className="site-header__join"
            to="/adherer"
            onClick={closeMenu}
          >
            Adhérer
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
