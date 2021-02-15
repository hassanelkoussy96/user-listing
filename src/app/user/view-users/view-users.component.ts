import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableModule, MatTable} from '@angular/material/table';
import {UserService} from '../../services/userService/user.service';
import {MatDialog} from '@angular/material/dialog';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';
import {User} from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  tableData: any;
  displayedColumns: string[];
  paginiationParams: any;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private userService: UserService, public dialog: MatDialog, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.userService.getAll({pageSize: 5}).subscribe((res: any) => {
      this.tableData = res;
      this.displayedColumns = ['id', 'name', 'email', 'actions'];
    });
  }

  openDialog(action, obj) {

    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: {user: obj, action: action}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addUser(result.data);
      } else if (result.event === 'Update') {
        this.updateUser(result.data);
      } else if (result.event === 'Delete') {
        this.deleteUser(result.data);
      }
    });
  }

  addUser(user: User) {
    this.userService.createUser(user).subscribe(response => {
      this.toastr.success(user.first_name + ' ' + user.last_name + ' has been created successfully!', 'Success');
    }, error => {
      this.toastr.error(error.error.message, 'Error');
    });
  }

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe(response => {
      this.toastr.success(user.first_name + ' ' + user.last_name + ' has been updated successfully!', 'Success');
    }, error => {
      this.toastr.error(error.error.message, 'Error');
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe(response => {
      this.toastr.success(user.first_name + ' ' + user.last_name + ' has been deleted successfully!', 'Success');
    }, error => {
      this.toastr.error(error.error.message, 'Error');
    });
  }

  onPage(event) {
    this.userService.getAll(event).subscribe((res: any) => {
      this.tableData = res;
    });
  }
}
