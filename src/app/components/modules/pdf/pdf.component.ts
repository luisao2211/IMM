import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PdfsInterface } from '../interfaces/pdfs.interface';
import { ModulesService } from '../services/modules.service';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {
  @Input() Pdf: PdfsInterface 
 constructor(private service: ModulesService<any>) {}
  pdf :PdfsInterface
  ngOnInit() {
    this.service.data$.subscribe((data) => {
      this.pdf = data;
    });
  }
  @ViewChild('pdfElement') pdfEl!: ElementRef;
  
  options = {
    margin: 1,
    filename: 'newfile.pdf',
    image: {
      type: 'png',
      quality: 1,
      width: 600, // Ancho máximo de la imagen en el PDF
    },
    html2canvas: { scale: 2,useCORS: true },

    jsPDF: {
      unit: 'cm',
      format: 'letter',
      orientation: 'portrait',
      // Ajusta scrollY para que incluya contenido no visible
      scrollY: 0, // Puedes ajustar esto según tus necesidades
    },
  };
  
  
  downloadPDF() {
    const pEl = document.getElementById('pEl');
    const clone =pEl.innerHTML;
    console.warn(clone)
    this.options.filename = this.pdf.title? `${this.pdf.title}`:'Reporte'
    html2pdf().from(clone).set(this.options).save();
  }
  
  chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  
}