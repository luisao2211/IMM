import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ButtonsTable } from '../interfaces/buttonsTable.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() fields:any = []
  @Input() buttons
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>; 
  column: string[] =[]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() idUpdate = new EventEmitter<number>();
  @Output() idDelete = new EventEmitter<number>();
  @Output() buttonClick = new EventEmitter<any>();
  @Output() pdf = new EventEmitter<number>();

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["fields"] && changes["fields"].currentValue) {
        this.fields = changes["fields"].currentValue
        this.dataSource = new MatTableDataSource<any>(this.fields);
        this.fields = this.fields.map(row => {
          if (row.id || row.idviolence || row.caso_violencia || row.id_taller) {
            const { id, idviolence,caso_violencia,id_taller, ...rest } = row;
            return rest;
          }
          return row;
        });
        
        this.displayedColumns = [...Object.keys(this.fields[0]), "Actions"];
        this.column = [...this.fields, "Actions"]
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     

    }
   
 
  }
  ngOnInit() {
    
  }
  ngAfterViewInit() {
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  update(id){
    this.idUpdate.emit(id);

  }
  delete(id){
    this.idDelete.emit(id);

  }
  Pdf(id){
    this.pdf.emit(id);

  }
  touchedButton(id,indexButton:number,idviolence){
    this.buttonClick.emit([id,indexButton,idviolence])
  }
}

