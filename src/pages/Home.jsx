import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd';

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div style={{ padding: '48px 0' }}>
      <Title>Catálogo de personajes</Title>
      <Paragraph style={{ maxWidth: 600, fontSize: 16 }}>
        Explorá los personajes de Rick and Morty. Los datos vienen en vivo de la
        Rick and Morty API: podés buscarlos por nombre, recorrer las páginas y
        abrir la ficha completa de cada uno.
      </Paragraph>
      <Link to="/catalogo">
        <Button type="primary" size="large">
          Ver catálogo
        </Button>
      </Link>
    </div>
  );
}