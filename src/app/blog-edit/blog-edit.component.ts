import { Component, OnInit } from '@angular/core';
import { IPost } from '../post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {

  public post: IPost;
  public postForm: FormGroup;

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
    });

    const id = +this.route.snapshot.paramMap.get('id');

    this.postService.getPostById(id).subscribe(next => {
      this.post = next;
      this.postForm.patchValue(this.post);
    }, error => {
      alert('error');
      console.log(error);
      this.post = null
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const { value } = this.postForm;

      this.postService.updatePost(value).subscribe(next => {
        console.log(next);
        alert('cap nhat thanh cong');
        this.router.navigate(['/']);
      }, error => { alert('cap nhat that bai: ' + error) });
    }
  }

}
