import { HttpInterceptorFn } from '@angular/common/http';
import { map, of } from 'rxjs';
const apiKey: string = 'live_Ccfo2VkbvNpLUzGHmOWJrQZReGqs1Q34KdKDd7uy07cY3LwI6BJdHgu2jadWnLnY';
const cache = new Map<string, any>();

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  req.headers.append('x-api-key', apiKey);
  if(req.method === 'GET' && req.urlWithParams && cache.has(req.urlWithParams)) {
    return of(cache.get(req.urlWithParams))
  }
  return next(req).pipe(
    map((res)=> {
      if(req.method === 'GET' && req.urlWithParams){
        cache.set(req.urlWithParams, res)
      }
      return res;
    })
  );
};
