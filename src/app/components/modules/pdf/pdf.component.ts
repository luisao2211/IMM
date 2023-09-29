import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {
  @ViewChild('htmlData') htmlData!: ElementRef;

  constructor() {}

 public openPDF(): void {
    const PDF = new jsPDF();

    // Agregar contenido al PDF
    PDF.text('¡Este es un PDF generado desde Angular!', 10, 10);
    PDF.text('Nombre: John Doe', 10, 20);
    PDF.text('Correo electrónico: john@example.com', 10, 30);

    // Guardar el PDF con un nombre específico
    PDF.save('angular-demo.pdf');
  }
}