import { api } from '@/services/api';
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';

export interface AuthContextProps {
  user: UserProps;
  login: (userData: UserProps) => void;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: string;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserProps>({ email: '', id: '', name: '', role: '' });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const nav = useNavigate();

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response?.status === 401) {
          cleanUserData();
          setIsAuthenticated(false);
          nav('/login', { replace: true });
        }
        return Promise.reject(error);
      },
    );

    const checkStoredUser = () => {
      try {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          if (userData && userData.id && userData.email) {
            setUser(userData);
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        console.warn('Erro ao recuperar dados do usuário do localStorage');
        cleanUserData();
      } finally {
        setIsLoading(false);
      }
    };
    checkStoredUser();

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [nav]);

  const setUserData = (userData: UserProps) => {
    try {
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (err) {
      console.warn('Erro ao inserir as informações do usuário localmente');
    }
    setUser({ ...userData });
  };

  const cleanUserData = () => {
    setUser({ email: '', id: '', name: '', role: '' });
    try {
      localStorage.removeItem('userData');
    } catch (err) {
      console.warn('Erro ao limpar o usuário');
    }
  };

  const login = (userData: UserProps) => {
    try {
      setUserData({
        email: userData.email,
        id: userData.id,
        name: userData.name,
        role: userData.role,
      });
      setIsAuthenticated(true);
      nav(`/${userData.role.toLowerCase()}`, { replace: true });
    } catch (err) {
      throw new Error('Não foi possível validar o usuário');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    api.post('/logout').then(() => {
      cleanUserData();
      setIsAuthenticated(false);
      nav('/login', { replace: true });
    });
  };

  return (
    <AuthContext.Provider
      value={
        {
          user,
          login,
          logout,
          isLoading,
          isAuthenticated,
        } satisfies AuthContextProps
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de AuthContext');
  }
  return context;
};
