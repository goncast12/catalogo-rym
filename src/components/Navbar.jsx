import { NavLink, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const items = [
  {
    key: '/',
    label: (
      <NavLink to="/" end className="nav-link">
        Home
      </NavLink>
    ),
  },
  {
    key: '/catalogo',
    label: (
      <NavLink to="/catalogo" className="nav-link">
        Catálogo
      </NavLink>
    ),
  },
];

export default function Navbar() {
  const { pathname } = useLocation();

  let selected = [];
  if (pathname === '/') selected = ['/'];
  else if (pathname.startsWith('/catalogo')) selected = ['/catalogo'];

  return (
    <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
      <div style={{ color: '#fff', fontWeight: 700, marginRight: 32, whiteSpace: 'nowrap' }}>
        Rick and Morty
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        selectedKeys={selected}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
}