import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course, iconCourse } from '../../models/course';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./courses-dialog.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ]
})
export class CoursesDialogComponent {

  icon = new FormControl<string | ''>('', [Validators.required]);
  name = new FormControl<string | ''>('', [Validators.required]);
  category = new FormControl<string | ''>('', [Validators.required]);
  teacher = new FormControl<string | ''>('', [Validators.required]);
  courseFrom = new FormControl<string | ''>('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]);
  courseTo = new FormControl<string | ''>('');

  courseForm = new FormGroup({
    icon: this.icon,
    name: this.name,
    category: this.category,
    teacher: this.teacher,
    courseFrom: this.courseFrom,
    courseTo: this.courseTo,
  });


  iconCourses: iconCourse[] = [
    {
      icon: './assets/img/angular.png',
      name: 'Angular',
      category: 'Programación y Desarrollo'
    },
    {
      icon: './assets/img/react.png',
      name: 'ReactJS',
      category: 'Programación y Desarrollo'
    },
    {
      icon: './assets/img/c.png',
      name: 'C#',
      category: 'Programación y Desarrollo'
    },
    {
      icon: './assets/img/javascript.png',
      name: 'Javascript',
      category: 'Programación y Desarrollo'
    },
    {
      icon: './assets/img/java.png',
      name: 'Java',
      category: 'Programación y Desarrollo'
    },
    {
      icon: './assets/img/python.png',
      name: 'Phyton',
      category: 'Programación y Desarrollo'
    },
    {
      icon: './assets/img/php.png',
      name: 'PHP',
      category: 'Programación y Desarrollo'
    },
    {
      icon: './assets/img/sql.png',
      name: 'PostgreSQL',
      category: 'Programación y Desarrollo'
    },
    {
      icon: './assets/img/adobe.png',
      name: 'Adobe XD',
      category: 'Diseño UX/UI'
    },
    {
      icon: './assets/img/figma.png',
      name: 'Figma',
      category: 'Diseño UX/UI'
    },
    {
      icon: './assets/img/ilustrator.png',
      name: 'Ilustrator',
      category: 'Diseño UX/UI'
    },
    {
      icon: './assets/img/photoshop.png',
      name: 'Photoshop',
      category: 'Diseño UX/UI'
    },
    {
      icon: './assets/img/after.png',
      name: 'After Effect',
      category: 'Diseño UX/UI'
    },
    {
      icon: './assets/img/rstudio.png',
      name: 'R studio',
      category: 'Data'
    },
    {
      icon: './assets/img/tableau.png',
      name: 'Tableau',
      category: 'Data'
    },
    {
      icon: './assets/img/powerbi.png',
      name: 'Power BI',
      category: 'Data'
    },
    {
      icon: './assets/img/excel.png',
      name: 'Excel',
      category: 'Data'
    },
    {
      icon: './assets/img/blockchain.png',
      name: 'Blockchain',
      category: 'Producto'
    },
  ];

  get firstStepComplete(): boolean {
    return this.name.valid && this.icon.valid && this.category.valid
  }

  get secondStepComplete(): boolean {
    return this.teacher.valid && this.courseFrom.valid && this.courseTo.valid
  }

  getErrorMessage() {
    if (this.icon.hasError('required') || this.name.hasError('required') || this.category.hasError('required') || this.teacher.hasError('required') || this.courseForm.hasError('required') || this.courseTo.hasError('required')) {
      return '* Este campo es requerido';
    }
    return '* Este campo es requerido';
  }

  constructor(
    private dialogRef: MatDialogRef<CoursesDialogComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) private data?: Course,
  ) {
    if (this.data) {
      this.icon.setValue(this.data.icon);
      this.name.setValue(this.data.name);
      this.category.setValue(this.data.category);
      this.teacher.setValue(this.data.teacher);
      this.courseFrom.setValue(this.data.courseFrom);
      this.courseTo.setValue(this.data.courseTo);
    }
  }

  onToggleChange(item: iconCourse): void {
    this.courseForm.patchValue({
      icon: item.icon,
      name: item.name,
      category: item.category
    });
  }

  formatDate(dateStr: string | null | undefined): string {
    if (!dateStr) {
      return '';
    }

    const dateObj = new Date(dateStr);
    const formattedDate = this.datePipe.transform(dateObj, 'dd/MM/yyyy');
    return formattedDate || '';
  };



  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }

}


