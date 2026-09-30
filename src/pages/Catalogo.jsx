import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, Col, Empty, Input, Pagination, Row, Spin, Typography } from 'antd';
import { getItems } from '../services/api.js';
import ErrorState from '../components/ErrorState.jsx';

const { Title } = Typography;

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const buscar = searchParams.get('buscar') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const [texto, setTexto] = useState(buscar);
  useEffect(() => setTexto(buscar), [buscar]);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function cargar() {
      setLoading(true);
      setError(false);
      try {
        const data = await getItems({ name: buscar, page });
        if (ignore) return;
        setItems(data.results);
        setTotal(data.info.count);
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
  }, [buscar, page, reloadKey]);

  const onSearch = (value) => {
    const v = value.trim();
    setSearchParams(v ? { buscar: v } : {});
  };

  const onPageChange = (p) => {
    const params = {};
    if (buscar) params.buscar = buscar;
    if (p > 1) params.page = p;
    setSearchParams(params);
  };

  let contenido;
  if (loading) {
    contenido = (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <Spin size="large" />
      </div>
    );
  } else if (error) {
    contenido = <ErrorState onRetry={() => setReloadKey((k) => k + 1)} />;
  } else if (items.length === 0) {
    contenido = (
      <Empty
        style={{ padding: 60 }}
        description={buscar ? `No hay personajes que coincidan con "${buscar}"` : 'No hay personajes para mostrar'}
      />
    );
  } else {
    contenido = (
      <>
        <Row gutter={[16, 16]}>
          {items.map((p) => (
            <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
              <Link to={`/catalogo/${p.id}`}>
                <Card hoverable cover={<img alt={p.name} src={p.image} />}>
                  <Card.Meta title={p.name} description={`${p.species} · ${p.status}`} />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <Pagination
          style={{ marginTop: 24, textAlign: 'center' }}
          current={page}
          total={total}
          pageSize={20}
          showSizeChanger={false}
          onChange={onPageChange}
        />
      </>
    );
  }

  return (
    <>
      <Title level={2}>Catálogo</Title>
      <Input.Search
        placeholder="Buscar por nombre"
        allowClear
        enterButton="Buscar"
        size="large"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onSearch={onSearch}
        style={{ maxWidth: 480, marginBottom: 24 }}
      />
      {contenido}
    </>
  );
}