// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// sslRootCas.addFile("A:/Programming/Merum/Merum-BE/Certificates/localCert.cer");
// sslRootCas.Inject();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
