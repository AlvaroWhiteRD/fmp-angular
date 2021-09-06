import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/models/Products';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  registerProductFormGroup:FormGroup;
  productList:any[] = [];

  loading:boolean;

  productID:number = 0;
  productCode:string = "";

  /*variables para el paginador*/

  pageNumber:number = 1;
  pageSize:number = 1;
  pageSizeOptions = [1,5,10];
  
  /*variables para el paginador*/

  constructor( private toastr:ToastrService,
              private _productServices:ProductsService) { 

    this.registerProductFormGroup = new FormGroup({
      ProductName: new FormControl('',[Validators.required]),
      ProductDescription: new FormControl('',[Validators.required]),
      PriceOfTheProduct: new FormControl('',[Validators.required]),
      Id: new FormControl(''),
      ProductCode: new FormControl('')
    });

    this.loading = false;
  }

  ngOnInit(): void {
    this.GetListProducts();
  }

  CreateNewProduct():void{
    
    console.log(this.registerProductFormGroup.valid)
    if(this.registerProductFormGroup.valid){

      const PRODUCT:Products = {
        ProductCode:"PRO-",
        ProductName: this.registerProductFormGroup.value.ProductName,
        ProductDescription: this.registerProductFormGroup.value.ProductDescription,
        PriceOfTheProduct: parseFloat(this.registerProductFormGroup.value.PriceOfTheProduct),
      }
      this.loading = true;
      
      this._productServices.CreateNewProduct(PRODUCT).subscribe( data=>{
  
        this.toastr.success( data.message, 'Producto Registrado');
        
        this.GetListProducts();
        
        //limpiamos el formulario.
        this.registerProductFormGroup.reset(); 
  
        this.loading = false;
      
       }, error=>{
           this.loading = false;
          
           console.log(error);
           
           this.toastr.error(error.error.message, 'Error De Registro');
           //limpiamos el formulario.
           this.registerProductFormGroup.reset(); 
       }
       );
  
    }

   
  }

  UpdateProduct():void{

    console.log(this.registerProductFormGroup.valid)
    if(this.registerProductFormGroup.valid){
    
      const PRODUCT:any = {
        Id: this.productID,
        ProductCode:this.registerProductFormGroup.value.ProductCode,
        ProductName: this.registerProductFormGroup.value.ProductName,
        ProductDescription: this.registerProductFormGroup.value.ProductDescription,
        PriceOfTheProduct: this.registerProductFormGroup.value.PriceOfTheProduct,
    }

    this.loading = true;

    this._productServices.UpdateProduct(PRODUCT).subscribe( data=>{

      console.log(data);

      this.toastr.success( data.message, 'Producto Registrado');
      this.GetListProducts();

      this.loading = false;

     }, error=>{
         this.loading = false;
        
         console.log(error);
         
         this.toastr.error(error.error.message, 'Error De Registro');
         //limpiamos el formulario.
         this.registerProductFormGroup.reset(); 
     }
     );

    
    }
  }

  GetProductDetailById(productID:number):void{
    
    this.productID = productID;
    
    this.loading = true;
    
    this._productServices.GetProductDetailById(productID).subscribe( data=>{

     this.registerProductFormGroup.setValue({
          Id:productID,
          ProductCode:data.productCode,
          ProductName:data.productName,
          ProductDescription:data.productDescription,
          PriceOfTheProduct:data.priceOfTheProduct
      });

      this.loading = false;

     }, error=>{
         this.loading = false;
        
         console.log(error);
         
         this.toastr.error(error.error.message, 'Error De Registro');
         //limpiamos el formulario.
         this.registerProductFormGroup.reset(); 
     }
     );

  }

  GetListProducts():void{
    
    this.loading = true;

    this._productServices.GetListProducts().subscribe( data=>{

      
      this.productList = data;

      this.loading = false;

     }, error=>{
         this.loading = false;
        
         console.log(error);
         
         this.toastr.error(error.error.message, 'Error De Registro');
     }
     );

  }

  DeleteProduct():void{
    this.loading = true;

    this._productServices.DeleteProduct(this.productID).subscribe(data=>{
      this.toastr.success( data.message, 'Producto Eliminado');
      this.loading = false;
      this.GetListProducts();
    }
    , error=>{
      this.loading = false;
     
      console.log(error);
      
      this.toastr.error(error.error.message, 'Error al eliminar');
  });
  }
  DeleteProductModal(productID:number):void{
    this.productID = productID;
  }

//paginador
  HandlePages(e:PageEvent){

    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;

  }

}
