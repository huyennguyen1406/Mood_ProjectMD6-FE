import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongService} from '../../../service/song.service';
import {User} from '../../../model/User';
import {UsersService} from '../../../service/users.service';
import {HttpService} from '../../../service/http.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from "rxjs";
import * as moment from "moment/moment";

declare var Swal: any;

@Component({
  selector: 'app-creat-song',
  templateUrl: './creat-song.component.html',
  styleUrls: ['./creat-song.component.css']
})
export class CreatSongComponent implements OnInit {

  songForm: FormGroup;
  message: string;
  user: User;
  userid: string;
  avatarUrlSong: string;
  mp3UrlSong: string;
  selectImg: any = null;
  selectFile: any = null;

  downloadImgURL?: Observable<string>;
  downloadAudURL?: Observable<string>;

  constructor(private formBuilder: FormBuilder,
              private songService: SongService,
              private userService: UsersService,
              private httpService: HttpService,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {


    this.songForm = this.formBuilder.group(
      {
        nameSong: ['', [Validators.required]],
        descriptionSong: [''],
        tags: [''],
        avatarUrlSong: ['', [Validators.required]],
        mp3UrlSong: ['', [Validators.required]]
      });
    this.userid = this.httpService.getID();
    this.userService.getUserById(this.userid).subscribe(res => {
      this.user = res;
      this.avatarUrlSong = res.avatarURL;
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    const now = new Date()
    const dateConvert = moment(now).format('yyyy-MM-DD');
    console.log(dateConvert)
    const song = {
      nameSong: this.songForm.value.nameSong,
      descriptionSong: this.songForm.value.descriptionSong,
      tags: this.songForm.value.tags,
      avatarUrlSong: this.avatarUrlSong,
      mp3UrlSong: this.mp3UrlSong,
      user: this.user,
      dateCreateSong: dateConvert
    };
    console.log(song)
    this.songService.createSong(song).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 3000
      });
      this.songForm.reset();
    });
  }

  // tslint:disable-next-line:typedef
  // submitAvatar() {
  //   this.submitFile();
  //   if (this.selectImg !== null) {
  //     const filePath = `avatarsong/${this.selectImg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe(url => {
  //           this.avaUrl = url;
  //         });
  //       })
  //     ).subscribe();
  //   }
  // }

  submitAvatar() {
    var n = Date.now();
    // @ts-ignore
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadImgURL = fileRef.getDownloadURL();
        this.downloadImgURL.subscribe(url => {
          if (url) {
            this.avatarUrlSong = url;
          }
          console.log(this.avatarUrlSong);
        })
      })
    )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      })
  }

  // tslint:disable-next-line:typedef
  showPreAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectImg = event.target.files[0];
      this.submitAvatar();
    } else {
      this.selectImg = null;
    }
  }

  // tslint:disable-next-line:typedef
  // submitFile() {
  //   if (this.selectFile !== null) {
  //     const filePath = `file/${this.selectFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
  //     const fileRef = this.storage.ref(filePath);
  //     this.storage.upload(filePath, this.selectFile).snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe(url => {
  //           this.fileUrl = url;
  //           this.onSubmit();
  //         });
  //       })
  //     ).subscribe();
  //   }
  // }

  submitFile() {
    var n = Date.now();
    // @ts-ignore
    const file = event.target.files[0];
    const filePath = `RoomsAudios/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsAudios/${n}`, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadAudURL = fileRef.getDownloadURL();
        this.downloadAudURL.subscribe(url => {
          if (url) {
            this.mp3UrlSong = url;
          }
          console.log(this.mp3UrlSong);
        })
      })
    )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      })
  }

  // tslint:disable-next-line:typedef
  showPreFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectFile = event.target.files[0];
      this.submitFile();
    } else {
      this.mp3UrlSong = '';
      this.selectFile = null;
    }
  }
}
