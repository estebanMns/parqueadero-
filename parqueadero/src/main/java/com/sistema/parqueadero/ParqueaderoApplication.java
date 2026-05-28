package com.sistema.parqueadero;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;
import com.sistema.parqueadero.models.Usuario;
import com.sistema.parqueadero.repository.UsuarioRepository;

@SpringBootApplication
public class ParqueaderoApplication implements CommandLineRunner {

	@Autowired
	private UsuarioRepository usuarioRepository;

	public static void main(String[] args) {
		SpringApplication.run(ParqueaderoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// 1. Eliminar usuarios duplicados con correo repetido priorizando conservar el que sí tiene contraseña
		java.util.List<Usuario> todos = usuarioRepository.findAll();
		java.util.Map<String, Usuario> mapaUnico = new java.util.HashMap<>();
		for (Usuario u : todos) {
			if (u.getCorreo() != null) {
				String correoNorm = u.getCorreo().toLowerCase().trim();
				if (mapaUnico.containsKey(correoNorm)) {
					Usuario existente = mapaUnico.get(correoNorm);
					boolean existenteTienePass = existente.getContrasena() != null && !existente.getContrasena().trim().isEmpty();
					boolean nuevoTienePass = u.getContrasena() != null && !u.getContrasena().trim().isEmpty();
					if (!existenteTienePass && nuevoTienePass) {
						usuarioRepository.delete(existente);
						System.out.println("=== DB CLEANUP: Borrado duplicado sin contrasena de " + existente.getCorreo() + " (ID: " + existente.getId() + ") ===");
						mapaUnico.put(correoNorm, u);
					} else {
						usuarioRepository.delete(u);
						System.out.println("=== DB CLEANUP: Borrado duplicado sin contrasena de " + u.getCorreo() + " (ID: " + u.getId() + ") ===");
					}
				} else {
					mapaUnico.put(correoNorm, u);
				}
			}
		}

		// 2. Crear usuario administrador por defecto si no existe
		if (!usuarioRepository.findByCorreo("admin@parqueadero.com").isPresent()) {
			Usuario admin = new Usuario();
			admin.setNombre("Administrador");
			admin.setCorreo("admin@parqueadero.com");
			admin.setContrasena("admin");
			usuarioRepository.save(admin);
			System.out.println("\n========================================================");
			System.out.println("=== USUARIO ADMINISTRADOR CREADO: admin@parqueadero.com / admin ===");
			System.out.println("========================================================\n");
		}
	}
}
