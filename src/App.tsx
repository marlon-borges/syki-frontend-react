import { useNavigate } from "react-router";
import { Button } from "./components/Button";
import { AuthCard } from "./components/auth/AuthCard";
import { IconArrowUpRight, IconUserCheck } from "@tabler/icons-react";

const App = () => {
  const nav = useNavigate();
  return (
    <AuthCard title="Temos que criar uma page pra cada role aqui">
      <Button variant="outline" classNames="w-full" size="large" rightIcon={IconUserCheck} onClick={() => nav('/register')}>Criar conta</Button>
      <Button classNames="w-full" size="large" rightIcon={IconArrowUpRight} onClick={() => nav('/login')}>Ir pro login</Button>
    </AuthCard>
  );
};

export default App;
