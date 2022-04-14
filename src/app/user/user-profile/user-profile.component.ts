import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../service/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Users} from '../../model/Users';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Role} from '../../model/Role';
declare var Swal: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  user: Users;
  userId: string = this.httpService.getID();
  avaUrl: string;
  selectImg: any = null;
  roles: Role[];

  constructor(private formBuilder: FormBuilder,
              private userService: UsersService,
              private route: Router,
              private router: ActivatedRoute,
              private httpService: HttpService,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]

      });
    this.userId = this.httpService.getID();
    this.userService.getUserById(this.userId).subscribe(res => {
      this.user = res;
      this.avaUrl = res.avatarUrl;
      this.userForm.patchValue(this.user);
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    const newUser = {
      name: this.userForm.value.name,
      address: this.userForm.value.address,
      phone: this.userForm.value.phone,
      email: this.userForm.value.email
    };
    // @ts-ignore
    this.userService.updateUser(this.userId, newUser).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: res.message,
        showConfirmButton: true,
        timer: 3000
      });
      console.log(this.userId);
    });
    // @ts-ignore
    // this.route.navigate('/home');
  }

  // tslint:disable-next-line:typedef
  sendToFirebase(){
    if (this.selectImg !== null){
      const filePath = `avatarUser/${this.selectImg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.avaUrl = url;
          });
        })
      ).subscribe();
    }
  }

  // tslint:disable-next-line:typedef
  showPre(event: any){
    if (event.target.files && event.target.files[0]){
      this.selectImg = event.target.files[0];
      this.sendToFirebase();
    } else {
      this.avaUrl = this.user.avatarUrl;
      this.selectImg = null;
    }
  }
}
