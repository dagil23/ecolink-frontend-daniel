import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UserPending } from '../../models/UserPending';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit {
  users: UserPending[] = [];
  isAccepted: boolean = false;
  isCanceled: boolean = false;

  constructor(private adminService: AdminService, private authService: AuthService) { }

  ngOnInit(): void {
    this.adminService.usersPending().subscribe((users: UserPending[]) => {
      this.users = users;
      for (let i = 0; i < this.users.length; i++) {
        this.authService.getImage('user', this.users[i].imageUrl).subscribe((image) => {
          this.users[i].imageUrl = image;
        })
      }
    })
  }

  validateUser(user: UserPending, state: string): void {
    if(state.toUpperCase() === 'ACCEPTED') {
      this.isAccepted = true;
    } else {
      this.isCanceled = true;
    }
    if(user.userType.toLowerCase() === 'company') {
      this.adminService.validateCompany(user.id, state).subscribe(() => {
        this.isAccepted = false;
        this.isCanceled = false;
        this.users = this.users.filter(u => u.id !== user.id);
      })
    } else if (user.userType.toLowerCase() === 'startup') {
      this.adminService.validateStartup(user.id, state).subscribe(() => {
        this.isAccepted = false;
        this.isCanceled = false;
        this.users = this.users.filter(u => u.id !== user.id);
      })
    }
  }
}
