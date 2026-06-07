import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private cache =
    new Map<string, string>();

  constructor(
    private http: HttpClient
  ) {}

  load(path?: string): Observable<string> {

    if (!path) {
      return of('assets/img/no-image.png');
    }

    const cached =
      this.cache.get(path);

    if (cached) {
      return of(cached);
    }

    return this.http.get(
      `/api/hitbox/files?key=${encodeURIComponent(path)}`,
      {
        responseType: 'blob'
      }
    ).pipe(

      map(blob => {

        const url =
          URL.createObjectURL(blob);

        this.cache.set(
          path,
          url
        );

        return url;
      })
    );
  }
}
