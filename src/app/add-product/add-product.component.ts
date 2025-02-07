import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { AWSService } from '../service/aws.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  public addProductForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null | undefined = null;
  public validationMsg: string = '';
  imagePreviews: string[] = [];
  imageFileName: string[] = [];
  inputValue: string = '';
  isDropdownOpen: boolean = false;
  options: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grapes'];
  filteredOptions: string[] = [...this.options];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.inputValue.toLowerCase())
    );
  }

  selectOption(option: string) {
    this.inputValue = option;
    this.isDropdownOpen = false;
  }

  constructor(private fb: FormBuilder, private productService: ProductService, private awsService: AWSService) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.max(50)])],
      discreption: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.max(100)])],
      price: ['', Validators.min(0)],
      discount: [''],
      discountType: [''],
      sku: [''],
      barcode: [''],
      image: [''],
      quantity: ['', Validators.min(0)],
      brand: ['']
    });
  }

  async onSubmit(isValid: boolean) {
    if (isValid) {
      this.addProductForm.patchValue({
        image: this.imageFileName
      })
      this.validationMsg = '';
      await this.productService.addProduct(this.addProductForm.value);
      console.log("product added successfully");
      this.addProductForm.reset();
      this.imagePreviews = [];
    } else {
      this.validationMsg = "all field must be filled";
    }
  }

  async onImageUpload(event: any) {
    const fileInput = event.target as HTMLInputElement;
    let fileName: any;
    let fileType: any;
    this.selectedFile = event.target.files[0];
    if (fileInput?.files) {
      Array.from(fileInput.files).forEach((file) => {
        fileName = file.name;
        fileType = file.type;
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
    let sku = this.addProductForm.get("sku")?.value;
    await this.uploadImage(fileName, fileType, sku);
    this.imageFileName.push(fileName);
  }

  async uploadImage(fileName: String, fileType: String, sku: string) {
    let preSignedURLObj = {
      fileName: fileName,
      fileType: fileType,
      sku: sku
    }
    let preSingedUrl = await this.awsService.getPreSignedURL(preSignedURLObj);
    await this.uploadImageToAWS(preSingedUrl, fileType);
  }

  async uploadImageToAWS(preSingedUrl: string, fileType: any): Promise<boolean> {
    try {
      const uploadResult = await fetch(preSingedUrl, {
        method: 'PUT',
        body: this.selectedFile,
        headers: { 'Content-Type': fileType }
      });
      console.log(uploadResult);
      return uploadResult.ok;
    } catch (error) {
      console.error('S3 Upload Failed:', error);
      return false;
    }

  }
}
