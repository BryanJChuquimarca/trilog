//proximamente arreglar que al borrar trilog_user_id que no se pueda entrar a diario.
//solucion: primero que se guarde conjunto el trilog_user_id y trilog_empezo en una misma key para que al borrar se borren ambos y no se pueda entrar a diario.
//tambien comprobacion en back
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../core/services/usuario';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  constructor(private router: Router, private usuarioService: Usuario) { }

  ngOnInit() {
    const trilogEmpezo = localStorage.getItem('trilog_empezo');
    if (trilogEmpezo === 'true') {
      this.router.navigate(['/diario']);
    }
  }

  comenzar() {
    const uuidExistente = localStorage.getItem('trilog_user_id');

    this.usuarioService.comenzarSesionInvitado(uuidExistente).subscribe({
      next: (response) => {
        const userId = response.usuario.id;

        localStorage.setItem('trilog_user_id', userId);
        localStorage.setItem('trilog_empezo', 'true');

        const userIdEnmascarado = `${userId.substring(0, 4)}...${userId.substring(userId.length - 4)}`;
        console.log('Sesión de invitado iniciada con éxito. ID del usuario:', userIdEnmascarado);
        this.router.navigate(['/diario']);
      },
      error: (error) => {
        console.error('Error al comenzar sesión:', error);
      }
    });

  }
}
