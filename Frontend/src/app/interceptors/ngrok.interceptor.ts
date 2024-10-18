import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Used for testing with an ngrok application
export const ngrokInterceptor: HttpInterceptorFn = (req, next) => {
  if (environment.production) {
    let newReq = req.clone({
      headers: req.headers.set('ngrok-skip-browser-warning', 'let me IN'),
    });
    return next(newReq);
  }

  return next(req);
};
