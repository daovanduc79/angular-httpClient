import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { IPost } from '../post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public posts: IPost[] = [];
  public postForm: FormGroup;

  constructor(
    private postService: PostService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.postService.getPosts().subscribe(next => {
      this.posts = next;
      // console.log(this.posts);
    }, error => { alert('khong ket noi duoc api') });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const { value } = this.postForm;
      this.postService.createPost(value).subscribe(next => {
        console.log(next);
        this.posts.unshift(next);
        this.postForm.reset({
          title: '',
          body: ''
        });
        alert('them moi thanh cong')
      }, error => { alert('them moi that bai') })
    }
  }

  delete(id: number) {
    const post = this.posts[id];

    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(t => t.id !== post.id);
      // console.log(a);
      alert('xoa thanh cong');
    })
  }

}
