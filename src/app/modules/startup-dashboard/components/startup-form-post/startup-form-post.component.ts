import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Ods } from '../../../../core/models/Ods';
import { OdsService } from '../../../startups/services/ods.service';
import { StartupPostsService } from '../../services/startup-posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-startup-form-post',
  templateUrl: './startup-form-post.component.html',
  styleUrl: './startup-form-post.component.scss'
})
export class StartupFormPostComponent implements OnInit {
  postForm!: FormGroup;
  odsList: Ods[] = [];
  selectedFile?: File;
  isEditing: boolean = false;
  postId: string | null = null;
  htmlContent: string = '';
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required),
  });

  constructor(private fb: FormBuilder, private odsService: OdsService, private startupPosts: StartupPostsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editor = new Editor();
    
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: [null, Validators.required],
      ods: [[], Validators.required]
    });

    this.odsService.getOds().subscribe((ods: Ods[]) => {
      this.odsList = ods;
    });

    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.isEditing = true;
      this.loadPostData();
    }
  }

  loadPostData() {
    this.startupPosts.getPostById(this.postId!).subscribe(post => {
      this.postForm.patchValue(post);
    });
  }

  onSubmit(): void {
    if (!this.postForm.valid) {
      this.postForm.markAllAsTouched();
      return;
    };

    const formData = new FormData();

    const postData = {
      title: this.postForm.get('title')?.value,
      shortDescription: this.postForm.get('shortDescription')?.value,
      description: this.postForm.get('description')?.value,
      odsList: [...this.postForm.get('ods')?.value.map((ods: any) => ods.id)]
    };
    
    formData.append('post', JSON.stringify(postData));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
      console.log("Image:", this.selectedFile);
    } else {
      console.error('No file selected');
    }

    if (this.isEditing) {
      this.startupPosts.updatePost(this.postId!, formData).subscribe(() => {
        console.log('Post updated successfully');
        window.location.href = '/startup-dashboard/posts';
      });
    } else {
      this.startupPosts.createPost(formData).subscribe(() => {
        console.log('Post created successfully');
        window.location.href = '/startup-dashboard/posts';
      });
    }
  }

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Deselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  validateOdsList(): void {
    const preferenceControl = this.postForm.get('ods');
    if (preferenceControl && preferenceControl.value.length === 0) {
      preferenceControl.setErrors({ required: true });
    } else {
      preferenceControl?.setErrors(null);
    }
    preferenceControl?.markAsTouched();
    preferenceControl?.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
