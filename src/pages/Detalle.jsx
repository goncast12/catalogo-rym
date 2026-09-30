import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, Image, Result, Spin, Tag, Typography } from 'antd';
import { getItemById } from '../services/api.js';
import ErrorState from '../components/ErrorState.jsx';

const { Title } = Typography;

const colorEstado = { Alive: 'green', Dead: 'red', unknown: 'default' };

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function cargar() {
      setLoading(true);
      setError(false);
      setItem(null);
      try {
        const data = await getItemById(id);
        if (!ignore) setItem(data);
      } catch {
        if (!ignore) setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    cargar();
    return () => {
      ignore = true;
    };
  }, [id, reloadKey]);

  const volver = () => navigate('/catalogo');

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <ErrorState onRetry={() => setReloadKey((k) => k + 1)} />;
  }

  if (!item) {
    return (
      <Result
        status="404"
        title="Elemento no encontrado"
        subTitle={`No existe ningún personaje con el id "${id}".`}
        extra={
          <Button type="primary" onClick={volver}>
            Volver al catálogo
          </Button>
        }
      />
    );
  }

  return (
    <>
      <Button onClick={volver} style={{ marginBottom: 16 }}>
        Volver
      </Button>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <Image src={item.image} alt={item.name} width={300} />
        <div style={{ flex: 1, minWidth: 280 }}>
          <Title level={2}>{item.name}</Title>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Estado">
              <Tag color={colorEstado[item.status] ?? 'default'}>{item.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Especie">{item.species}</Descriptions.Item>
            <Descriptions.Item label="Género">{item.gender}</Descriptions.Item>
            <Descriptions.Item label="Origen">{item.origin?.name}</Descriptions.Item>
            <Descriptions.Item label="Última ubicación">{item.location?.name}</Descriptions.Item>
            <Descriptions.Item label="Episodios">{item.episode?.length ?? 0}</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </>
  );
}