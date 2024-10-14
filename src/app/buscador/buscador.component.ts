import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ExperienciaService } from '../services/experiencia.service';
import { Experiencia } from '../models/experiencia.model'; 
import { User } from '../models/user.model'; 


@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  searchTerm: string = '';
  experiencias: Experiencia[] = []; // Cambia esto a tu modelo de experiencia
  users: User[] = []; // Opcional: para almacenar los usuarios encontrados

  constructor(private userService: UserService, private experienciaService: ExperienciaService) {}

  buscarUsuario() {
    this.userService.searchUserByName(this.searchTerm).subscribe({
      next: (users) => {
        this.users = users; // Almacenar usuarios encontrados
        if (users.length > 0) {
          const userName = users[0].name; // Tomar el nombre del primer usuario encontrado
          this.experienciaService.getExperienciasByUserName(userName).subscribe({
            next: (exp) => {
              this.experiencias = exp; // Cargar experiencias del usuario
            },
            error: (err) => {
              console.error('Error al obtener experiencias', err);
              this.experiencias = []; // Limpiar en caso de error
            }
          });
        } else {
          this.experiencias = []; // Limpiar si no hay usuarios
        }
      },
      error: (err) => {
        console.error('Error al buscar usuario', err);
        this.experiencias = []; // Limpiar en caso de error
      }
    });
  }
}