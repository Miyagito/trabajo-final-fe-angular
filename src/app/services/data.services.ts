import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriasResponse } from '../models/categorias-response.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private dataUrl = 'assets/data/categorias.json';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<CategoriasResponse> {
    // Cambia el tipo de retorno a CategoriasResponse
    return this.http.get<CategoriasResponse>(this.dataUrl);
  }
}
