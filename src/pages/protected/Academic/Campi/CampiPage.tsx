import { useGetCampi, type CampusOut } from "@/features/Academic/GetCampi/GetCampiClient";

const CampiPage = () => {
  const { data, isLoading, isError, error } = useGetCampi();

  if (isLoading) {
    return <div>Carregando campi...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os campi: {error?.message}</div>;
  }

  return (
    <div className="ml-6 mt-6 gap-16">
      {data && data.length > 0 ? (
        <ul>
          {data.map((campus: CampusOut) => (
            <li key={campus.id}>{campus.name} ({campus.city} - {campus.state})</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum campus encontrado.</p>
      )}
    </div>
  );
};

export default CampiPage;
