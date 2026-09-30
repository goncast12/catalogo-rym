import { Result, Button } from 'antd';

export default function ErrorState({ onRetry }) {
  return (
    <Result
      status="error"
      title="No pudimos cargar los datos"
      subTitle="Revisá tu conexión e intentá de nuevo. Si el problema sigue, la API puede estar caída."
      extra={
        <Button type="primary" onClick={onRetry}>
          Reintentar
        </Button>
      }
    />
  );
}