import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  standalone: true,
  imports: [FormsModule]  // Asegúrate de importar FormsModule aquí
})
export class AddUserComponent {
  newUser: User = {
    name: '',
    mail: '',
    password: '',
    comment: ''  // Añadido el campo 'comment'
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  addUser() {
    this.userService.addUser(this.newUser).subscribe({
      next: (response) => {
        this.successMessage = 'Usuario añadido exitosamente';
        this.resetForm();  // Limpiar el formulario después de añadir
      },
      error: (error) => {
        this.errorMessage = 'Error al añadir el usuario. Por favor, intenta de nuevo.';
        console.error(error);
      }
    });
  }

  resetForm() {
    this.newUser = {
      name: '',
      mail: '',
      password: '',
      comment: ''  // Reiniciar el campo 'comment' también
    };
    this.successMessage = '';
    this.errorMessage = '';
  }
}
