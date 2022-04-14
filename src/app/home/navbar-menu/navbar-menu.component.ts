import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SongService} from '../../service/song.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.css']
})
export class NavbarMenuComponent implements OnInit {


  searchForm: FormGroup;

  constructor(private songService: SongService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group(
      {
        nameSearch: ['']
      });
    // window.sessionStorage.setItem("userId","1");
  }

  // tslint:disable-next-line:typedef
  search() {
    this.router.navigate(['/search'], { queryParams: { search: this.searchForm.value.nameSearch } });
  }
}
