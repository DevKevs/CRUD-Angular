import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  Data: FormGroup;
  UpdateData: FormGroup;
  Result: any;
  Validation: boolean = false;
  DeleteVal: boolean = false;
  UpdateVal: boolean = false;
  Info: any;

  constructor(private http: HttpClient) {
    this.Data = new FormGroup({
      Nombre_categoria: new FormControl()
    });
    this.UpdateData = new FormGroup({
      Id: new FormControl(),
      Nombre_categoria: new FormControl()
    });
  }

  ngOnInit(): void {
    this.fetchAll()
  }
  //save function using API
  save(){
    this.http.post('https://fusion-super-mini-market.herokuapp.com/api/Registro_Categorias', this.Data.value).subscribe(obj => {
      this.Result = obj
      if(this.Result.ok == true){
        this.Validation = true;
        this.Data.reset();
        this.Info = [];
        this.fetchAll();
      }
    })
    setTimeout(() => {
      this.Validation = false
    }, 7000);
  }
  //Function to show data
  fetchAll(){
    this.http.get('https://fusion-super-mini-market.herokuapp.com/api/Mostrar_Todas_Categoria').subscribe(obj => {
      this.Info = obj
    })
  }
  //function to update info from API
  update(){
    this.http.post('https://fusion-super-mini-market.herokuapp.com/api/Actualizar_Categoria/'+ this.UpdateData.value.Id, this.UpdateData.value).subscribe(obj => {
      this.Result = obj
      if(this.Result.ok == true){
        this.UpdateVal = true;
        this.Info = [];
        this.fetchAll();
      }
    })
    setTimeout(() => {
      this.UpdateVal = false
    }, 7000);
  }
  delete(idCat: any){
    this.http.get('https://super-mini-market.herokuapp.com/api/Borrar_Categoria/'+idCat).subscribe(obj => {
      this.Result = obj
      if(this.Result.ok == true){
        this.DeleteVal = true;
        this.Info = [];
        this.fetchAll();
      }
      setTimeout(() => {
        this.DeleteVal = false
      }, 7000);
    })
  }
  //Function to load the information on the modal form
  LoadForm(idCat: any){
    this.UpdateData.setValue({
      Id: idCat.IdCategoria,
      Nombre_categoria: idCat.Nombre_Categoria
    })
  }
}
