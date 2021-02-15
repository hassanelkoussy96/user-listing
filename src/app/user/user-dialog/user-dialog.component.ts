import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/user.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-add-update-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  action: string;
  user: any;
  userForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>, private fb: FormBuilder,
              @Optional() @Inject(MAT_DIALOG_DATA) public dataFromParent: { user: User, action: string }) {
  }

  ngOnInit(): void {

    this.user = this.dataFromParent.user;
    this.action = this.dataFromParent.action;

    if (this.action !== 'Delete') {

      this.userForm = this.fb.group({
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email])
      });

      if (this.action === 'Update') {
        this.userForm.patchValue({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email
        });
      }

    }
  }

  onSubmit(formValue) {
    formValue.id = this.user.id;
    this.dialogRef.close({event: this.action, data: formValue});
  }

  deleteUser() {
    this.dialogRef.close({event: this.action, data: this.user});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}
