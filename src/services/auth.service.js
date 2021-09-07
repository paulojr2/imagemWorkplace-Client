import axios from 'axios';
import { API_URL } from '@/main.js'

class AuthService {
  async login(user) {
    const response = await axios
      .post(API_URL + '/api/auth/signin', {
        email: user.email,
        password: user.password
      });
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  async register(user) {
    return await axios.post(API_URL + '/api/auth/signup', {
      email: user.email,
      password: user.password,
      tipo: user.tipo,
      documento: user.documento,
      nome: user.nome,
      telefone: user.telefone,
      endereco: user.endereco
    });
  }
}

export default new AuthService();
