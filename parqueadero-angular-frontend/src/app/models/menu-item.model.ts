// Modelo del árbol de menú — soporta recursividad ilimitada (OOP)
// SRP: Este modelo solo describe la estructura de un nodo de menú
export interface MenuItem {
  label: string;       // Texto visible
  icon: string;        // Emoji o clase de icono
  route?: string;      // Ruta angular (opcional si tiene hijos)
  children?: MenuItem[]; // Sub-ítems → RECURSIVIDAD
  expanded?: boolean;  // Estado de colapso/expansión
}
