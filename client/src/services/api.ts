const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const AVATAR_API_URL = import.meta.env.VITE_AVATAR_API_URL || '';

// Helper para verificar se a API está configurada
export const isApiConfigured = () => {
  return !!API_BASE_URL;
};

export const isAvatarApiConfigured = () => {
  return !!AVATAR_API_URL;
};

// Tipos
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

export interface Avatar {
  id: string;
  name: string;
  specialty: string;
  description: string;
  imageUrl: string;
  available: boolean;
}

export interface Atendimento {
  id: string;
  date: string;
  specialty: string;
  avatarName: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'scheduled';
}

// API Service (Placeholder)
class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    if (!API_BASE_URL) {
      throw new Error('VITE_API_BASE_URL não configurada');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async login(data: LoginData): Promise<User> {
    // Placeholder: simula login bem-sucedido
    console.log('[API Placeholder] login:', data);
    return {
      id: 'user-123',
      email: data.email,
      name: 'Usuário Demo',
      token: 'fake-jwt-token-' + Date.now(),
    };
  }

  async register(data: RegisterData): Promise<User> {
    // Placeholder: simula registro bem-sucedido
    console.log('[API Placeholder] register:', data);
    return {
      id: 'user-' + Date.now(),
      email: data.email,
      name: data.name,
      token: 'fake-jwt-token-' + Date.now(),
    };
  }

  async getMe(token: string): Promise<User> {
    // Placeholder: retorna usuário mockado
    console.log('[API Placeholder] getMe with token:', token);
    return {
      id: 'user-123',
      email: 'usuario@exemplo.com',
      name: 'Usuário Demo',
      token,
    };
  }

  async getAvatares(): Promise<Avatar[]> {
    // Placeholder: retorna lista mockada de avatares
    console.log('[API Placeholder] getAvatares');
    return [
      {
        id: 'avatar-1',
        name: 'Dr. Ana Silva',
        specialty: 'Psicologia',
        description: 'Especialista em terapia cognitivo-comportamental',
        imageUrl: '/placeholder-avatar.png',
        available: true,
      },
      {
        id: 'avatar-2',
        name: 'Dr. Carlos Santos',
        specialty: 'Nutrição',
        description: 'Nutricionista esportivo e funcional',
        imageUrl: '/placeholder-avatar.png',
        available: true,
      },
      {
        id: 'avatar-3',
        name: 'Dra. Maria Costa',
        specialty: 'Yoga',
        description: 'Instrutora de yoga e meditação',
        imageUrl: '/placeholder-avatar.png',
        available: false,
      },
    ];
  }

  async startAtendimento(avatarId: string): Promise<{ sessionId: string; url: string }> {
    // Placeholder: simula início de atendimento
    console.log('[API Placeholder] startAtendimento:', avatarId);
    if (!AVATAR_API_URL) {
      throw new Error('VITE_AVATAR_API_URL não configurada');
    }
    return {
      sessionId: 'session-' + Date.now(),
      url: `${AVATAR_API_URL}/session/session-${Date.now()}`,
    };
  }

  async getHistorico(): Promise<Atendimento[]> {
    // Placeholder: retorna histórico mockado
    console.log('[API Placeholder] getHistorico');
    return [
      {
        id: 'atend-1',
        date: '2024-11-01T10:00:00',
        specialty: 'Psicologia',
        avatarName: 'Dr. Ana Silva',
        duration: '45 min',
        status: 'completed',
      },
      {
        id: 'atend-2',
        date: '2024-10-28T14:30:00',
        specialty: 'Nutrição',
        avatarName: 'Dr. Carlos Santos',
        duration: '30 min',
        status: 'completed',
      },
    ];
  }
}

export const apiService = new ApiService();
