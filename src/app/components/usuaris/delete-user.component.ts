import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms'; // Importar aquí si es un componente standalone

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
  standalone: true, // Marca como standalone
  imports: [FormsModule] // Importar FormsModule aquí
})
export class DeleteUserComponent {
  users: User[] = []; // Lista de usuarios
  selectedUserId: string = ''; // ID del usuario seleccionado para eliminar
  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = ''; // Mensaje de error

  constructor(private userService: UserService) {
    this.getUsers(); // Obtener la lista de usuarios al iniciar el componente
  }

  // Obtener la lista de usuarios desde el servicio
  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  // Método para eliminar un usuario por su ID
  deleteUser(): void {
    if (this.selectedUserId) {
      this.userService.deleteUserById(this.selectedUserId).subscribe(
        () => {
          this.successMessage = 'Usuario eliminado exitosamente';
          this.getUsers(); // Actualizar la lista de usuarios después de la eliminación
        },
        (error) => {
          this.errorMessage = 'Error al eliminar el usuario. Por favor, intenta de nuevo.';
          console.error('Error al eliminar el usuario:', error);
        }
      );
    } else {
      this.errorMessage = 'Por favor, selecciona un usuario para eliminar.';
    }
  }

  // Resetear mensajes de error y éxito
  resetMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}

