import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Student } from './models/student';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from './services/students.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import Swal from 'sweetalert2';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { Store } from '@ngrx/store';
import { selectAuthIsAdmin } from 'src/app/store/auth/auth.selectors';

const urlImg = 'https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {

  public students$: Observable<Student[]>;
  showSpinner = true;
  private subscription!: Subscription;
  public admin$: Observable<boolean>;

  constructor(public dialog: MatDialog, private studentsService: StudentsService, private notifier: NotifierService, private spinner: SpinnerService, private store: Store) {
    this.students$ = this.studentsService.getStudents();
    this.admin$ = this.store.select(selectAuthIsAdmin)
  };

  ngOnInit(): void {
    this.subscription = this.spinner.getSpinner().subscribe((show: boolean) => {
      this.showSpinner = show;
    });
    this.spinner.show();
    this.studentsService.loadStudents();
    this.spinner.hide();
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateStudent(): void {
    this.dialog
      .open(StudentsDialogComponent)
      .afterClosed()
      .subscribe({
        next: (s) => {
          if (s) {
            this.studentsService.createStudents({
              id: s.id,
              name: s.name,
              surname: s.surname,
              phone: s.phone,
              email: s.email,
              password: s.password,
              img: urlImg
            });
            this.notifier.showSucces('Estudiante creado', 'El estudiante se creó correctamente')
          }
        }
      })
  };

  onDeleteStudent(studentToDelete: Student): void {
    Swal.fire({
      title: `¿Estás seguro que queres eliminar el curso de <span style = "color: #F44336">${studentToDelete.name} ${studentToDelete.surname}</span>?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentsService.deleteStudents(studentToDelete.id)
        this.notifier.showSucces('Eliminado', 'El registro ha sido eliminado correctamente');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.notifier.showError('Cancelado', 'La acción ha sido cancelada');
      }
    })
  };

  onEditStudent(studentToEdit: Student): void {
    this.dialog
      .open(StudentsDialogComponent, {
        data: studentToEdit
      })
      .afterClosed()
      .subscribe({
        next: (studentUpdated) => {
          if (studentUpdated) {
            studentUpdated.img = studentToEdit.img;
            this.studentsService.updatedStudents(studentToEdit.id, studentUpdated)
            this.notifier.showSucces('Estudiante modificado', 'El estudiante se modificó correctamente')
          }
        }
      })
  }
}
