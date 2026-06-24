import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  constructor(private router: Router) { }

  //al comenzar se envia una peticion al back para crear usuario con la fecha de inicio y desde aqui el front guardamos trilog_empezo en true para que no vuelva a aparecer el inicio
  //y se redirige a diario, hacer comprobacion por si acaso ya existe el usuario y no se crea de nuevo, si ya existe se redirige a diario directamente y se vuelve a guardado trilog_empezo en true para que no haya errores en el futuro
  ngOnInit() {
    const trilogEmpezo = localStorage.getItem('trilog_empezo');
    if (trilogEmpezo === 'true') {
      this.router.navigate(['/diario']);
    } else {
      this.comenzar();
    }
  }

  comenzar() {
    //llamada a back para primero comprobar y luego si no existe crear 

    //this.router.navigate(['/diario']);


  }
}
