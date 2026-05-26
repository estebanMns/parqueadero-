// OOP Abstraction: Interfaz que abstrae la entidad Auth del backend Java
export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}
