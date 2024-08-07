import { AfterViewInit, Component, ViewChild, inject, signal, model, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CrearClaveMaestraComponent } from '../crear-clave-maestra/crear-clave-maestra.component';
import { ClaveMaestraService } from '../clave-maestra.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-clave-maestra',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatPaginatorModule, MatButtonModule, HttpClientModule],
  templateUrl: './listar-clave-maestra.component.html',
  styleUrl: './listar-clave-maestra.component.scss',
  providers: [ClaveMaestraService]
})
export class ClaveMaestraComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['position', 'name', 'clue'];
  clavesMaestras: Array<ClaveMaestra> = [];
  dataSource = new MatTableDataSource<ClaveMaestra>(this.clavesMaestras);
  readonly dialog = inject(MatDialog);
  private claveMaestraService = inject(ClaveMaestraService);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;;

  constructor(private _snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(): void {
    this.loadClavesMaestras();
  }

  openDialog(): void {
    try {

    
      const dialogRef = this.dialog.open(CrearClaveMaestraComponent, {
        width: '600px',
        disableClose: true
      });

      


      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.clavesMaestras.push(result);
          this.dataSource.data = [...this.clavesMaestras];
        }
      });
    }catch(e){
      console.log(e);
    }
  }

  loadClavesMaestras(): void {
    this.claveMaestraService.getClavesMaestras().subscribe({
      next: (resp) => {
        console.log(resp);
        try {
          this.clavesMaestras = resp;
          this.dataSource.data = [...this.clavesMaestras];
        }catch(error){
          if (error instanceof Error) {
            this.openSnackBar(
              'Error al cargar claves maestras: ' + error.message,
              5000,
              ['custom-snackbar', 'error-snackbar']
            );
          }
        }
        
      },
      error: (error) => {
        this.openSnackBar(
          'Error al cargar claves maestras',
          5000,
          ['custom-snackbar', 'error-snackbar']
        )
        console.error('Error al cargar claves maestras', error);
      }
    });
  }

  openSnackBar(message: string, duration: number, classStyles: Array<string>): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: duration,
      panelClass: classStyles
    });
  }
}

export interface ClaveMaestra {
  nombre: string;
  confirmar: string;
  contrasena: string;
  pista: string;
  id: number;
}
