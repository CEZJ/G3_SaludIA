import { AfterViewInit, Component } from '@angular/core';


declare const ScrollReveal: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio-component.html',
  styleUrls: ['./inicio-component.css']
})
export class InicioComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const sr = ScrollReveal();

    sr.reveal('.imgMedic_ctn', {
      duration: 3000,
      origin: 'left',
      distance: '100px'
    });

    sr.reveal('.txtProf', {
      duration: 3000,
      origin: 'bottom', // <- corregido (antes estaba 'botom')
      distance: '100px'
    });

    sr.reveal('.txt_mng', {
      duration: 3000,
      origin: 'bottom',
      distance: '100px'
    });

    sr.reveal('.appInfo_Sai', {
      duration: 3000,
      origin: 'top',
      distance: '100px'
    });
  }
}
