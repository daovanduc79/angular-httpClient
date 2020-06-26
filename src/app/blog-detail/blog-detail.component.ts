import { Component, OnInit } from '@angular/core';
import { IPost } from '../post';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  public post: IPost;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(){
    const id = +this.route.snapshot.paramMap.get('id');
    
    this.postService.getPostById(id).subscribe(next => {
      console.log(next);
      this.post = next;
    }, error => {console.log(error)});
  }

}
