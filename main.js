(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet>\n    <app-spinner></app-spinner>\n</router-outlet>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/contact/contact.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/contact/contact.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container header-inner\">\n        <div class=\"row mb-3\">\n            <div class=\"col-lg-12 d-flex justify-content-center flex-column text-center mt-min-100\">\n                <img src=\"assets/images/image-antim.svg\" class=\"wow fadeInUp\" data-wow-duration=\".8s\" data-wow-delay=\"0.5s\">\n                <h1 class=\"wow fadeInUp mt-4\" data-wow-duration=\".8s\" data-wow-delay=\"0.5s\">Contact us</h1>\n                <p class=\"wow fadeInUp\" data-wow-duration=\".8s\" data-wow-delay=\"0.5s\">Do you face any problem, have a suggestion or complain? we would love to hear from you. Just fill the form below, or contact us on our Mobile, Email mentioned in this page.\n                    </p>\n            </div>\n        </div>\n </div>\n\n <div class=\"container\">\n     <div class=\"row\">\n            <div class=\"col-md-12 text-center\">\n                    <div class=\"card\">\n                        <div class=\"card-body\">\n                            <ngb-tabset type=\"pills\" [orientation]=\"currentOrientation\">\n                              <ngb-tab title=\"Contact Form\">\n                                <ng-template ngbTabContent>\n                                  <!-- Default form contact -->\n                                <form class=\"text-center mat-card p-5 contact-form row justify-content-end\" [formGroup]=\"contactForm\" (ngSubmit)=\"onSubmit()\">\n                                        <!-- Name -->\n                                        <div class=\"form-group col-lg-12 mb-4\">\n                                            <label class=\"text-left font-bold\">Name</label>\n                                            <input type=\"text\" formControlName=\"contactFormName\" id=\"defaultContactFormName\" mdbInput\n                                            class=\"form-control\" placeholder=\"name type here...\">\n                                            <div *ngIf=\"contactForm.controls['contactFormName'].touched && !contactForm.controls['contactFormName'].valid\" class=\"error-msg alert alert-danger text-left\">Name required</div>\n\n                                        </div>\n                                        <!-- Email -->\n                                        <div class=\"form-group col-lg-12 mb-4\">\n                                            <label class=\"text-left font-bold\">Email</label>\n                                            <input type=\"email\" formControlName=\"contactFormEmail\" id=\"defaultContactFormEmail\" mdbInput\n                                            class=\"form-control\" placeholder=\"email type here...\">\n                                            <div *ngIf=\"contactForm.controls['contactFormEmail'].touched && !contactForm.controls['contactFormEmail'].valid\" class=\"error-msg alert alert-danger text-left\">Email required</div>\n\n                                         </div>\n                                          <!-- Phone Number -->\n                                         <div class=\"form-group col-lg-8 mb-4\">\n                                                <label class=\"text-left font-bold\">Mobile No</label>\n                                                <input type=\"text\" formControlName=\"contactFormPhone\" id=\"defaultContactFormEmail\" mdbInput\n                                                class=\"form-control\" placeholder=\"type mobile here...\">\n                                                <div *ngIf=\"contactForm.controls['contactFormPhone'].touched && !contactForm.controls['contactFormPhone'].valid\" class=\"error-msg alert alert-danger text-left\">Phone required</div>\n\n                                       </div>\n                                        <!-- Subject -->\n                                        <div class=\"form-group col-lg-4 mb-4\">\n                                            <label class=\"text-left font-bold\">Comment Type </label>\n                                            <select formControlName=\"contactFormSubjects\" class=\"browser-default custom-select\">\n                                                <option value=\"\" disabled>Choose option</option>\n                                                <option value=\"1\" selected>Suggestion</option>\n                                                <option value=\"2\">Report a bug</option>\n                                                <option value=\"3\">Feature request</option>\n                                                <option value=\"4\">Feedback</option>\n                                                <option value=\"5\">Other</option>      \n                                            </select>\n                                            <svg  class=\"arrow\" width=\"14\" height=\"12\" viewBox=\"0 0 14 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                <path d=\"M1 1.2113L7 10.7606L13 1.2113\" stroke=\"#B4B2AD\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            </svg>\n                                            <div *ngIf=\"contactForm.controls['contactFormSubjects'].touched && !contactForm.controls['contactFormSubjects'].valid\" class=\"error-msg alert alert-danger text-left\">Comment Type required</div>\n\n                                        </div>\n                                    \n                                        <!-- Message -->\n                                        <div class=\"form-group col-lg-12 mb-4\">\n                                        <label class=\"text-left font-bold\">Message</label>\n                                        <textarea formControlName=\"contactFormMessage\" class=\"form-control rounded-0\" mdbInput id=\"exampleFormControlTextarea2\"\n                                            rows=\"2\" placeholder=\"message type here...\"></textarea>\n                                       <div *ngIf=\"contactForm.controls['contactFormMessage'].touched && !contactForm.controls['contactFormMessage'].valid\" class=\"error-msg alert alert-danger text-left\">Message required</div>\n\n                                        </div>\n                                \n                                        <!-- Copy -->                                    \n                                        <!-- Send button -->\n                                        <button block=\"true\"class=\"btn btn-info btn-lg btn-block btn-purple col-lg-3 p-4 mx-2\"\n                                        mdbWavesEffect type=\"submit\" [disabled]=\"disabledSubmitButton\">Send</button>\n                                    \n                                    </form>\n                                    <div class=\"pattern-up pattern-form\"></div>\n\n                                    <!-- Default form contact -->\n                                </ng-template>\n                              </ngb-tab>\n                              <ngb-tab>\n                                <ng-template ngbTabTitle>Contact Information</ng-template>\n                                <ng-template ngbTabContent>\n                                    <div class=\"container mt-5 text-left\">\n                                        <div class=\"row mat-card\">\n                                            <div class=\"col-lg-12\">\n                                                <h4 class=\"font-bold font-purple heading-icon py-4\">\n                                                        <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#5C20D2\"/>\n                                                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.4 10H21.6C22.37 10 23 10.63 23 11.4V19.8C23 20.57 22.37 21.2 21.6 21.2H10.4C9.63 21.2 9 20.57 9 19.8V11.4C9 10.63 9.63 10 10.4 10Z\" stroke=\"#F9F9F9\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                        <path d=\"M23 11.4L16 16.3L9 11.4\" stroke=\"#F9F9F9\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                        </svg>Email\n                                                    </h4>\n                                            </div>\n                                            <div class=\"col-lg-4 col-12\">\n                                                <div class=\"grey-color\">Intime care</div>\n                                                <div><a href=\"mailto:sscare@intime.com\" class=\"font-bold\">sscare@intime.com</a></div>\n                                            </div>\n                                            <div class=\"col-lg-4 col-12\">\n                                                    <div class=\"grey-color\">Intime care</div>\n                                                    <div><a href=\"mailto:sscare@intime.com\" class=\"font-bold\">sscare@intime.com</a></div>\n                                                </div>\n                                        \n                                            <div class=\"col-lg-4 col-12\">\n                                                <div class=\"grey-color\">customers service</div>\n                                                <div><a href=\"mailto:supportus@Intime.com\" class=\"font-bold\">supportus@Intime.com</a></div>\n                                            </div>\n                                        </div>\n                                        <div class=\"row mat-card mt-5\">\n                                                <div class=\"col-lg-12\">\n                                                    <h4 class=\"font-bold font-purple heading-icon py-4\">\n                                                            <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#5C20D2\"/>\n                                                                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.9996 19.4817V21.5892C23.0012 21.9849 22.8356 22.3628 22.5435 22.6303C22.2514 22.8977 21.8598 23.0299 21.465 22.9943C19.299 22.7594 17.2183 22.0207 15.3902 20.8376C13.6895 19.7589 12.2475 18.3198 11.1667 16.6224C9.97711 14.7897 9.23677 12.7031 9.00572 10.5316C8.97015 10.1388 9.10164 9.74913 9.36807 9.45785C9.6345 9.16656 10.0113 9.00044 10.4065 9.00007H12.5183C13.2249 8.99313 13.8272 9.51008 13.9261 10.2084C14.0152 10.8829 14.1805 11.5451 14.4188 12.1825C14.6122 12.6959 14.4885 13.2748 14.1021 13.6648L13.2081 14.557C14.2102 16.3158 15.6693 17.7721 17.4316 18.7721L18.3256 17.8799C18.7164 17.4942 19.2963 17.3708 19.8108 17.5638C20.4495 17.8016 21.113 17.9666 21.7888 18.0556C22.4967 18.1552 23.0173 18.7685 22.9996 19.4817Z\" stroke=\"#F9F9F9\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                                </svg>\n                                                                Customers Service\n                                                        </h4>\n                                                </div>\n                                                <div class=\"col-lg-4 col-12\">\n                                                    <div class=\"grey-color\">Mobile</div>\n                                                    <div><a href=\"tel:920001230\" class=\"font-bold\">920001230</a></div>\n                                                </div>\n                                                <div class=\"col-lg-4 col-12\">\n                                                        <div class=\"grey-color\">From within Kingdom</div>\n                                                        <div><a href=\"tel:8005790000\" class=\"font-bold\">8005790000</a></div>\n                                                    </div>\n                                            \n                                                <div class=\"col-lg-4 col-12\">\n                                                    <div class=\"grey-color\">From outside the Kingdom</div>\n                                                    <div><a href=\"tel:+966920001230\" class=\"font-bold\">+966920001230</a></div>\n                                                </div>\n                                            </div>\n                                            <div class=\"row mat-card mt-5\">\n                                                    <div class=\"col-lg-12\">\n                                                        <h4 class=\"font-bold font-purple heading-icon py-4\">\n                                                                <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#5C20D2\"/>\n                                                                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M22.9996 19.4817V21.5892C23.0012 21.9849 22.8356 22.3628 22.5435 22.6303C22.2514 22.8977 21.8598 23.0299 21.465 22.9943C19.299 22.7594 17.2183 22.0207 15.3902 20.8376C13.6895 19.7589 12.2475 18.3198 11.1667 16.6224C9.97711 14.7897 9.23677 12.7031 9.00572 10.5316C8.97015 10.1388 9.10164 9.74913 9.36807 9.45785C9.6345 9.16656 10.0113 9.00044 10.4065 9.00007H12.5183C13.2249 8.99313 13.8272 9.51008 13.9261 10.2084C14.0152 10.8829 14.1805 11.5451 14.4188 12.1825C14.6122 12.6959 14.4885 13.2748 14.1021 13.6648L13.2081 14.557C14.2102 16.3158 15.6693 17.7721 17.4316 18.7721L18.3256 17.8799C18.7164 17.4942 19.2963 17.3708 19.8108 17.5638C20.4495 17.8016 21.113 17.9666 21.7888 18.0556C22.4967 18.1552 23.0173 18.7685 22.9996 19.4817Z\" stroke=\"#F9F9F9\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                                    </svg>\n                                                                    Marketing & Sales\n                                                            </h4>\n                                                    </div>\n                                                    <div class=\"col-lg-4 col-12\">\n                                                        <div class=\"grey-color\">Mobile</div>\n                                                        <div><a href=\"tel:920001230\" class=\"font-bold\">8001236321</a></div>\n                                                    </div>\n                                                </div>\n                                        </div>\n                                </ng-template>\n                              </ngb-tab>\n                              <ngb-tab title=\"Our Location\">\n                                <ng-template ngbTabContent>\n                                    <div class=\"container\">\n                                        <div class=\"row\">\n                                                <!-- <div class=\"col-lg-12\" leaflet\n                                                style=\"height:100px;\"\n                                                [leafletCenter]=\"mapCenter\"\n                                                [leafletZoom]=\"zoomLevel\"\n                                                [leafletLayers]=\"leafletLayers\">\n                                           </div> -->\n                                           </div>\n                                        </div>\n                                </ng-template>\n                              </ngb-tab>\n                            </ngb-tabset>\n            \n                     </div>\n                    </div>\n                </div>\n     </div>\n </div>\n\n <footer class=\"footer py-5 bg-black\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col col-lg-2 col-12\">\n                        <img src=\"assets/images/logo.svg\" alt=\"antim\">\n\n                </div>\n                <div class=\"col col-lg-3 col-12\">\n                    <p class=\"copy-right pt-2\">2019 .All rights reserved. Smart Encryption Co.\n                        </p>\n                </div>\n                <div class=\"col col-lg-3 col-12\">\n                    <ul class=\"inline\">\n                        <li>\n                        <a href=\"#\">\n                        <svg width=\"37px\" height=\"37px\" viewBox=\"0 0 37 37\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                            <g id=\"landing-page\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                                <g id=\"HomeV2\" transform=\"translate(-648.000000, -5987.000000)\">\n                                    <g id=\"Group-10\" transform=\"translate(648.000000, 5987.000000)\">\n                                        <g id=\"Stacked-Group-4\">\n                                            <g id=\"Group-8\">\n                                                <rect id=\"Rectangle-Copy-3\" stroke=\"#F2F2F2\" x=\"0.5\" y=\"0.5\" width=\"36\" height=\"36\" rx=\"8\"></rect>\n                                                <g id=\"twitter\" transform=\"translate(8.000000, 10.000000)\" stroke=\"#FFFFFF\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\">\n                                                    <path d=\"M22,0.0102625429 C21.042385,0.68573995 19.9821079,1.20237179 18.86,1.54026254 C17.6263595,0.121800337 15.63837,-0.375623146 13.8820815,0.294715977 C12.125793,0.965055099 10.9748003,2.66056341 11,4.54026254 L11,5.54026254 C7.43066483,5.63281494 4.05202531,3.93223305 2,1.01026254 C2,1.01026254 -2,10.0102625 7,14.0102625 C4.94052756,15.4082289 2.48715691,16.1091919 0,16.0102625 C9,21.0102625 20,16.0102625 20,4.51026254 C19.9990791,4.23171618 19.9722975,3.95385694 19.92,3.68026254 C20.9406031,2.67375562 21.6608274,1.40297533 22,0.0102625429 Z\" id=\"Shape\"></path>\n                                                </g>\n                                            </g>\n                                        </g>\n                                    </g>\n                                </g>\n                            </g>\n                        </svg>\n                        </a>\n                        </li>\n                        <li>\n                            <a href=\"#\">\n\n                        <svg width=\"37px\" height=\"37px\" viewBox=\"0 0 37 37\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                            <g id=\"landing-page\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                                <g id=\"HomeV2\" transform=\"translate(-705.000000, -5987.000000)\">\n                                    <g id=\"Group-10\" transform=\"translate(648.000000, 5987.000000)\">\n                                        <g id=\"Stacked-Group-4\">\n                                            <g id=\"Group-7\" transform=\"translate(57.000000, 0.000000)\">\n                                                <rect id=\"Rectangle-Copy-2\" stroke=\"#F2F2F2\" x=\"0.5\" y=\"0.5\" width=\"36\" height=\"36\" rx=\"8\"></rect>\n                                                <g id=\"instagram\" transform=\"translate(9.000000, 9.000000)\" stroke=\"#FFFFFF\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\">\n                                                    <rect id=\"Rectangle-path\" x=\"0\" y=\"0\" width=\"20\" height=\"20\" rx=\"5\"></rect>\n                                                    <path d=\"M14,9.37 C14.2531224,11.0769716 13.3830258,12.7538445 11.8416265,13.5296738 C10.3002272,14.3055032 8.43504857,14.0053707 7.21483896,12.785161 C5.99462934,11.5649514 5.69449683,9.69977279 6.47032616,8.15837347 C7.24615548,6.61697416 8.92302841,5.74687756 10.63,6 C12.3729768,6.25846155 13.7415384,7.62702323 14,9.37 Z\" id=\"Shape\"></path>\n                                                </g>\n                                            </g>\n                                        </g>\n                                    </g>\n                                </g>\n                            </g>\n                        </svg>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\">\n                            <svg width=\"37px\" height=\"37px\" viewBox=\"0 0 37 37\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                                <g id=\"landing-page\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                                    <g id=\"HomeV2\" transform=\"translate(-762.000000, -5987.000000)\">\n                                        <g id=\"Group-10\" transform=\"translate(648.000000, 5987.000000)\">\n                                            <g id=\"Stacked-Group-4\">\n                                                <g id=\"Group-6\" transform=\"translate(114.000000, 0.000000)\">\n                                                    <rect id=\"Rectangle\" stroke=\"#F2F2F2\" x=\"0.5\" y=\"0.5\" width=\"36\" height=\"36\" rx=\"8\"></rect>\n                                                    <g id=\"facebook\" transform=\"translate(13.000000, 9.000000)\" stroke=\"#FFFFFF\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\">\n                                                        <path d=\"M11,0 L8,0 C5.23857625,0 3,2.23857625 3,5 L3,8 L0,8 L0,12 L3,12 L3,20 L7,20 L7,12 L10,12 L11,8 L7,8 L7,5 C7,4.44771525 7.44771525,4 8,4 L11,4 L11,0 Z\" id=\"Shape\"></path>\n                                                    </g>\n                                                </g>\n                                            </g>\n                                        </g>\n                                    </g>\n                                </g>\n                            </svg>\n                            </a>\n                        </li>\n                    </ul>\n                </div>\n                <div class=\"col col-lg-4 col-12\">\n                    <form class=\"subscribtion-form\">\n                        <input type=\"email\" placeholder=\"enter your email here ...\">\n                        <button type=\"submit\" class=\"btn btn-block btn-antim btn-subscribe\">Subscribe</button>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </footer>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/create-order/create-order.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/create-order/create-order.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n        <div class=\"row\">\n            <aside class=\"left-sidebar col-lg-4\">\n                <!-- Sidebar scroll-->\n                <div class=\"scroll-sidebar\">\n                    <app-sidebar></app-sidebar>\n                </div>\n                <!-- End Sidebar scroll-->\n            </aside>\n                <div class=\"page-wraper-right row\">\n                    <ul class=\"navbar-nav float-right text-right mt-4 col-lg-11\">\n                        <li class=\"nav-item m-r-20 dashbored-nav\">\n\n                                <div class=\"d-inline-block\" ngbDropdown #myDrop=\"ngbDropdown\">\n                                        <i class=\"mr-1\">\n                                                <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3766 17.7642 20.3766 18.295C20.3766 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2966 18.375 20.2966C17.8442 20.2966 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.83V21C14.08 22.1046 13.1846 23 12.08 23C10.9754 23 10.08 22.1046 10.08 21V20.91C10.0642 20.2327 9.63587 19.6339 9 19.4C8.38291 19.1277 7.66219 19.2583 7.18 19.73L7.12 19.79C6.74486 20.1656 6.23582 20.3766 5.705 20.3766C5.17418 20.3766 4.66514 20.1656 4.29 19.79C3.91445 19.4149 3.70343 18.9058 3.70343 18.375C3.70343 17.8442 3.91445 17.3351 4.29 16.96L4.35 16.9C4.82167 16.4178 4.95235 15.6971 4.68 15.08C4.42093 14.4755 3.82764 14.0826 3.17 14.08H3C1.89543 14.08 1 13.1846 1 12.08C1 10.9754 1.89543 10.08 3 10.08H3.09C3.76733 10.0642 4.36613 9.63587 4.6 9C4.87235 8.38291 4.74167 7.66219 4.27 7.18L4.21 7.12C3.83445 6.74486 3.62343 6.23582 3.62343 5.705C3.62343 5.17418 3.83445 4.66514 4.21 4.29C4.58514 3.91445 5.09418 3.70343 5.625 3.70343C6.15582 3.70343 6.66486 3.91445 7.04 4.29L7.1 4.35C7.58219 4.82167 8.30291 4.95235 8.92 4.68H9C9.60447 4.42093 9.99738 3.82764 10 3.17V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3V3.09C14.0026 3.74764 14.3955 4.34093 15 4.6C15.6171 4.87235 16.3378 4.74167 16.82 4.27L16.88 4.21C17.2551 3.83445 17.7642 3.62343 18.295 3.62343C18.8258 3.62343 19.3349 3.83445 19.71 4.21C20.0856 4.58514 20.2966 5.09418 20.2966 5.625C20.2966 6.15582 20.0856 6.66486 19.71 7.04L19.65 7.1C19.1783 7.58219 19.0477 8.30291 19.32 8.92V9C19.5791 9.60447 20.1724 9.99738 20.83 10H21C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14H20.91C20.2524 14.0026 19.6591 14.3955 19.4 15Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                </svg>\n                                            </i>\n                                        <button class=\"btn btn-outline-primary mr-1\" id=\"dropdownManual\" ngbDropdownAnchor (focus)=\"myDrop.open()\">Setting</button>\n                                        <div ngbDropdownMenu aria-labelledby=\"dropdownManual\">\n                                          <button ngbDropdownItem class=\"pruple\">\n                                              <span>\n                                                <svg width=\"13\" height=\"12\" viewBox=\"0 0 13 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                    <path d=\"M7.79995 4.2002L4.19995 7.8002\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                    <path d=\"M4.19995 4.2002L7.79995 7.8002\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                 </svg>\n                                            </span>\n                                            Deactivate the account</button>\n                                          <button ngbDropdownItem class=\"pruple\">\n                                            <span>\n                                                <svg width=\"13\" height=\"14\" viewBox=\"0 0 13 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                    <path d=\"M0 2.6665H1.33333H12\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                    <path d=\"M2.83325 2.66667C2.83325 1.83824 2.16168 1.16667 1.33325 1.16667V2.16667C1.60939 2.16667 1.83325 2.39052 1.83325 2.66667H2.83325ZM2.83325 12V2.66667H1.83325V12H2.83325ZM2.66659 11.8333C2.75863 11.8333 2.83325 11.908 2.83325 12H1.83325C1.83325 12.4602 2.20635 12.8333 2.66659 12.8333V11.8333ZM9.33325 11.8333H2.66659V12.8333H9.33325V11.8333ZM9.16658 12C9.16658 11.908 9.2412 11.8333 9.33325 11.8333V12.8333C9.79349 12.8333 10.1666 12.4602 10.1666 12H9.16658ZM9.16658 2.66667V12H10.1666V2.66667H9.16658ZM10.6666 1.16667C9.83816 1.16667 9.16658 1.83824 9.16658 2.66667H10.1666C10.1666 2.39052 10.3904 2.16667 10.6666 2.16667V1.16667ZM12.1666 2.66667C12.1666 1.83824 11.495 1.16667 10.6666 1.16667V2.16667C10.9427 2.16667 11.1666 2.39052 11.1666 2.66667H12.1666ZM12.1666 12V2.66667H11.1666V12H12.1666ZM9.33325 14.8333C10.8981 14.8333 12.1666 13.5648 12.1666 12H11.1666C11.1666 13.0125 10.3458 13.8333 9.33325 13.8333V14.8333ZM2.66659 14.8333H9.33325V13.8333H2.66659V14.8333ZM-0.166748 12C-0.166748 13.5648 1.10178 14.8333 2.66659 14.8333V13.8333C1.65406 13.8333 0.833252 13.0125 0.833252 12H-0.166748ZM-0.166748 2.66667V12H0.833252V2.66667H-0.166748ZM1.33325 1.16667C0.504825 1.16667 -0.166748 1.83824 -0.166748 2.66667H0.833252C0.833252 2.39052 1.05711 2.16667 1.33325 2.16667V1.16667ZM4.83325 1.33333C4.83325 1.42538 4.75863 1.5 4.66659 1.5V0.5C4.20635 0.5 3.83325 0.873096 3.83325 1.33333H4.83325ZM4.83325 2.66667V1.33333H3.83325V2.66667H4.83325ZM3.33325 4.16667C4.16168 4.16667 4.83325 3.49509 4.83325 2.66667H3.83325C3.83325 2.94281 3.60939 3.16667 3.33325 3.16667V4.16667ZM1.83325 2.66667C1.83325 3.49509 2.50482 4.16667 3.33325 4.16667V3.16667C3.05711 3.16667 2.83325 2.94281 2.83325 2.66667H1.83325ZM1.83325 1.33333V2.66667H2.83325V1.33333H1.83325ZM4.66659 -1.5C3.10178 -1.5 1.83325 -0.231473 1.83325 1.33333H2.83325C2.83325 0.320811 3.65406 -0.5 4.66659 -0.5V-1.5ZM7.33325 -1.5H4.66659V-0.5H7.33325V-1.5ZM10.1666 1.33333C10.1666 -0.231474 8.89806 -1.5 7.33325 -1.5V-0.5C8.34577 -0.5 9.16659 0.320811 9.16659 1.33333H10.1666ZM10.1666 2.66667V1.33333H9.16659V2.66667H10.1666ZM8.66659 4.16667C9.49501 4.16667 10.1666 3.49509 10.1666 2.66667H9.16659C9.16659 2.94281 8.94273 3.16667 8.66659 3.16667V4.16667ZM7.16659 2.66667C7.16659 3.49509 7.83816 4.16667 8.66659 4.16667V3.16667C8.39044 3.16667 8.16659 2.94281 8.16659 2.66667H7.16659ZM7.16659 1.33333V2.66667H8.16659V1.33333H7.16659ZM7.33325 1.5C7.2412 1.5 7.16659 1.42538 7.16659 1.33333H8.16659C8.16659 0.873096 7.79349 0.5 7.33325 0.5V1.5ZM4.66659 1.5H7.33325V0.5H4.66659V1.5Z\" fill=\"#5C20D2\"/>\n                                                    <path d=\"M4.66675 6V10\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                    <path d=\"M7.33325 6V10\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                </svg>   \n                                            </span>  \n                                            Delete the account</button>\n                                          <button ngbDropdownItem [routerLink]=\"[ '/login' ]\">\n                                              <span>\n                                                  <svg width=\"11\" height=\"12\" viewBox=\"0 0 11 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                <rect y=\"5\" width=\"10\" height=\"6.11111\" rx=\"2\" stroke=\"black\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                <path d=\"M2.22217 5V2.77778C2.22217 1.24365 3.46582 0 4.99995 0C6.53407 0 7.77772 1.24365 7.77772 2.77778V5\" stroke=\"black\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                </svg>\n                                                </span>\n                                              Sign Out</button>\n                                        </div>\n                                 </div>\n                        </li>\n                    </ul>\n                </div>\n        \n        \n        \n        <div class=\"page-wraper-right\">\n                <div class=\"mat-card p-1 col-lg-11 mt-5\">\n                <div class=\"mat-card row welcome-card inner p-0 m-1\">\n                        <img class=\"col-lg-2\" src=\"assets/images/bookWithMen 2.svg\">\n                        <div class=\"col-lg-10 px-0\">\n                            <p class=\"grey-text-color mt-4\">Well, it is very easy to make a request, just follow the below step and we will<br/> take care of it!\n                                </p>\n                        </div>\n                </div>\n                      \n                        <mat-horizontal-stepper linear #stepper class=\"mt-5\">\n                                <mat-step [stepControl]=\"firstFormGroup\">\n                                  <form [formGroup]=\"firstFormGroup\">\n                                    <ng-template matStepLabel>\n                                        <img src=\"assets/images/add-product.svg\">\n                                        <p class=\"font-size-13 mt-2\">Add Product</p>\n                                    </ng-template>\n                                    <mat-form-field>\n                                      <h3 class=\"mb-4 mt-4\">Enter product link(s)</h3>\n                                      <label for=\"Link1\" class=\"font-bold mt-2\">Link1</label>\n                                      <input matInput formControlName=\"link1\" class=\"form-control form-control-lg\" placeholder=\"placeholder type here …\" required>\n                                    </mat-form-field>\n\n                                    <mat-form-field>\n                                            <label for=\"Link2\" class=\"font-bold mt-2\">Link2</label>\n                                            <input matInput formControlName=\"link2\" class=\"form-control form-control-lg\" placeholder=\"placeholder type here …\"  required>\n                                     </mat-form-field>\n\n                                    <mat-form-field>\n                                            <label for=\"Link3\" class=\"font-bold mt-2\">Link3</label>\n                                            <input matInput formControlName=\"link3\" class=\"form-control form-control-lg\" placeholder=\"placeholder type here …\" required>\n                                     </mat-form-field>\n\n\n                                     <div class=\"col-lg-12 mt-3 row justify-content-center align-items-center py-4 mt-3\">     \n                                           <div class=\"form-group col-lg-3\">\n                                                <button mat-button matStepperNext class=\"btn btn-info btn-lg btn-block btn-purple mt-2\" [disabled]=\"disabledSubmitButton\">Next</button>\n                                           </div>\n                                    </div>\n                                  </form>\n                                </mat-step>\n                                <mat-step [stepControl]=\"secondFormGroup\">\n\n                                  <form [formGroup]=\"secondFormGroup\" class=\"Payment-Details-form\">\n                                    <ng-template matStepLabel>\n                                        <img src=\"assets/images/Payment-Details.svg\">\n                                        <p class=\"font-size-13 mt-2\">Payment Details</p>\n                                    </ng-template>\n                                    <mat-form-field>\n                                        <label for=\"Installment\" class=\"font-bold mt-2\">Installment Peroid</label>\n                                        <select formControlName=\"firstCtrl\" matNativeControl required class=\"form-control form-control-lg mt-3\">\n                                                <option value=\"6-Months-ex\" selected>Ex: 6 Months</option>\n                                                <option value=\"6-Months\">6 Months</option>\n                                                <option value=\"3-Months\">3 Months</option>\n                                                <option value=\"9-Months\">9 Months</option>\n                                        </select>\n                                    </mat-form-field>\n\n                                    <mat-form-field>\n                                        <label for=\"amount\" class=\"font-bold mt-2\"> The amount of the monthly installment</label>\n                                        <input matInput placeholder=\"1500 SAR\" class=\"form-control form-control-lg\" formControlName=\"secondCtrl\" required> \n                                    </mat-form-field>\n                                    <p class=\"my-5 grey-text-color\">\n                                        <span class=\"mr-1\">\n                                            <svg width=\"15\" height=\"17\" viewBox=\"0 0 15 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.5 15C11.0899 15 14 12.0899 14 8.5C14 4.91015 11.0899 2 7.5 2C3.91015 2 1 4.91015 1 8.5C1 12.0899 3.91015 15 7.5 15Z\" stroke=\"#607AE6\"/>\n                                                <path d=\"M7.5 11.1V8.5\" stroke=\"#607AE6\"/>\n                                             </svg>\n                                        </span>\n                                                \n                                        The information selected at the top is subject to change based on your credit record and your premitted amount of SIMAH. We will call you if any change is made within a period not exceeding one hour.\n                                        </p>\n                                    <div>\n                                    <div class=\"col-lg-12 mt-3 row justify-content-center align-items-center py-4 mt-5\">     \n                                            <div class=\"form-group col-lg-4\">\n                                                    <button class=\"btn btn-info btn-lg btn-block btn-black mt-2\" mat-button matStepperPrevious>Back</button>\n                                            </div>\n                                            <div class=\"form-group col-lg-3\">\n                                                <button class=\"btn btn-info btn-lg btn-block btn-purple mt-2\"  mat-button matStepperNext [disabled]=\"disabledSubmitButtonSecond\">Next</button>\n                                            </div>\n                                    </div>\n                                    </div>\n                                  </form>\n                                </mat-step>\n                                <mat-step>\n                                    <ng-template matStepLabel>\n                                            <img src=\"assets/images/confirm.svg\">\n                                            <p class=\"font-size-13 mt-2\">Confirm</p>\n                                    </ng-template>\n                                    <br/>\n\n                                    <p class=\"my-5 grey-text-color\">\n                                            <span class=\"mr-1\">\n                                                <svg width=\"15\" height=\"17\" viewBox=\"0 0 15 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.5 15C11.0899 15 14 12.0899 14 8.5C14 4.91015 11.0899 2 7.5 2C3.91015 2 1 4.91015 1 8.5C1 12.0899 3.91015 15 7.5 15Z\" stroke=\"#607AE6\"/>\n                                                    <path d=\"M7.5 11.1V8.5\" stroke=\"#607AE6\"/>\n                                                 </svg>\n                                            </span>\n                                                    \n                                            I agree on purchasing the request #1032 showing in the request screen. \n                                            <br/>and with the price showing in the request screen. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,<br/> but also the leap into electronic typesetting, remaining essentially unchanged.\n                                        </p>\n\n                                  <div>\n\n\n                                        <div class=\"col-lg-12 mt-3 row justify-content-center align-items-center py-4 mt-5\">     \n                                                <div class=\"form-group col-lg-3\">\n                                                        <button class=\"btn btn-info btn-lg btn-block btn-black mt-2\" mat-button matStepperPrevious>Back</button>\n                                                </div>\n                                                <div class=\"form-group col-lg-4\">\n                                                        <button class=\"btn btn-info btn-lg btn-block btn-black mt-2\">Save as Draft</button>\n                                                </div>\n                                                <div class=\"form-group col-lg-3\">\n                                                    <button class=\"btn btn-info btn-lg btn-block btn-purple mt-2\"  mat-button matStepperNext>Agree & Prceed\n                                                        </button>\n                                                </div>\n                                        </div>\n                                  </div>\n                                </mat-step>\n                                <mat-step [stepControl]=\"lastFormGroup\">\n                                    <ng-template matStepLabel>\n                                            <img src=\"assets/images/summary.svg\">\n                                            <p class=\"font-size-13 mt-2\">Summary</p>\n                                    </ng-template>\n                                    <h3 class=\"mb-4 mt-5\">Undertaking to Purchase</h3>\n                                    <form [formGroup]=\"lastFormGroup\" class=\"Payment-Details-form\">\n                                            <mat-form-field>\n                                                <label for=\"numberOfProduct\" class=\"font-bold mt-2\">Number of product</label>\n                                                <input matInput class=\"form-control form-control-lg\" formControlName=\"numberOfProduct\"> \n                                            </mat-form-field>\n        \n                                            <mat-form-field>\n                                                <label for=\"total\" class=\"font-bold mt-2\"> Totql price of products:</label>\n                                                <input matInput class=\"form-control form-control-lg\" formControlName=\"TotalPrice\"> \n                                            </mat-form-field>\n\n                                            <mat-form-field>\n                                                <label for=\"InstallmentPeriod\" class=\"font-bold mt-2\">Installment Period</label>\n                                                <input matInput class=\"form-control form-control-lg\" formControlName=\"InstallmentPeriod\"> \n                                            </mat-form-field>\n\n                                            <mat-form-field>\n                                                    <label for=\"InstallmentPerMonth\" class=\"font-bold mt-2\">Installment amount per month</label>\n                                                    <input matInput class=\"form-control form-control-lg\" formControlName=\"InstallmentPerMonth\"> \n                                            </mat-form-field>\n\n                                            <mat-form-field>\n                                                    <label for=\"FinalProduct\" class=\"font-bold mt-2\">Final product price (with profit)</label>\n                                                    <input matInput class=\"form-control form-control-lg\" formControlName=\"FinalProduct\"> \n                                            </mat-form-field>\n                                            <p class=\"my-5 grey-text-color\">\n                                                <span class=\"mr-1\">\n                                                    <svg width=\"15\" height=\"17\" viewBox=\"0 0 15 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.5 15C11.0899 15 14 12.0899 14 8.5C14 4.91015 11.0899 2 7.5 2C3.91015 2 1 4.91015 1 8.5C1 12.0899 3.91015 15 7.5 15Z\" stroke=\"#607AE6\"/>\n                                                        <path d=\"M7.5 11.1V8.5\" stroke=\"#607AE6\"/>\n                                                     </svg>\n                                                </span>\n                                                        \n                                                Selecting this option will require you to pay additional delivery fees of 30 SR.\n                                            </p>\n                                            <div>\n                                            <div class=\"col-lg-12 mt-3 row justify-content-center align-items-center py-4 mt-5\">     \n                                                    <div class=\"form-group col-lg-3\">\n                                                            <button class=\"btn btn-info btn-lg btn-block btn-black mt-2\" mat-button matStepperPrevious>Back</button>\n                                                    </div>\n                                                    <div class=\"form-group col-lg-3\">\n                                                        <button class=\"btn btn-info btn-lg btn-block btn-purple mt-2\"  mat-button matStepperNext (click)=\"openVerticallyCentered(content3)\">Send Request</button>\n                                                    </div>\n                                            </div>\n                                            </div>\n                                          </form>\n                            </mat-step>\n                              </mat-horizontal-stepper>\n                              <ng-template #content3 let-modal>\n                                    <div class=\"modal-body\">\n                                      <p>\n                                            Thank you Ismael,<br/>\n                                             Your request has been Successfully sent, and will be verified if you are qualified for funding and will be responded to within 30 minutes\n\n                                      </p>\n                                      <div class=\"d-flex justify-content-end\"><button class=\"btn btn-info btn-lg btn-block btn-purple mt-2 col-lg-5\" [routerLink]=\"[ '/home' ]\" (click)=\"modal.close('Close click')\">Back to home</button></div>\n\n                                    </div>\n                                  </ng-template>\n                </div>\n            </div>\n        </div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/dashbored/dashbored.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/dashbored/dashbored.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n<div class=\"row\">\n    <aside class=\"left-sidebar col-lg-4\">\n        <!-- Sidebar scroll-->\n        <div class=\"scroll-sidebar\">\n            <app-sidebar></app-sidebar>\n        </div>\n        <!-- End Sidebar scroll-->\n    </aside>\n        <div class=\"page-wraper-right row\">\n            <ul class=\"navbar-nav float-right text-right mt-4 col-lg-11\">\n                <li class=\"nav-item m-r-20 dashbored-nav\">\n\n                        <div class=\"d-inline-block\" ngbDropdown #myDrop=\"ngbDropdown\">\n                                <i class=\"mr-1\">\n                                        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3766 17.7642 20.3766 18.295C20.3766 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2966 18.375 20.2966C17.8442 20.2966 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.83V21C14.08 22.1046 13.1846 23 12.08 23C10.9754 23 10.08 22.1046 10.08 21V20.91C10.0642 20.2327 9.63587 19.6339 9 19.4C8.38291 19.1277 7.66219 19.2583 7.18 19.73L7.12 19.79C6.74486 20.1656 6.23582 20.3766 5.705 20.3766C5.17418 20.3766 4.66514 20.1656 4.29 19.79C3.91445 19.4149 3.70343 18.9058 3.70343 18.375C3.70343 17.8442 3.91445 17.3351 4.29 16.96L4.35 16.9C4.82167 16.4178 4.95235 15.6971 4.68 15.08C4.42093 14.4755 3.82764 14.0826 3.17 14.08H3C1.89543 14.08 1 13.1846 1 12.08C1 10.9754 1.89543 10.08 3 10.08H3.09C3.76733 10.0642 4.36613 9.63587 4.6 9C4.87235 8.38291 4.74167 7.66219 4.27 7.18L4.21 7.12C3.83445 6.74486 3.62343 6.23582 3.62343 5.705C3.62343 5.17418 3.83445 4.66514 4.21 4.29C4.58514 3.91445 5.09418 3.70343 5.625 3.70343C6.15582 3.70343 6.66486 3.91445 7.04 4.29L7.1 4.35C7.58219 4.82167 8.30291 4.95235 8.92 4.68H9C9.60447 4.42093 9.99738 3.82764 10 3.17V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3V3.09C14.0026 3.74764 14.3955 4.34093 15 4.6C15.6171 4.87235 16.3378 4.74167 16.82 4.27L16.88 4.21C17.2551 3.83445 17.7642 3.62343 18.295 3.62343C18.8258 3.62343 19.3349 3.83445 19.71 4.21C20.0856 4.58514 20.2966 5.09418 20.2966 5.625C20.2966 6.15582 20.0856 6.66486 19.71 7.04L19.65 7.1C19.1783 7.58219 19.0477 8.30291 19.32 8.92V9C19.5791 9.60447 20.1724 9.99738 20.83 10H21C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14H20.91C20.2524 14.0026 19.6591 14.3955 19.4 15Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                        </svg>\n                                    </i>\n                                <button class=\"btn btn-outline-primary mr-1\" id=\"dropdownManual\" ngbDropdownAnchor (focus)=\"myDrop.open()\">Setting</button>\n                                <div ngbDropdownMenu aria-labelledby=\"dropdownManual\">\n                                  <button ngbDropdownItem class=\"pruple\">\n                                      <span>\n                                        <svg width=\"13\" height=\"12\" viewBox=\"0 0 13 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            <path d=\"M7.79995 4.2002L4.19995 7.8002\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            <path d=\"M4.19995 4.2002L7.79995 7.8002\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                         </svg>\n                                    </span>\n                                    Deactivate the account</button>\n                                  <button ngbDropdownItem class=\"pruple\">\n                                    <span>\n                                        <svg width=\"13\" height=\"14\" viewBox=\"0 0 13 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                            <path d=\"M0 2.6665H1.33333H12\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            <path d=\"M2.83325 2.66667C2.83325 1.83824 2.16168 1.16667 1.33325 1.16667V2.16667C1.60939 2.16667 1.83325 2.39052 1.83325 2.66667H2.83325ZM2.83325 12V2.66667H1.83325V12H2.83325ZM2.66659 11.8333C2.75863 11.8333 2.83325 11.908 2.83325 12H1.83325C1.83325 12.4602 2.20635 12.8333 2.66659 12.8333V11.8333ZM9.33325 11.8333H2.66659V12.8333H9.33325V11.8333ZM9.16658 12C9.16658 11.908 9.2412 11.8333 9.33325 11.8333V12.8333C9.79349 12.8333 10.1666 12.4602 10.1666 12H9.16658ZM9.16658 2.66667V12H10.1666V2.66667H9.16658ZM10.6666 1.16667C9.83816 1.16667 9.16658 1.83824 9.16658 2.66667H10.1666C10.1666 2.39052 10.3904 2.16667 10.6666 2.16667V1.16667ZM12.1666 2.66667C12.1666 1.83824 11.495 1.16667 10.6666 1.16667V2.16667C10.9427 2.16667 11.1666 2.39052 11.1666 2.66667H12.1666ZM12.1666 12V2.66667H11.1666V12H12.1666ZM9.33325 14.8333C10.8981 14.8333 12.1666 13.5648 12.1666 12H11.1666C11.1666 13.0125 10.3458 13.8333 9.33325 13.8333V14.8333ZM2.66659 14.8333H9.33325V13.8333H2.66659V14.8333ZM-0.166748 12C-0.166748 13.5648 1.10178 14.8333 2.66659 14.8333V13.8333C1.65406 13.8333 0.833252 13.0125 0.833252 12H-0.166748ZM-0.166748 2.66667V12H0.833252V2.66667H-0.166748ZM1.33325 1.16667C0.504825 1.16667 -0.166748 1.83824 -0.166748 2.66667H0.833252C0.833252 2.39052 1.05711 2.16667 1.33325 2.16667V1.16667ZM4.83325 1.33333C4.83325 1.42538 4.75863 1.5 4.66659 1.5V0.5C4.20635 0.5 3.83325 0.873096 3.83325 1.33333H4.83325ZM4.83325 2.66667V1.33333H3.83325V2.66667H4.83325ZM3.33325 4.16667C4.16168 4.16667 4.83325 3.49509 4.83325 2.66667H3.83325C3.83325 2.94281 3.60939 3.16667 3.33325 3.16667V4.16667ZM1.83325 2.66667C1.83325 3.49509 2.50482 4.16667 3.33325 4.16667V3.16667C3.05711 3.16667 2.83325 2.94281 2.83325 2.66667H1.83325ZM1.83325 1.33333V2.66667H2.83325V1.33333H1.83325ZM4.66659 -1.5C3.10178 -1.5 1.83325 -0.231473 1.83325 1.33333H2.83325C2.83325 0.320811 3.65406 -0.5 4.66659 -0.5V-1.5ZM7.33325 -1.5H4.66659V-0.5H7.33325V-1.5ZM10.1666 1.33333C10.1666 -0.231474 8.89806 -1.5 7.33325 -1.5V-0.5C8.34577 -0.5 9.16659 0.320811 9.16659 1.33333H10.1666ZM10.1666 2.66667V1.33333H9.16659V2.66667H10.1666ZM8.66659 4.16667C9.49501 4.16667 10.1666 3.49509 10.1666 2.66667H9.16659C9.16659 2.94281 8.94273 3.16667 8.66659 3.16667V4.16667ZM7.16659 2.66667C7.16659 3.49509 7.83816 4.16667 8.66659 4.16667V3.16667C8.39044 3.16667 8.16659 2.94281 8.16659 2.66667H7.16659ZM7.16659 1.33333V2.66667H8.16659V1.33333H7.16659ZM7.33325 1.5C7.2412 1.5 7.16659 1.42538 7.16659 1.33333H8.16659C8.16659 0.873096 7.79349 0.5 7.33325 0.5V1.5ZM4.66659 1.5H7.33325V0.5H4.66659V1.5Z\" fill=\"#5C20D2\"/>\n                                            <path d=\"M4.66675 6V10\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            <path d=\"M7.33325 6V10\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                        </svg>   \n                                    </span>  \n                                    Delete the account</button>\n                                  <button ngbDropdownItem [routerLink]=\"[ '/login' ]\">\n                                      <span>\n                                          <svg width=\"11\" height=\"12\" viewBox=\"0 0 11 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                        <rect y=\"5\" width=\"10\" height=\"6.11111\" rx=\"2\" stroke=\"black\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                        <path d=\"M2.22217 5V2.77778C2.22217 1.24365 3.46582 0 4.99995 0C6.53407 0 7.77772 1.24365 7.77772 2.77778V5\" stroke=\"black\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                        </svg>\n                                        </span>\n                                      Sign Out</button>\n                                </div>\n                         </div>\n                </li>\n            </ul>\n        </div>\n\n\n\n<div class=\"page-wraper-right\">\n                <div class=\"mat-card col-lg-11 mt-5 row welcome-card p-2\">\n                    <img class=\"col-lg-2\" src=\"assets/images/bookWithMen.svg\">\n                    <div class=\"col-lg-7 px-0\">\n                        <p class=\"grey-text-color mt-4\">Oh! Welcome Home Ismael! we've prepared some useful information below ;)</p>\n                    </div>\n                    <form class=\"col-lg-3\">\n                    <div class=\"form-group\">\n                        <label for=\"dateOfBirth\" class=\"font-size-13 mt-2\">Filter Date</label>\n                        <div class=\"input-group\">\n                        <input (click)=\"dp.toggle()\" class=\"form-control date-picker\" placeholder=\"mm-dd-yyyy\" name=\"dp\" ngbDatepicker #dp=\"ngbDatepicker\">\n                        <i class=\"fa fa-calendar\"></i>\n                        </div>\n                    </div>\n                    </form>\n                </div>\n\n\n\n                <div class=\"col-lg-11 row justify-content-around mt-5 dashbored-info\">\n                    <div class=\"col-lg-2 blue-bg\">\n                        <div class=\"dashbored-info-content\">\n                            <p>approved requests</p>\n                            <div>03</div>\n                        </div>\n                    </div>\n                <div class=\"col-lg-2 purple-bg\">\n                    <div class=\"dashbored-info-content\">\n                        <p>submitted Requests</p>\n                        <div>03</div>\n                    </div>\n                    </div>\n                    <div class=\"col-lg-2 black-bg\">\n                        <div class=\"dashbored-info-content\">\n                            <p>approved requests</p>\n                            <div>03</div>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-2 blue-bg-2\">\n                        <div class=\"dashbored-info-content\">\n                            <p>Total Installment Paid</p>\n                            <div>3600 SAR </div>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-2 purple-bg-2\">\n                        <div class=\"dashbored-info-content\">\n                            <p>under review requests</p>\n                            <div>03</div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"col-lg-11 mt-3 row justify-content-center align-items-center py-4 mt-5\">     \n                        <div class=\"form-group col-lg-2\">\n                               <button class=\"btn btn-info btn-lg btn-block btn-black mt-2 btn-lowecase\" [routerLink]=\"[ '/requests' ]\">All Request</button>\n                       </div>\n                       <div class=\"form-group col-lg-3\">\n                           <button class=\"btn btn-info btn-lg btn-block btn-purple mt-2 btn-lowecase\" [routerLink]=\"[ '/create-order' ]\">Make New Request</button>\n                       </div>\n                </div>\n    </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/layouts/full/full.component.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/layouts/full/full.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Main wrapper - style you can find in pages.scss -->\n<!-- ============================================================== -->\n<div id=\"main-wrapper\" [ngClass]=\"{'show-sidebar': showMobileMenu}\" dir=\"ltr\" data-theme=\"light\" data-layout=\"vertical\"\n    [attr.data-sidebartype]=\"sidebartype\" data-sidebar-position=\"absolute\" data-header-position=\"fixed\"\n    data-boxed-layout=\"full\"> \n    <!-- ============================================================== -->\n    <!-- Topbar header - style you can find in topbar.scss -->\n    <!-- ============================================================== -->\n    <header class=\"bg-image h-100\">\n        <div class=\"sticky-nav-wrapper\">\n        <nav id=\"navbar\" class=\"navbar navbar-expand-lg navbar-light container py-4 mb-auto sticky-nav wow fadeInDown\" data-wow-duration=\"1.4s\" data-wow-delay=\"0.7s\" ngStickyNav stickyClass=\"sticky-fixed-header\">\n            <a class=\"navbar-brand\" [routerLink]=\"[ '/' ]\">\n                    <img src=\"assets/images/logo.svg\" alt=\"antim\">\n\n            </a>\n            <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" aria-controls=\"navbarText\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" (click)=\"toggleNavbar()\">\n              <span class=\"navbar-toggler-icon\"></span>\n            </button>\n            <div class=\"collapse navbar-collapse\" id=\"navbarText\" [ngClass]=\"{ 'show': navbarOpen }\">\n                <div class=\"close-icon d-lg-none d-block\"><a (click)=\"toggleNavbar()\" id=\"navButton\" class=\"btn-close\"><i class=\"ti-close\"></i></a> </div>\n              <ul class=\"navbar-nav mr-auto mt-2\">\n                <li class=\"nav-item\">\n                  <a class=\"nav-link\" [routerLink]=\"[ '/' ]\" routerLinkActive=\"active-link\" (click)=closeMenu()>home</a>\n                </li>\n                <li class=\"nav-item\" [routerLinkActive]=\"['active']\">\n                  <a class=\"nav-link\" [routerLink]=\"[ '/who-we-are' ]\" (click)=closeMenu()>who we are</a>\n                </li>\n                <li class=\"nav-item\" [routerLinkActive]=\"['active']\">\n                  <a class=\"nav-link\" [routerLink]=\"[ '/contact' ]\" (click)=closeMenu()>contact us</a>\n                </li>\n                <li class=\"nav-item\">\n                        <a class=\"nav-link\" [routerLink]=\"[ '/' ]\" (click)=closeMenu()>client</a>\n                      </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" [routerLink]=\"[ '/' ]\" (click)=closeMenu()>news</a>\n                  </li>\n  \n              </ul>\n              <ul class=\"navbar-nav ml-auto mt-2\">\n                <li class=\"nav-item mt-1\">\n                  <a class=\"nav-link\"  [routerLink]=\"[ '/login' ]\" (click)=closeMenu()>Log In</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link purple-btn\" [routerLink]=\"[ '/signup' ]\" (click)=closeMenu()>Sign up</a>\n                  </li>\n                \n              </ul>\n            </div>\n          </nav>\n        </div>\n          <div class=\"container flex-center justify-content-start\">\n                <div class=\"row\">\n                    <div class=\"col-lg-6 h-100 d-flex justify-content-center flex-column\">\n                        <h1 class=\"main-header-font wow fadeInUp\" data-wow-duration=\"1.2s\" data-wow-delay=\"0.5s\">\n                            Select,<br/> Send and Get… <br/>Pay by installment\n                        </h1>\n                        <button type=\"button\" class=\"btn btn-block btn-antim btn-rounded mt-5 wow fadeInUp\" data-wow-duration=\"1.4s\" data-wow-delay=\"0.7s\" (click)=\"btnClick();\">Get Started</button>\n                    \n                    </div>\n                    <div class=\"col-lg-6 h-100 d-flex justify-content-center flex-column\">\n                            <img src=\"assets/images/antim-header.svg\" alt=\"antim\" class=\"antim-img-header wow fadeInRight\" data-wow-duration=\"1.4s\" data-wow-delay=\"0.7s\">\n                    </div>\n                      \n                    </div>\n          </div>\n          <div class=\"bg-dark-right\"></div>\n\n\n    </header>\n    <router-outlet></router-outlet>\n    <!-- ============================================================== -->\n    <!-- End Page wrapper  -->\n    <!-- ============================================================== -->\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/login/login.component.html":
/*!**********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/login/login.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid h-100\">\n        <div class=\"row justify-content-center align-items-center h-100\">\n            <div class=\"col col-sm-6 col-md-6 col-lg-4 col-xl-3 background-box px-5 py-5 text-center\">\n                    <img src=\"assets/images/user.svg\" alt=\"antim\">\n                <p class=\"grey-text-color mt-4 mb-2\">Hello sir, nice to see you again!<br/>Please insert your login info below to proceed </p>\n                <form class=\"form-log-in mt-5 form-antim\">\n                    <div class=\"form-group text-left\">\n                        <label for=\"name\">User Name<span class=\"red-color\"> *</span></label>\n                        <input ngModel name=\"username\" class=\"form-control form-control-lg\" placeholder=\"user name type here...\" type=\"text\" #username=\"ngModel\">\n                        <div class=\"alert alert-danger\" *ngIf=\"username.touched && !username.valid\">User name required</div>\n                    </div>\n                    <div class=\"form-group text-left\">\n                        <label for=\"password\">Password<span class=\"red-color\"> *</span></label>\n                        <input ngModel name=\"password\" class=\"form-control form-control-lg\" placeholder=\"***********\" type=\"password\" #password=\"ngModel\">\n                        <div class=\"alert alert-danger\" *ngIf=\"password.touched && !password.valid\">Password is required</div>\n\n                    </div>\n                    <div class=\"form-group mt-4\">\n                        <button class=\"btn btn-info btn-lg btn-block btn-purple mt-5\" [routerLink]=\"[ '/dashbored' ]\">Sign In</button>\n                    </div>\n                    <p class=\"grey-text-color pt-4\">forgot password ?</p>\n                </form>\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/notification/notification.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/notification/notification.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    <div class=\"row\">\n        <aside class=\"left-sidebar col-lg-4\">\n            <!-- Sidebar scroll-->\n            <div class=\"scroll-sidebar\">\n                <app-sidebar></app-sidebar>\n            </div>\n            <!-- End Sidebar scroll-->\n        </aside>\n            <div class=\"page-wraper-right row\">\n                          \n                <ul class=\"navbar-nav float-right text-right mt-4 col-lg-11\">\n                    <li class=\"nav-item m-r-20 dashbored-nav\">\n\n                            <div class=\"d-inline-block\" ngbDropdown #myDrop=\"ngbDropdown\">\n                                    <i class=\"mr-1\">\n                                            <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3766 17.7642 20.3766 18.295C20.3766 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2966 18.375 20.2966C17.8442 20.2966 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.83V21C14.08 22.1046 13.1846 23 12.08 23C10.9754 23 10.08 22.1046 10.08 21V20.91C10.0642 20.2327 9.63587 19.6339 9 19.4C8.38291 19.1277 7.66219 19.2583 7.18 19.73L7.12 19.79C6.74486 20.1656 6.23582 20.3766 5.705 20.3766C5.17418 20.3766 4.66514 20.1656 4.29 19.79C3.91445 19.4149 3.70343 18.9058 3.70343 18.375C3.70343 17.8442 3.91445 17.3351 4.29 16.96L4.35 16.9C4.82167 16.4178 4.95235 15.6971 4.68 15.08C4.42093 14.4755 3.82764 14.0826 3.17 14.08H3C1.89543 14.08 1 13.1846 1 12.08C1 10.9754 1.89543 10.08 3 10.08H3.09C3.76733 10.0642 4.36613 9.63587 4.6 9C4.87235 8.38291 4.74167 7.66219 4.27 7.18L4.21 7.12C3.83445 6.74486 3.62343 6.23582 3.62343 5.705C3.62343 5.17418 3.83445 4.66514 4.21 4.29C4.58514 3.91445 5.09418 3.70343 5.625 3.70343C6.15582 3.70343 6.66486 3.91445 7.04 4.29L7.1 4.35C7.58219 4.82167 8.30291 4.95235 8.92 4.68H9C9.60447 4.42093 9.99738 3.82764 10 3.17V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3V3.09C14.0026 3.74764 14.3955 4.34093 15 4.6C15.6171 4.87235 16.3378 4.74167 16.82 4.27L16.88 4.21C17.2551 3.83445 17.7642 3.62343 18.295 3.62343C18.8258 3.62343 19.3349 3.83445 19.71 4.21C20.0856 4.58514 20.2966 5.09418 20.2966 5.625C20.2966 6.15582 20.0856 6.66486 19.71 7.04L19.65 7.1C19.1783 7.58219 19.0477 8.30291 19.32 8.92V9C19.5791 9.60447 20.1724 9.99738 20.83 10H21C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14H20.91C20.2524 14.0026 19.6591 14.3955 19.4 15Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            </svg>\n                                        </i>\n                                    <button class=\"btn btn-outline-primary mr-1\" id=\"dropdownManual\" ngbDropdownAnchor (focus)=\"myDrop.open()\">Setting</button>\n                                    <div ngbDropdownMenu aria-labelledby=\"dropdownManual\">\n                                      <button ngbDropdownItem class=\"pruple\">\n                                          <span>\n                                            <svg width=\"13\" height=\"12\" viewBox=\"0 0 13 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                <path d=\"M7.79995 4.2002L4.19995 7.8002\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                <path d=\"M4.19995 4.2002L7.79995 7.8002\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                             </svg>\n                                        </span>\n                                        Deactivate the account</button>\n                                      <button ngbDropdownItem class=\"pruple\">\n                                        <span>\n                                            <svg width=\"13\" height=\"14\" viewBox=\"0 0 13 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                <path d=\"M0 2.6665H1.33333H12\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                <path d=\"M2.83325 2.66667C2.83325 1.83824 2.16168 1.16667 1.33325 1.16667V2.16667C1.60939 2.16667 1.83325 2.39052 1.83325 2.66667H2.83325ZM2.83325 12V2.66667H1.83325V12H2.83325ZM2.66659 11.8333C2.75863 11.8333 2.83325 11.908 2.83325 12H1.83325C1.83325 12.4602 2.20635 12.8333 2.66659 12.8333V11.8333ZM9.33325 11.8333H2.66659V12.8333H9.33325V11.8333ZM9.16658 12C9.16658 11.908 9.2412 11.8333 9.33325 11.8333V12.8333C9.79349 12.8333 10.1666 12.4602 10.1666 12H9.16658ZM9.16658 2.66667V12H10.1666V2.66667H9.16658ZM10.6666 1.16667C9.83816 1.16667 9.16658 1.83824 9.16658 2.66667H10.1666C10.1666 2.39052 10.3904 2.16667 10.6666 2.16667V1.16667ZM12.1666 2.66667C12.1666 1.83824 11.495 1.16667 10.6666 1.16667V2.16667C10.9427 2.16667 11.1666 2.39052 11.1666 2.66667H12.1666ZM12.1666 12V2.66667H11.1666V12H12.1666ZM9.33325 14.8333C10.8981 14.8333 12.1666 13.5648 12.1666 12H11.1666C11.1666 13.0125 10.3458 13.8333 9.33325 13.8333V14.8333ZM2.66659 14.8333H9.33325V13.8333H2.66659V14.8333ZM-0.166748 12C-0.166748 13.5648 1.10178 14.8333 2.66659 14.8333V13.8333C1.65406 13.8333 0.833252 13.0125 0.833252 12H-0.166748ZM-0.166748 2.66667V12H0.833252V2.66667H-0.166748ZM1.33325 1.16667C0.504825 1.16667 -0.166748 1.83824 -0.166748 2.66667H0.833252C0.833252 2.39052 1.05711 2.16667 1.33325 2.16667V1.16667ZM4.83325 1.33333C4.83325 1.42538 4.75863 1.5 4.66659 1.5V0.5C4.20635 0.5 3.83325 0.873096 3.83325 1.33333H4.83325ZM4.83325 2.66667V1.33333H3.83325V2.66667H4.83325ZM3.33325 4.16667C4.16168 4.16667 4.83325 3.49509 4.83325 2.66667H3.83325C3.83325 2.94281 3.60939 3.16667 3.33325 3.16667V4.16667ZM1.83325 2.66667C1.83325 3.49509 2.50482 4.16667 3.33325 4.16667V3.16667C3.05711 3.16667 2.83325 2.94281 2.83325 2.66667H1.83325ZM1.83325 1.33333V2.66667H2.83325V1.33333H1.83325ZM4.66659 -1.5C3.10178 -1.5 1.83325 -0.231473 1.83325 1.33333H2.83325C2.83325 0.320811 3.65406 -0.5 4.66659 -0.5V-1.5ZM7.33325 -1.5H4.66659V-0.5H7.33325V-1.5ZM10.1666 1.33333C10.1666 -0.231474 8.89806 -1.5 7.33325 -1.5V-0.5C8.34577 -0.5 9.16659 0.320811 9.16659 1.33333H10.1666ZM10.1666 2.66667V1.33333H9.16659V2.66667H10.1666ZM8.66659 4.16667C9.49501 4.16667 10.1666 3.49509 10.1666 2.66667H9.16659C9.16659 2.94281 8.94273 3.16667 8.66659 3.16667V4.16667ZM7.16659 2.66667C7.16659 3.49509 7.83816 4.16667 8.66659 4.16667V3.16667C8.39044 3.16667 8.16659 2.94281 8.16659 2.66667H7.16659ZM7.16659 1.33333V2.66667H8.16659V1.33333H7.16659ZM7.33325 1.5C7.2412 1.5 7.16659 1.42538 7.16659 1.33333H8.16659C8.16659 0.873096 7.79349 0.5 7.33325 0.5V1.5ZM4.66659 1.5H7.33325V0.5H4.66659V1.5Z\" fill=\"#5C20D2\"/>\n                                                <path d=\"M4.66675 6V10\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                <path d=\"M7.33325 6V10\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            </svg>   \n                                        </span>  \n                                        Delete the account</button>\n                                      <button ngbDropdownItem [routerLink]=\"[ '/login' ]\">\n                                          <span>\n                                              <svg width=\"11\" height=\"12\" viewBox=\"0 0 11 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                            <rect y=\"5\" width=\"10\" height=\"6.11111\" rx=\"2\" stroke=\"black\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            <path d=\"M2.22217 5V2.77778C2.22217 1.24365 3.46582 0 4.99995 0C6.53407 0 7.77772 1.24365 7.77772 2.77778V5\" stroke=\"black\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            </svg>\n                                            </span>\n                                          Sign Out</button>\n                                    </div>\n                             </div>\n                    </li>\n                </ul>\n            </div>\n    \n    \n    \n    <div class=\"page-wraper-right mb-5\">\n        <div class=\"mat-card col-lg-11 mt-5 row welcome-card inner p-2\">\n            <img class=\"col-lg-2\" src=\"assets/images/bookWithMen 2.svg\">\n            <div class=\"col-lg-3 px-0\">\n                <p class=\"grey-text-color mt-4\">Notification </p>\n            </div>\n            <div class=\"form-group has-search col-lg-4\">\n                    \n                    <input type=\"text\" class=\"form-control\" placeholder=\"Search by request number\">\n                    <span class=\"fa fa-search form-control-feedback\"></span>\n             </div>\n            <form class=\"col-lg-3\">\n            <div class=\"form-group\">\n                <label for=\"profileInformation\" class=\"font-size-13 mt-2\">Filter</label>\n                <select class=\"form-control form-control-lg mb-2 custom-select color-inherit\">\n                        <option value=\"\" selected>Choose year</option>\n                        <option value=\"2019\">2019</option>\n                        <option value=\"2018\">2018</option>\n                        <option value=\"2017\">2017</option>\n                </select>\n                <svg class=\"arrow\" fill=\"none\" height=\"7\" viewBox=\"0 0 14 12\" width=\"10\" xmlns=\"http://www.w3.org/2000/svg\"><path _ngcontent-pkd-c13=\"\" d=\"M1 1.2113L7 10.7606L13 1.2113\" stroke=\"#000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"></path></svg>\n            </div>\n            </form>\n        </div>\n\n\n                    <div class=\"mat-card col-lg-11 row mt-4\">\n                        <div>\n                            <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#5C20D2\" fill-opacity=\"0.0998143\"/>\n                                <mask id=\"mask0\" mask-type=\"alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"32\" height=\"32\">\n                                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"white\"/>\n                                </mask>\n                                <g mask=\"url(#mask0)\">\n                                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6 14.7576L25 9L20.3939 19.9394L12.9091 17.6364L11.1818 22.8182L10.6061 17.0606L6 14.7576Z\" fill=\"#C7C7C7\"/>\n                                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M24.2424 10L11 16.9091L11.1958 21.8952L13.303 17.4848L24.2424 10Z\" fill=\"black\"/>\n                                </g>\n                            </svg>                                    \n                        </div>\n                        <div class=\"col-lg-8\">\n                            <h5 class=\"font-purple font-bold no-letter-spacing m-0\">Your request has been approved 1044</h5>\n                            <div class=\"grey-text-color mb-2 mt-1\">02-Jan-2019</div>\n                        </div>\n                            <p class=\"dark-text-color col-lg-12\">Congratulations! Your request has been approved and you are qualified for fund. You are kindly requested to agree on the below Undertaking to Purchase statement to proceed with the request.</p>\n                            <p class=\"dark-text-color col-lg-12\">I agree as a requester for the request #(.......), to re-purchase the product(s) purchased by intime platform, based on my request, and with the total amount of (.........) SAR, where the original prodcut(s) price is (.......) SAR, with profit margin (....%) which equal to (......) SAR, and the total amount will be divided to (.......) month, with a total amount of (.......) SAR for the single installment.\n                                </p>\n\n                <div class=\"col-lg-12 mt-3 row d-flex flex-row-reverse\">     \n                       <div class=\"form-group col-lg-3\">\n                           <button class=\"btn btn-info btn-lg btn-block btn-purple mt-2\">Agree and proceed                            </button>\n                       </div>\n                       <div class=\"form-group col-lg-2\">\n                            <button class=\"btn btn-info btn-lg btn-block btn-black mt-2\">cancel </button>\n                    </div>\n                </div>\n                    </div>\n                    <div class=\"mat-card col-lg-11 row mt-1\">\n                    <div>\n                        <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#5C20D2\" fill-opacity=\"0.0998143\"/>\n                            <mask id=\"mask0\" mask-type=\"alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"32\" height=\"32\">\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"white\"/>\n                            </mask>\n                            <g mask=\"url(#mask0)\">\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6 14.7576L25 9L20.3939 19.9394L12.9091 17.6364L11.1818 22.8182L10.6061 17.0606L6 14.7576Z\" fill=\"#C7C7C7\"/>\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M24.2424 10L11 16.9091L11.1958 21.8952L13.303 17.4848L24.2424 10Z\" fill=\"black\"/>\n                            </g>\n                        </svg>                                    \n                    </div>\n                    <div class=\"col-lg-8\">\n                        <h5 class=\"font-purple font-bold no-letter-spacing m-0\">Your request has been approved 1044</h5>\n                        <div class=\"grey-text-color mb-2 mt-1\">02-Jan-2019</div>\n                    </div>\n                        <p class=\"dark-text-color col-lg-12\">Dear Customer, Congratulations! your request has been approved by the Antime platform, will be follow-up by sending.....\n                        </p>\n                    </div>\n                    <div class=\"mat-card col-lg-11 row mt-1 mb-5\">\n                      <div>\n                        <svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#5C20D2\" fill-opacity=\"0.0998143\"/>\n                            <mask id=\"mask0\" mask-type=\"alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"32\" height=\"32\">\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"white\"/>\n                            </mask>\n                            <g mask=\"url(#mask0)\">\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6 14.7576L25 9L20.3939 19.9394L12.9091 17.6364L11.1818 22.8182L10.6061 17.0606L6 14.7576Z\" fill=\"#C7C7C7\"/>\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M24.2424 10L11 16.9091L11.1958 21.8952L13.303 17.4848L24.2424 10Z\" fill=\"black\"/>\n                            </g>\n                        </svg>                                    \n                    </div>\n                    <div class=\"col-lg-8\">\n                        <h5 class=\"font-purple font-bold no-letter-spacing m-0\">Your request has been approved 1044</h5>\n                        <div class=\"grey-text-color mb-2 mt-1\">02-Jan-2019</div>\n                    </div>\n                        <p class=\"dark-text-color col-lg-12\">Dear Customer, Congratulations! your request has been approved by the Antime platform, will be follow-up by sending.....\n                        </p>\n                    </div>\n    \n    \n\n    \n        </div>\n    </div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/profile/profile.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/profile/profile.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n        <div class=\"row\">\n            <aside class=\"left-sidebar col-lg-4\">\n                <!-- Sidebar scroll-->\n                <div class=\"scroll-sidebar\">\n                    <app-sidebar></app-sidebar>\n                </div>\n                <!-- End Sidebar scroll-->\n            </aside>\n                <div class=\"page-wraper-right row\">\n                    <ul class=\"navbar-nav float-right text-right mt-4 col-lg-11\">\n                        <li class=\"nav-item m-r-20 dashbored-nav\">\n\n                                <div class=\"d-inline-block\" ngbDropdown #myDrop=\"ngbDropdown\">\n                                        <i class=\"mr-1\">\n                                                <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3766 17.7642 20.3766 18.295C20.3766 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2966 18.375 20.2966C17.8442 20.2966 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.83V21C14.08 22.1046 13.1846 23 12.08 23C10.9754 23 10.08 22.1046 10.08 21V20.91C10.0642 20.2327 9.63587 19.6339 9 19.4C8.38291 19.1277 7.66219 19.2583 7.18 19.73L7.12 19.79C6.74486 20.1656 6.23582 20.3766 5.705 20.3766C5.17418 20.3766 4.66514 20.1656 4.29 19.79C3.91445 19.4149 3.70343 18.9058 3.70343 18.375C3.70343 17.8442 3.91445 17.3351 4.29 16.96L4.35 16.9C4.82167 16.4178 4.95235 15.6971 4.68 15.08C4.42093 14.4755 3.82764 14.0826 3.17 14.08H3C1.89543 14.08 1 13.1846 1 12.08C1 10.9754 1.89543 10.08 3 10.08H3.09C3.76733 10.0642 4.36613 9.63587 4.6 9C4.87235 8.38291 4.74167 7.66219 4.27 7.18L4.21 7.12C3.83445 6.74486 3.62343 6.23582 3.62343 5.705C3.62343 5.17418 3.83445 4.66514 4.21 4.29C4.58514 3.91445 5.09418 3.70343 5.625 3.70343C6.15582 3.70343 6.66486 3.91445 7.04 4.29L7.1 4.35C7.58219 4.82167 8.30291 4.95235 8.92 4.68H9C9.60447 4.42093 9.99738 3.82764 10 3.17V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3V3.09C14.0026 3.74764 14.3955 4.34093 15 4.6C15.6171 4.87235 16.3378 4.74167 16.82 4.27L16.88 4.21C17.2551 3.83445 17.7642 3.62343 18.295 3.62343C18.8258 3.62343 19.3349 3.83445 19.71 4.21C20.0856 4.58514 20.2966 5.09418 20.2966 5.625C20.2966 6.15582 20.0856 6.66486 19.71 7.04L19.65 7.1C19.1783 7.58219 19.0477 8.30291 19.32 8.92V9C19.5791 9.60447 20.1724 9.99738 20.83 10H21C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14H20.91C20.2524 14.0026 19.6591 14.3955 19.4 15Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                </svg>\n                                            </i>\n                                        <button class=\"btn btn-outline-primary mr-1\" id=\"dropdownManual\" ngbDropdownAnchor (focus)=\"myDrop.open()\">Setting</button>\n                                        <div ngbDropdownMenu aria-labelledby=\"dropdownManual\">\n                                          <button ngbDropdownItem class=\"pruple\">\n                                              <span>\n                                                <svg width=\"13\" height=\"12\" viewBox=\"0 0 13 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                    <path d=\"M7.79995 4.2002L4.19995 7.8002\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                    <path d=\"M4.19995 4.2002L7.79995 7.8002\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                 </svg>\n                                            </span>\n                                            Deactivate the account</button>\n                                          <button ngbDropdownItem class=\"pruple\">\n                                            <span>\n                                                <svg width=\"13\" height=\"14\" viewBox=\"0 0 13 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                    <path d=\"M0 2.6665H1.33333H12\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                    <path d=\"M2.83325 2.66667C2.83325 1.83824 2.16168 1.16667 1.33325 1.16667V2.16667C1.60939 2.16667 1.83325 2.39052 1.83325 2.66667H2.83325ZM2.83325 12V2.66667H1.83325V12H2.83325ZM2.66659 11.8333C2.75863 11.8333 2.83325 11.908 2.83325 12H1.83325C1.83325 12.4602 2.20635 12.8333 2.66659 12.8333V11.8333ZM9.33325 11.8333H2.66659V12.8333H9.33325V11.8333ZM9.16658 12C9.16658 11.908 9.2412 11.8333 9.33325 11.8333V12.8333C9.79349 12.8333 10.1666 12.4602 10.1666 12H9.16658ZM9.16658 2.66667V12H10.1666V2.66667H9.16658ZM10.6666 1.16667C9.83816 1.16667 9.16658 1.83824 9.16658 2.66667H10.1666C10.1666 2.39052 10.3904 2.16667 10.6666 2.16667V1.16667ZM12.1666 2.66667C12.1666 1.83824 11.495 1.16667 10.6666 1.16667V2.16667C10.9427 2.16667 11.1666 2.39052 11.1666 2.66667H12.1666ZM12.1666 12V2.66667H11.1666V12H12.1666ZM9.33325 14.8333C10.8981 14.8333 12.1666 13.5648 12.1666 12H11.1666C11.1666 13.0125 10.3458 13.8333 9.33325 13.8333V14.8333ZM2.66659 14.8333H9.33325V13.8333H2.66659V14.8333ZM-0.166748 12C-0.166748 13.5648 1.10178 14.8333 2.66659 14.8333V13.8333C1.65406 13.8333 0.833252 13.0125 0.833252 12H-0.166748ZM-0.166748 2.66667V12H0.833252V2.66667H-0.166748ZM1.33325 1.16667C0.504825 1.16667 -0.166748 1.83824 -0.166748 2.66667H0.833252C0.833252 2.39052 1.05711 2.16667 1.33325 2.16667V1.16667ZM4.83325 1.33333C4.83325 1.42538 4.75863 1.5 4.66659 1.5V0.5C4.20635 0.5 3.83325 0.873096 3.83325 1.33333H4.83325ZM4.83325 2.66667V1.33333H3.83325V2.66667H4.83325ZM3.33325 4.16667C4.16168 4.16667 4.83325 3.49509 4.83325 2.66667H3.83325C3.83325 2.94281 3.60939 3.16667 3.33325 3.16667V4.16667ZM1.83325 2.66667C1.83325 3.49509 2.50482 4.16667 3.33325 4.16667V3.16667C3.05711 3.16667 2.83325 2.94281 2.83325 2.66667H1.83325ZM1.83325 1.33333V2.66667H2.83325V1.33333H1.83325ZM4.66659 -1.5C3.10178 -1.5 1.83325 -0.231473 1.83325 1.33333H2.83325C2.83325 0.320811 3.65406 -0.5 4.66659 -0.5V-1.5ZM7.33325 -1.5H4.66659V-0.5H7.33325V-1.5ZM10.1666 1.33333C10.1666 -0.231474 8.89806 -1.5 7.33325 -1.5V-0.5C8.34577 -0.5 9.16659 0.320811 9.16659 1.33333H10.1666ZM10.1666 2.66667V1.33333H9.16659V2.66667H10.1666ZM8.66659 4.16667C9.49501 4.16667 10.1666 3.49509 10.1666 2.66667H9.16659C9.16659 2.94281 8.94273 3.16667 8.66659 3.16667V4.16667ZM7.16659 2.66667C7.16659 3.49509 7.83816 4.16667 8.66659 4.16667V3.16667C8.39044 3.16667 8.16659 2.94281 8.16659 2.66667H7.16659ZM7.16659 1.33333V2.66667H8.16659V1.33333H7.16659ZM7.33325 1.5C7.2412 1.5 7.16659 1.42538 7.16659 1.33333H8.16659C8.16659 0.873096 7.79349 0.5 7.33325 0.5V1.5ZM4.66659 1.5H7.33325V0.5H4.66659V1.5Z\" fill=\"#5C20D2\"/>\n                                                    <path d=\"M4.66675 6V10\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                    <path d=\"M7.33325 6V10\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                </svg>   \n                                            </span>  \n                                            Delete the account</button>\n                                          <button ngbDropdownItem [routerLink]=\"[ '/login' ]\">\n                                              <span>\n                                                  <svg width=\"11\" height=\"12\" viewBox=\"0 0 11 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                <rect y=\"5\" width=\"10\" height=\"6.11111\" rx=\"2\" stroke=\"black\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                <path d=\"M2.22217 5V2.77778C2.22217 1.24365 3.46582 0 4.99995 0C6.53407 0 7.77772 1.24365 7.77772 2.77778V5\" stroke=\"black\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                </svg>\n                                                </span>\n                                              Sign Out</button>\n                                        </div>\n                                 </div>\n                        </li>\n                    </ul>\n                </div>\n        \n        \n        \n        <div class=\"page-wraper-right\">\n                        <div class=\"mat-card col-lg-11 mt-5 row welcome-card p-2\">\n                            <img class=\"col-lg-2\" src=\"assets/images/bookWithMen 2.svg\">\n                            <div class=\"col-lg-7 px-0\">\n                                <p class=\"grey-text-color mt-4\">My Profile</p>\n                            </div>\n                            <form class=\"col-lg-3\">\n                            <div class=\"form-group\">\n                                <label for=\"profileInformation\" class=\"font-size-13 mt-2\">Select profile infomation </label>\n                                <select class=\"form-control form-control-lg mb-2§ custom-select\" (change)=\"onChange($event.target.value)\">\n                                        <option value=\"Personal\" selected>Personal Information</option>\n                                        <option value=\"Bank\">Bank Information</option>\n                                </select>\n                                <svg class=\"arrow\" fill=\"none\" height=\"7\" viewBox=\"0 0 14 12\" width=\"10\" xmlns=\"http://www.w3.org/2000/svg\"><path _ngcontent-pkd-c13=\"\" d=\"M1 1.2113L7 10.7606L13 1.2113\" stroke=\"#000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"></path></svg>\n                            </div>\n                            </form>\n                        </div>\n        \n        \n        \n                        <div class=\"col-lg-11 row justify-content-around mt-5 dashbored-info\">\n                            <div class=\"justify-content-center col-lg-9\">\n                            <form class=\"row antim-form\" [formGroup]=\"EditForm\" *ngIf=\"!isShown\">\n                            <div class=\"col-lg-12 mb-3\"><h3 class=\"headingh3\">Personal Information</h3></div>\n                            <div class=\"col-lg-6\">\n                                <label for=\"Name\" class=\"font-bold mt-2\">Name</label>\n                                <input matInput formControlName=\"Name\" class=\"form-control form-control-lg\" value=\"Isamael alaksras\" placeholder=\"name\" [attr.disabled]=\"disabledButton?'true':false\">\n                            </div>\n                            <div class=\"col-lg-6\">\n                                <label for=\"mobile\" class=\"font-bold mt-2\">Mobile No</label>\n                                <input matInput formControlName=\"MobileNo\" class=\"form-control form-control-lg\" value=\"0112323232\" placeholder=\"mobile\" [attr.disabled]=\"disabledButton?'true':false\">\n                            </div>\n\n                            <div class=\"col-lg-6\">\n                                <label for=\"email\" class=\"font-bold mt-2\">Email address </label>\n                                <input matInput formControlName=\"Email\" class=\"form-control form-control-lg\" value=\"dpremakumara@gmail.com\" placeholder=\"email\" [attr.disabled]=\"disabledButton?'true':false\">\n                            </div>\n                            <div class=\"col-lg-6\">\n                                <label for=\"National\" class=\"font-bold mt-2\">National ID / Iqama</label>\n                                <input matInput formControlName=\"NID\" class=\"form-control form-control-lg\" value=\"3483984390843\" placeholder=\"National ID\" [attr.disabled]=\"disabledButton?'true':false\">\n                            </div>\n                            <div class=\"col-lg-12\">\n                                    <label for=\"Address\" class=\"font-bold mt-2\">Address</label>\n                                    <input matInput formControlName=\"Address\" class=\"form-control form-control-lg\" value=\"Saudi Arabia\" placeholder=\"Address\" [attr.disabled]=\"disabledButton?'true':false\">\n                                </div>\n                            </form>\n\n\n\n                            <form class=\"row antim-form\" [formGroup]=\"BankInfoForm\" *ngIf=\"isShown\">\n                                    <div class=\"col-lg-12 mb-3\"><h3 class=\"headingh3\">Bank Information</h3></div>\n                                    <div class=\"col-lg-6\">\n                                        <label for=\"BankName\" class=\"font-bold mt-2\">Bank Name</label>\n                                        <input matInput formControlName=\"BankName\" class=\"form-control form-control-lg\" value=\"NHU Bank\" placeholder=\"Bank Name\" [attr.disabled]=\"disabledBankButton\">\n                                    </div>\n                                    <div class=\"col-lg-6\">\n                                        <label for=\"BankAccount\" class=\"font-bold mt-2\">Bank Account Name</label>\n                                        <input matInput formControlName=\"BankAccountName\" class=\"form-control form-control-lg\" value=\"0112323232\" placeholder=\"Bank Account Name\" [attr.disabled]=\"disabledBankButton\">\n                                    </div>\n        \n                                    <div class=\"col-lg-6\">\n                                        <label for=\"emailadd\" class=\"font-bold mt-2\">Email address </label>\n                                        <input matInput formControlName=\"EmailAdd\" class=\"form-control form-control-lg\" value=\"dpremakumara@gmail.com\" placeholder=\"email\" [attr.disabled]=\"disabledBankButton\">\n                                    </div>\n                                    <div class=\"col-lg-6\">\n                                        <label for=\"NationalId\" class=\"font-bold mt-2\">National ID / Iqama</label>\n                                        <input matInput formControlName=\"Iqama\" class=\"form-control form-control-lg\" value=\"3483984390843\" placeholder=\"National ID\" [attr.disabled]=\"disabledBankButton\">\n                                    </div>\n                                    <div class=\"col-lg-12 h-70\">\n                                            <label for=\"AccountStatement\" class=\"font-bold mt-2\">Account Statement for last 3 months </label>\n                                            <input type=\"file\" class=\"custom-file-input\">\n                                            <div class=\"file-input\">\n                                                <p class=\"text-center\">\n                                                    <span class=\"px-3\">\n                                                        <svg width=\"28\" height=\"22\" viewBox=\"0 0 28 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.68117 2.2677L1.96299 4.4627C1.06069 4.80906 0.610006 5.82131 0.956368 6.72361L5.97352 19.7937C6.31988 20.696 7.33212 21.1467 8.23443 20.8004L18.037 17.0375C18.9393 16.6911 19.39 15.6789 19.0436 14.7766L15.5944 5.79087L7.68117 2.2677Z\" fill=\"#F9F9F9\" stroke=\"#D8D8D8\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                            <path d=\"M7.68115 2.26758L9.87616 7.98576L15.5943 5.79075\" stroke=\"#D8D8D8\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M20.2069 2.62589L14.3816 0.733163C13.4624 0.434498 12.4752 0.937537 12.1765 1.85673L7.85027 15.1715C7.5516 16.0907 8.05464 17.078 8.97384 17.3767L18.9599 20.6213C19.8791 20.92 20.8664 20.417 21.1651 19.4978L24.1393 10.3438L20.2069 2.62589Z\" fill=\"#FEFCF8\" stroke=\"#F6CF00\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                            <path d=\"M20.2069 2.62598L18.3142 8.4512L24.1394 10.3439\" stroke=\"#F6CF00\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                        </svg>\n                                                        </span>\n                                                    Darg and drop here</p>\n                                            </div>\n\n                                    </div>\n                                    <div class=\"col-lg-12 h-70\">\n                                            <label for=\"SalaryStatement\" class=\"font-bold mt-2\">Salary Statement</label>\n                                            <input type=\"file\" class=\"custom-file-input\">\n                                            <div class=\"file-input\">\n                                               <p class=\"text-center\">\n                                                    <span class=\"px-3\">\n                                                        <svg width=\"28\" height=\"22\" viewBox=\"0 0 28 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.68117 2.2677L1.96299 4.4627C1.06069 4.80906 0.610006 5.82131 0.956368 6.72361L5.97352 19.7937C6.31988 20.696 7.33212 21.1467 8.23443 20.8004L18.037 17.0375C18.9393 16.6911 19.39 15.6789 19.0436 14.7766L15.5944 5.79087L7.68117 2.2677Z\" fill=\"#F9F9F9\" stroke=\"#D8D8D8\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                            <path d=\"M7.68115 2.26758L9.87616 7.98576L15.5943 5.79075\" stroke=\"#D8D8D8\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M20.2069 2.62589L14.3816 0.733163C13.4624 0.434498 12.4752 0.937537 12.1765 1.85673L7.85027 15.1715C7.5516 16.0907 8.05464 17.078 8.97384 17.3767L18.9599 20.6213C19.8791 20.92 20.8664 20.417 21.1651 19.4978L24.1393 10.3438L20.2069 2.62589Z\" fill=\"#FEFCF8\" stroke=\"#F6CF00\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                            <path d=\"M20.2069 2.62598L18.3142 8.4512L24.1394 10.3439\" stroke=\"#F6CF00\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                                        </svg>\n                                                        </span>   \n                                                Darg and drop here</p>\n                                            </div>\n\n                                    </div>\n                                    </form>\n                        </div>\n                        </div>\n        \n                        <div class=\"col-lg-10 mt-3 row justify-content-end py-4 mt-4\" *ngIf=\"!isShown\">     \n                                <div class=\"form-group col-lg-2\">\n                                       <button class=\"btn btn-info btn-lg btn-block btn-black mt-2\" (click)=\"EditInfo()\">\n                                            <svg width=\"13\" height=\"13\" viewBox=\"0 0 13 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.3632 4.32641L4.05556 11.5H1V8.72222L8.94444 1.5L11.3632 4.32641Z\" stroke=\"#694F70\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            </svg>\n                                            <span class=\"px-3\">Edit</span>\n                                        </button>\n                                    </div>\n                               <div class=\"form-group col-lg-2\">\n                                   <button class=\"btn btn-info btn-lg btn-block btn-purple mt-2\" (click)=\"SaveInfo()\">Save</button>\n                               </div>\n                        </div>\n\n                        <div class=\"col-lg-10 mt-3 row justify-content-end py-4 mt-2\" *ngIf=\"isShown\">     \n                                <div class=\"form-group col-lg-2\">\n                                       <button class=\"btn btn-info btn-lg btn-block btn-black mt-2\" (click)=\"EditBankInfo()\">\n                                            <svg width=\"13\" height=\"13\" viewBox=\"0 0 13 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.3632 4.32641L4.05556 11.5H1V8.72222L8.94444 1.5L11.3632 4.32641Z\" stroke=\"#694F70\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            </svg>\n                                            <span class=\"px-3\">Edit</span>\n                                        </button>\n                                    </div>\n                               <div class=\"form-group col-lg-2\">\n                                   <button class=\"btn btn-info btn-lg btn-block btn-purple mt-2\" (click)=\"SaveBankInfo()\">Save</button>\n                               </div>\n                        </div>\n            </div>\n        </div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/requests/requests.component.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/requests/requests.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n        <div class=\"row\">\n            <aside class=\"left-sidebar col-lg-4\">\n                <!-- Sidebar scroll-->\n                <div class=\"scroll-sidebar\">\n                    <app-sidebar></app-sidebar>\n                </div>\n                <!-- End Sidebar scroll-->\n            </aside>\n                <div class=\"page-wraper-right row\">\n                    <ul class=\"navbar-nav float-right text-right mt-4 col-lg-11\">\n                        <li class=\"nav-item m-r-20 dashbored-nav\">\n\n                            <div class=\"d-inline-block\" ngbDropdown #myDrop=\"ngbDropdown\">\n                                <i class=\"mr-1\">\n                                        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3766 17.7642 20.3766 18.295C20.3766 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2966 18.375 20.2966C17.8442 20.2966 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.83V21C14.08 22.1046 13.1846 23 12.08 23C10.9754 23 10.08 22.1046 10.08 21V20.91C10.0642 20.2327 9.63587 19.6339 9 19.4C8.38291 19.1277 7.66219 19.2583 7.18 19.73L7.12 19.79C6.74486 20.1656 6.23582 20.3766 5.705 20.3766C5.17418 20.3766 4.66514 20.1656 4.29 19.79C3.91445 19.4149 3.70343 18.9058 3.70343 18.375C3.70343 17.8442 3.91445 17.3351 4.29 16.96L4.35 16.9C4.82167 16.4178 4.95235 15.6971 4.68 15.08C4.42093 14.4755 3.82764 14.0826 3.17 14.08H3C1.89543 14.08 1 13.1846 1 12.08C1 10.9754 1.89543 10.08 3 10.08H3.09C3.76733 10.0642 4.36613 9.63587 4.6 9C4.87235 8.38291 4.74167 7.66219 4.27 7.18L4.21 7.12C3.83445 6.74486 3.62343 6.23582 3.62343 5.705C3.62343 5.17418 3.83445 4.66514 4.21 4.29C4.58514 3.91445 5.09418 3.70343 5.625 3.70343C6.15582 3.70343 6.66486 3.91445 7.04 4.29L7.1 4.35C7.58219 4.82167 8.30291 4.95235 8.92 4.68H9C9.60447 4.42093 9.99738 3.82764 10 3.17V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3V3.09C14.0026 3.74764 14.3955 4.34093 15 4.6C15.6171 4.87235 16.3378 4.74167 16.82 4.27L16.88 4.21C17.2551 3.83445 17.7642 3.62343 18.295 3.62343C18.8258 3.62343 19.3349 3.83445 19.71 4.21C20.0856 4.58514 20.2966 5.09418 20.2966 5.625C20.2966 6.15582 20.0856 6.66486 19.71 7.04L19.65 7.1C19.1783 7.58219 19.0477 8.30291 19.32 8.92V9C19.5791 9.60447 20.1724 9.99738 20.83 10H21C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14H20.91C20.2524 14.0026 19.6591 14.3955 19.4 15Z\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                        </svg>\n                                    </i>\n                                <button class=\"btn btn-outline-primary mr-1\" id=\"dropdownManual\" ngbDropdownAnchor (focus)=\"myDrop.open()\">Setting</button>\n                                <div ngbDropdownMenu aria-labelledby=\"dropdownManual\">\n                                  <button ngbDropdownItem class=\"pruple\">\n                                      <span>\n                                        <svg width=\"13\" height=\"12\" viewBox=\"0 0 13 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            <path d=\"M7.79995 4.2002L4.19995 7.8002\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            <path d=\"M4.19995 4.2002L7.79995 7.8002\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                         </svg>\n                                    </span>\n                                    Deactivate the account</button>\n                                  <button ngbDropdownItem class=\"pruple\">\n                                    <span>\n                                        <svg width=\"13\" height=\"14\" viewBox=\"0 0 13 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                            <path d=\"M0 2.6665H1.33333H12\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            <path d=\"M2.83325 2.66667C2.83325 1.83824 2.16168 1.16667 1.33325 1.16667V2.16667C1.60939 2.16667 1.83325 2.39052 1.83325 2.66667H2.83325ZM2.83325 12V2.66667H1.83325V12H2.83325ZM2.66659 11.8333C2.75863 11.8333 2.83325 11.908 2.83325 12H1.83325C1.83325 12.4602 2.20635 12.8333 2.66659 12.8333V11.8333ZM9.33325 11.8333H2.66659V12.8333H9.33325V11.8333ZM9.16658 12C9.16658 11.908 9.2412 11.8333 9.33325 11.8333V12.8333C9.79349 12.8333 10.1666 12.4602 10.1666 12H9.16658ZM9.16658 2.66667V12H10.1666V2.66667H9.16658ZM10.6666 1.16667C9.83816 1.16667 9.16658 1.83824 9.16658 2.66667H10.1666C10.1666 2.39052 10.3904 2.16667 10.6666 2.16667V1.16667ZM12.1666 2.66667C12.1666 1.83824 11.495 1.16667 10.6666 1.16667V2.16667C10.9427 2.16667 11.1666 2.39052 11.1666 2.66667H12.1666ZM12.1666 12V2.66667H11.1666V12H12.1666ZM9.33325 14.8333C10.8981 14.8333 12.1666 13.5648 12.1666 12H11.1666C11.1666 13.0125 10.3458 13.8333 9.33325 13.8333V14.8333ZM2.66659 14.8333H9.33325V13.8333H2.66659V14.8333ZM-0.166748 12C-0.166748 13.5648 1.10178 14.8333 2.66659 14.8333V13.8333C1.65406 13.8333 0.833252 13.0125 0.833252 12H-0.166748ZM-0.166748 2.66667V12H0.833252V2.66667H-0.166748ZM1.33325 1.16667C0.504825 1.16667 -0.166748 1.83824 -0.166748 2.66667H0.833252C0.833252 2.39052 1.05711 2.16667 1.33325 2.16667V1.16667ZM4.83325 1.33333C4.83325 1.42538 4.75863 1.5 4.66659 1.5V0.5C4.20635 0.5 3.83325 0.873096 3.83325 1.33333H4.83325ZM4.83325 2.66667V1.33333H3.83325V2.66667H4.83325ZM3.33325 4.16667C4.16168 4.16667 4.83325 3.49509 4.83325 2.66667H3.83325C3.83325 2.94281 3.60939 3.16667 3.33325 3.16667V4.16667ZM1.83325 2.66667C1.83325 3.49509 2.50482 4.16667 3.33325 4.16667V3.16667C3.05711 3.16667 2.83325 2.94281 2.83325 2.66667H1.83325ZM1.83325 1.33333V2.66667H2.83325V1.33333H1.83325ZM4.66659 -1.5C3.10178 -1.5 1.83325 -0.231473 1.83325 1.33333H2.83325C2.83325 0.320811 3.65406 -0.5 4.66659 -0.5V-1.5ZM7.33325 -1.5H4.66659V-0.5H7.33325V-1.5ZM10.1666 1.33333C10.1666 -0.231474 8.89806 -1.5 7.33325 -1.5V-0.5C8.34577 -0.5 9.16659 0.320811 9.16659 1.33333H10.1666ZM10.1666 2.66667V1.33333H9.16659V2.66667H10.1666ZM8.66659 4.16667C9.49501 4.16667 10.1666 3.49509 10.1666 2.66667H9.16659C9.16659 2.94281 8.94273 3.16667 8.66659 3.16667V4.16667ZM7.16659 2.66667C7.16659 3.49509 7.83816 4.16667 8.66659 4.16667V3.16667C8.39044 3.16667 8.16659 2.94281 8.16659 2.66667H7.16659ZM7.16659 1.33333V2.66667H8.16659V1.33333H7.16659ZM7.33325 1.5C7.2412 1.5 7.16659 1.42538 7.16659 1.33333H8.16659C8.16659 0.873096 7.79349 0.5 7.33325 0.5V1.5ZM4.66659 1.5H7.33325V0.5H4.66659V1.5Z\" fill=\"#5C20D2\"/>\n                                            <path d=\"M4.66675 6V10\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                            <path d=\"M7.33325 6V10\" stroke=\"#5C20D2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                        </svg>   \n                                    </span>  \n                                    Delete the account</button>\n                                  <button ngbDropdownItem [routerLink]=\"[ '/login' ]\">\n                                      <span>\n                                          <svg width=\"11\" height=\"12\" viewBox=\"0 0 11 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                        <rect y=\"5\" width=\"10\" height=\"6.11111\" rx=\"2\" stroke=\"black\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                        <path d=\"M2.22217 5V2.77778C2.22217 1.24365 3.46582 0 4.99995 0C6.53407 0 7.77772 1.24365 7.77772 2.77778V5\" stroke=\"black\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                        </svg>\n                                        </span>\n                                      Sign Out</button>\n                                </div>\n                         </div>\n                        </li>\n                    </ul>\n                </div>\n        \n        \n        \n        <div class=\"page-wraper-right\">\n                        <div class=\"mat-card col-lg-11 mt-5 row welcome-card inner p-2\">\n                            <img class=\"col-lg-2\" src=\"assets/images/bookWithMen 2.svg\">\n                            <div class=\"col-lg-4 px-0\">\n                                <p class=\"grey-text-color mt-4\">All Requests</p>\n                            </div>\n                            <form class=\"col-lg-3\">\n                            <div class=\"form-group\">\n                                <label for=\"profileInformation\" class=\"font-size-13 mt-2\">Select Request Type</label>\n                                <select class=\"form-control form-control-lg mb-2§ custom-select\" (change)=\"onChange($event.target.value)\">\n                                        <option value=\"\" selected>All requests</option>\n                                        <option value=\"Ongoing\">On going</option>\n                                        <option value=\"Under Review\">Under Review</option>\n                                        <option value=\"Reject\">Reject</option>\n                                        <option value=\"Wating your approval\">Wating your approval</option>\n                                </select>\n                                <svg class=\"arrow\" fill=\"none\" height=\"7\" viewBox=\"0 0 14 12\" width=\"10\" xmlns=\"http://www.w3.org/2000/svg\"><path _ngcontent-pkd-c13=\"\" d=\"M1 1.2113L7 10.7606L13 1.2113\" stroke=\"#000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"></path></svg>\n                            </div>\n                            </form>\n                            <form class=\"col-lg-3\">\n                                    <div class=\"form-group\">\n                                        <label for=\"dateOfBirth\" class=\"font-size-13 mt-2\">Filter Date</label>\n                                        <div class=\"input-group\">\n                                        <input (click)=\"dp.toggle()\" class=\"form-control date-picker\" placeholder=\"mm-dd-yyyy\" name=\"dp\" ngbDatepicker #dp=\"ngbDatepicker\">\n                                        <i class=\"fa fa-calendar\"></i>\n                                        </div>\n                                    </div>\n                                    </form>\n                        </div>\n        \n        \n        \n                        <div class=\"col-lg-11 row justify-content-end mt-5 dashbored-info\">\n                            <div class=\"form-group justify-content-end col-lg-3\">\n                                <button class=\"btn btn-danger btn-lg btn-block btn-red mt-2\" (click)=\"EditInfo()\">\n                                    <svg width=\"20\" height=\"24\" viewBox=\"0 0 20 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                      <path d=\"M1 6H3H19\" stroke=\"#C5003E\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                      <path d=\"M5 6C5 4.89543 4.10457 4 3 4V6H5ZM5 20V6H3V20H5ZM5 20H3C3 21.1046 3.89543 22 5 22V20ZM15 20H5V22H15V20ZM15 20V22C16.1046 22 17 21.1046 17 20H15ZM15 6V20H17V6H15ZM17 4C15.8954 4 15 4.89543 15 6H17V4ZM19 6C19 4.89543 18.1046 4 17 4V6H19ZM19 20V6H17V20H19ZM15 24C17.2091 24 19 22.2091 19 20H17C17 21.1046 16.1046 22 15 22V24ZM5 24H15V22H5V24ZM1 20C1 22.2091 2.79086 24 5 24V22C3.89543 22 3 21.1046 3 20H1ZM1 6V20H3V6H1ZM3 4C1.89543 4 1 4.89543 1 6H3V4ZM8 4V2C6.89543 2 6 2.89543 6 4H8ZM8 6V4H6V6H8ZM6 8C7.10457 8 8 7.10457 8 6H6V8ZM4 6C4 7.10457 4.89543 8 6 8V6H4ZM4 4V6H6V4H4ZM8 0C5.79086 0 4 1.79086 4 4H6C6 2.89543 6.89543 2 8 2V0ZM12 0H8V2H12V0ZM16 4C16 1.79086 14.2091 0 12 0V2C13.1046 2 14 2.89543 14 4H16ZM16 6V4H14V6H16ZM14 8C15.1046 8 16 7.10457 16 6H14V8ZM12 6C12 7.10457 12.8954 8 14 8V6H12ZM12 4V6H14V4H12ZM12 4H14C14 2.89543 13.1046 2 12 2V4ZM8 4H12V2H8V4Z\" fill=\"#C5003E\"/>\n                                      <path d=\"M8 11V17\" stroke=\"#C5003E\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                      <path d=\"M12 11V17\" stroke=\"#C5003E\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                                      </svg>                                      \n                                     <span class=\"px-3\">Delete</span>\n                                 </button>\n                             </div>\n                            <div class=\"justify-content-center col-lg-12\">\n                                    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8 mb-5\" cellpadding=\"20\">\n\n                                            <!-- Checkbox Column -->\n                                            <ng-container matColumnDef=\"select\">\n                                              <th mat-header-cell *matHeaderCellDef>\n                                                <mat-checkbox (change)=\"$event ? masterToggle() : null\"\n                                                              [checked]=\"selection.hasValue() && isAllSelected()\"\n                                                              [indeterminate]=\"selection.hasValue() && !isAllSelected()\"\n                                                              [aria-label]=\"checkboxLabel()\">\n                                                </mat-checkbox>\n                                              </th>\n                                              <td mat-cell *matCellDef=\"let row\">\n                                                <mat-checkbox (click)=\"$event.stopPropagation()\"\n                                                              (change)=\"$event ? selection.toggle(row) : null\"\n                                                              [checked]=\"selection.isSelected(row)\"\n                                                              [aria-label]=\"checkboxLabel(row)\">\n                                                </mat-checkbox>\n                                              </td>\n                                            </ng-container>\n                                          \n                                            <!-- Position Column -->\n                                            <ng-container matColumnDef=\"position\">\n                                              <th mat-header-cell *matHeaderCellDef>Product Name </th>\n                                              <td mat-cell *matCellDef=\"let element\"> {{element.name}} </td>\n                                            </ng-container>\n                                          \n                                            <!-- Name Column -->\n                                            <ng-container matColumnDef=\"name\">\n                                              <th mat-header-cell *matHeaderCellDef>Request Date</th>\n                                              <td mat-cell *matCellDef=\"let element\"> {{element.date}} </td>\n                                            </ng-container>\n                                          \n                                            <!-- Weight Column -->\n                                            <ng-container matColumnDef=\"weight\">\n                                              <th mat-header-cell *matHeaderCellDef>  </th>\n                                              <td mat-cell *matCellDef=\"let element\"> {{element.value}} </td>\n                                            </ng-container>\n                                          \n                                            <!-- Symbol Column -->\n                                            <ng-container matColumnDef=\"symbol\">\n                                              <th mat-header-cell *matHeaderCellDef>  </th>\n                                              <td mat-cell *matCellDef=\"let element\" class=\"mat-cell {{element.status}}\"> {{element.status}} </td>\n                                            </ng-container>\n                                          \n                                            <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n                                            <tr [ngClass]=\"{ selected: selection.isSelected(row)}\" mat-row *matRowDef=\"let row; columns: displayedColumns;\"\n                                                (click)=\"selection.isSelected(row)\">\n                                            </tr>\n                                          </table>\n\n\n\n                           </div>\n                        </div>\n        \n            </div>\n        </div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/shared/breadcrumb/breadcrumb.component.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shared/breadcrumb/breadcrumb.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Bread crumb and right sidebar toggle -->\n<!-- ============================================================== -->\n<div class=\"page-breadcrumb\">\n    <div class=\"row\">\n        <div class=\"col-12 align-self-center\">\n            <h4 class=\"page-title text-info\">{{pageInfo?.title}}</h4>\n        </div>\n    </div>\n</div>\n<!-- ============================================================== -->\n<!-- End Bread crumb and right sidebar toggle -->\n<!-- ============================================================== -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/shared/header-navigation/navigation.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shared/header-navigation/navigation.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- toggle and nav items -->\n<!-- ============================================================== -->\n<ul class=\"navbar-nav float-left mr-auto\">\n    <li class=\"nav-item d-none d-md-block d-lg-none\">\n        <a (click)=\"toggleSidebar.emit()\" class=\"nav-link sidebartoggler waves-effect waves-light\" href=\"javascript:void(0)\">\n            <i class=\"mdi mdi-menu font-24\"></i>\n        </a>\n    </li>\n\t<li class=\"\">\n\t\t<div class=\"m-t-15\">\n        \t<a href=\"https://www.wrappixel.com/templates/monster-angular-dashboard/\" class=\"btn btn-block btn-success text-white ml-3\">Upgrade to Pro</a>\n\t\t</div>\n    </li>\n</ul>\n<!-- ============================================================== -->\n<!-- Right side toggle and nav items -->\n<!-- ============================================================== -->\n<ul class=\"navbar-nav float-right\">\n    <li class=\"nav-item pr-2 d-none d-md-block\">\n        <form class=\"app-search\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Search for...\"> \n\t\t\t<a class=\"srh-btn\"><i class=\"ti-search\"></i></a> \n\t\t</form>\n    </li>\n    <!-- ============================================================== -->\n    <!-- User profile and search -->\n    <!-- ============================================================== -->\n    <li class=\"nav-item dropdown\" ngbDropdown placement=\"bottom-right\">\n        <a ngbDropdownToggle class=\"nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic\" href=\"javascript:void(0)\"\n            data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n            <img src=\"assets/images/users/1.jpg\" alt=\"user\" class=\"rounded-circle\" width=\"31\">\n        </a>\n        <div class=\"dropdown-menu user-dd\" ngbDropdownMenu>\n            <a class=\"dropdown-item\" href=\"javascript:void(0)\">\n                <i class=\"ti-user m-r-5 m-l-5\"></i> My Profile</a>\n            <a class=\"dropdown-item\" href=\"javascript:void(0)\">\n                <i class=\"ti-wallet m-r-5 m-l-5\"></i> My Balance</a>\n            <a class=\"dropdown-item\" href=\"javascript:void(0)\">\n                <i class=\"ti-email m-r-5 m-l-5\"></i> Inbox</a>\n            <div class=\"dropdown-divider\"></div>\n            <a class=\"dropdown-item\" href=\"javascript:void(0)\">\n                <i class=\"ti-settings m-r-5 m-l-5\"></i> Account Setting</a>\n            <div class=\"dropdown-divider\"></div>\n            <a class=\"dropdown-item\" href=\"javascript:void(0)\">\n                <i class=\"fa fa-power-off m-r-5 m-l-5\"></i> Logout</a>\n            <div class=\"dropdown-divider\"></div>\n            <div class=\"p-l-30 p-10\">\n                <a href=\"javascript:void(0)\" class=\"btn btn-sm btn-success btn-rounded\">View Profile</a>\n            </div>\n        </div>\n    </li>\n    <!-- ============================================================== -->\n    <!-- User profile and search -->\n    <!-- ============================================================== -->\n</ul>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/shared/sidebar/sidebar.component.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/shared/sidebar/sidebar.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"sidebar-nav\">\n        <img src=\"assets/images/logo-white.svg\" alt=\"antim\" class=\"logo\">\n\n\n\n    <ul class=\"user-info pt-4\">\n        <li class=\"row p-4 cursor-pointer\" [routerLink]=\"[ '/profile' ]\">\n            <img src=\"assets/images/user.svg\" class=\"col-lg-3 p-0\">\n            <div class=\"col-lg-8 ml-1\">\n            <p class=\"white-text mt-1\">\n                HI <br/>\n                Ismael alakhras<br/>\n                <span>Borrower</span>\n            </p>\n        </div>\n        <i class=\"material-icons\">\n                <svg width=\"7\" height=\"14\" viewBox=\"0 0 7 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M1 13L7 7L1 1\" stroke=\"#D8D8D8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                    </svg>\n                    \n         </i>\n        </li>\n    </ul>\n    <ul id=\"sidebarnav\" class=\"mt-3\">\n            <li class=\"sidebar-item\">\n\n              <a class=\"sidebar-link waves-effect waves-dark home\" [routerLink]=\"[ '/dashbored' ]\">\n                <i class=\"mdi\">\n                        <svg width=\"23\" height=\"26\" viewBox=\"0 0 23 26\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M2.64282 21.6821V9.90891L11.5 2.90021L20.3571 9.90891V21.6821C20.3571 22.377 19.8079 22.9107 19.1666 22.9107H3.8333C3.192 22.9107 2.64282 22.377 2.64282 21.6821Z\" stroke=\"#707070\" stroke-width=\"2\"/>\n                            <mask id=\"path-2-inside-1\" fill=\"white\">\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.68359 23.9109V15.5537H14.3162V23.9109\"/>\n                            </mask>\n                            <path d=\"M8.68359 15.5537V13.5537H6.68359V15.5537H8.68359ZM14.3162 15.5537H16.3162V13.5537H14.3162V15.5537ZM10.6836 23.9109V15.5537H6.68359V23.9109H10.6836ZM8.68359 17.5537H14.3162V13.5537H8.68359V17.5537ZM12.3162 15.5537V23.9109H16.3162V15.5537H12.3162Z\" fill=\"#707070\" mask=\"url(#path-2-inside-1)\"/>\n                        </svg>\n                    </i>\n                    <span class=\"hide-menu ml-3\">Home</span>\n             </a>\n\n\n             <a class=\"sidebar-link waves-effect waves-dark my-request\" [routerLink]=\"[ '/requests' ]\">\n                <i class=\"mdi\">\n                        <svg width=\"25\" height=\"28\" viewBox=\"0 0 25 28\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M17.4242 22.4597V20.5132C17.4242 18.3631 15.6605 16.6201 13.4848 16.6201H5.60602C3.43035 16.6201 1.66663 18.3631 1.66663 20.5132V22.4597\" stroke=\"#707070\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.54535 12.7275C11.721 12.7275 13.4847 10.9845 13.4847 8.83445C13.4847 6.68438 11.721 4.94141 9.54535 4.94141C7.36968 4.94141 5.60596 6.68438 5.60596 8.83445C5.60596 10.9845 7.36968 12.7275 9.54535 12.7275Z\" stroke=\"#707070\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                            <path d=\"M23.3333 22.4601V20.5136C23.332 18.7395 22.117 17.1906 20.3788 16.7471\" stroke=\"#707070\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                            <path d=\"M16.4393 5.06836C18.1824 5.50941 19.4016 7.06159 19.4016 8.83975C19.4016 10.6179 18.1824 12.1701 16.4393 12.6111\" stroke=\"#707070\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                            </svg>\n                            \n                </i>\n                    <span class=\"hide-menu ml-3\">My Requests</span>\n             </a>\n\n\n\n             <a class=\"sidebar-link waves-effect waves-dark Notification\" [routerLink]=\"[ '/notification' ]\">\n                <i class=\"mdi\">\n                        <svg width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M6.91669 9.78904H5.91669H6.91669ZM6.28463 17.3537L5.43628 16.8243C5.24388 17.1326 5.23387 17.521 5.41014 17.8388C5.58641 18.1566 5.92122 18.3537 6.28463 18.3537V17.3537ZM20.7154 17.3537V18.3537C21.0788 18.3537 21.4136 18.1566 21.5899 17.8388C21.7662 17.521 21.7562 17.1326 21.5638 16.8243L20.7154 17.3537ZM24.3334 17.3537H25.3334C25.3334 16.8015 24.8856 16.3537 24.3334 16.3537V17.3537ZM24.3334 19.3537V20.3537C24.8856 20.3537 25.3334 19.906 25.3334 19.3537H24.3334ZM10.758 22.1392L11.6258 22.6361L10.758 22.1392ZM16.242 22.1392L15.3742 22.6361L16.242 22.1392ZM16.2366 23.1423L15.3742 22.6361L16.2366 23.1423ZM10.7634 23.1423L11.6258 22.6361L10.7634 23.1423ZM7.91669 9.78904C7.91669 6.77646 10.3946 4.29492 13.5 4.29492V2.29492C9.31134 2.29492 5.91669 5.65067 5.91669 9.78904H7.91669ZM7.91669 15.142V9.78904H5.91669V15.142H7.91669ZM7.13297 17.8832C7.62946 17.0876 7.91669 16.1479 7.91669 15.142H5.91669C5.91669 15.7622 5.74066 16.3366 5.43628 16.8243L7.13297 17.8832ZM20.7154 16.3537H6.28463V18.3537H20.7154V16.3537ZM19.0834 15.142C19.0834 16.1479 19.3706 17.0876 19.8671 17.8832L21.5638 16.8243C21.2594 16.3366 21.0834 15.7622 21.0834 15.142H19.0834ZM19.0834 9.78904V15.142H21.0834V9.78904H19.0834ZM13.5 4.29492C16.6055 4.29492 19.0834 6.77646 19.0834 9.78904H21.0834C21.0834 5.65067 17.6887 2.29492 13.5 2.29492V4.29492ZM24.3334 16.3537C23.6221 16.3537 23.0834 15.7905 23.0834 15.142H21.0834C21.0834 16.9143 22.5369 18.3537 24.3334 18.3537V16.3537ZM23.0834 15.142V9.78904H21.0834V15.142H23.0834ZM23.0834 9.78904C23.0834 4.52294 18.77 0.294922 13.5 0.294922V2.29492C17.6886 2.29492 21.0834 5.65055 21.0834 9.78904H23.0834ZM13.5 0.294922C8.23007 0.294922 3.91669 4.52294 3.91669 9.78904H5.91669C5.91669 5.65055 9.31146 2.29492 13.5 2.29492V0.294922ZM3.91669 9.78904V15.142H5.91669V9.78904H3.91669ZM3.91669 15.142C3.91669 15.7905 3.3779 16.3537 2.66669 16.3537V18.3537C4.46313 18.3537 5.91669 16.9143 5.91669 15.142H3.91669ZM2.66669 16.3537C1.56212 16.3537 0.666687 17.2492 0.666687 18.3537H2.66669V16.3537ZM0.666687 18.3537C0.666687 19.4583 1.56212 20.3537 2.66669 20.3537V18.3537H0.666687ZM2.66669 20.3537H24.3334V18.3537H2.66669V20.3537ZM25.3334 19.3537V17.3537H23.3334V19.3537H25.3334ZM11.6258 20.6361C10.9087 20.6361 10.2465 21.02 9.89021 21.6423L11.6258 22.6361V20.6361ZM15.3742 20.6361H11.6258V22.6361H15.3742V20.6361ZM17.1098 21.6423C16.7535 21.02 16.0913 20.6361 15.3742 20.6361V22.6361L17.1098 21.6423ZM17.099 23.6485C17.462 23.0301 17.4661 22.2646 17.1098 21.6423L15.3742 22.6361L17.099 23.6485ZM13.5 25.7029C14.974 25.7029 16.3483 24.9275 17.099 23.6485L15.3742 22.6361C14.9866 23.2963 14.2726 23.7029 13.5 23.7029V25.7029ZM9.90104 23.6485C10.6518 24.9275 12.0261 25.7029 13.5 25.7029V23.7029C12.7274 23.7029 12.0134 23.2963 11.6258 22.6361L9.90104 23.6485ZM9.89021 21.6423C9.53389 22.2646 9.53803 23.0301 9.90104 23.6485L11.6258 22.6361L9.89021 21.6423Z\" fill=\"#707070\"/>\n                        </svg>\n                            \n                </i>\n                    <span class=\"hide-menu ml-3\">Notification</span>\n             </a>\n\n            </li>\n    </ul>\n\n    <div class=\"bottom-sidebar row\">\n            <button class=\"btn btn-grey mt-2 col-lg-10 m-4\" [routerLink]=\"[ '/login' ]\">\n                <i>\n                <svg width=\"20\" height=\"23\" viewBox=\"0 0 20 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M8.88873 20.3922H4.44428C3.46244 20.3922 2.6665 19.5983 2.6665 18.6189V4.43308C2.6665 3.45375 3.46244 2.65985 4.44428 2.65985H8.88873\" stroke=\"#707070\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                    <path d=\"M15.1108 15.0725L18.6664 11.526L15.1108 7.97955\" stroke=\"#707070\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                    <path d=\"M18.6667 11.526H8\" stroke=\"#707070\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                </svg>\n                </i><span>Log out</span> </button>\n    </div>\n</nav>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/sign-up/sign-up.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/sign-up/sign-up.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid mt-5\">\n    <div class=\"row justify-content-center align-items-center\">\n        <div class=\"col col-sm-12 col-md-6 col-lg-5 col-xl-3 background-box px-5 py-1 pb-4 text-center mt-0\">\n            <div *ngIf=\"!showSelected\">\n                <h2 class=\"mt-5\">Sign Up</h2>\n                <p class=\"grey-text-color mt-3 mb-4\">Very Easy ans straight forward steps to register.\n                <br/> Just follow the lead</p>\n            </div>\n            <form class=\"form-log-in mt-4 form-antim\" [formGroup]=\"SigUpForm\">\n                <div class=\"first-step row\" *ngIf=\"!showSelected  && !lastStep\">\n                <div class=\"col-lg-2\">\n                    <h5 class=\"vertical-text mt-4\">what about you ?</h5>\n                </div>\n                <div class=\"form-group text-left col-lg-4 col-6 text-center\">\n                    <div class=\"select-options-radio\" [ngClass]=\"{'active': id === 1 }\" id=\"1\" (click)=\"addClass(id=1)\">\n                        <label for=\"Lender\"></label>\n                        <input name=\"usertype\" id=\"Lender\" type=\"radio\" value=\"Lender\">\n                        <img src=\"assets/images/lender.svg\" alt=\"antim\">\n                        <p class=\"grey-text-color mt-4\">Lender</p>\n                    </div>\n                </div>\n                <div class=\"form-group text-left col-lg-4 col-6 text-center\">\n                    <div class=\"select-options-radio\" [ngClass]=\"{'active': id === 2 }\" id=\"2\" (click)=\"addClass(id=2)\">\n                            <label for=\"Borrower\"></label>\n                            <input name=\"usertype\" id=\"Borrower\" type=\"radio\" value=\"Borrower\">\n                            <img src=\"assets/images/borrower-2.svg\" alt=\"antim\">\n                            <p class=\"grey-text-color mt-4\">Borrower</p>\n                    </div>\n                </div>\n                <div class=\"form-group mt-1 mb-4 col-lg-12 d-flex justify-content-center\">\n                    <button class=\"btn btn-lg btn-block btn-grey mt-3 mb-4 col-lg-3 col-12 \" [ngClass]=\"(disabledNextButton)?' ':'purple'\"  [disabled]=\"disabledNextButton\" (click)=\"Nextstep()\">Next</button>\n                </div>\n                </div>\n\n                <div *ngIf=\"showSelected && !sheckMobileStep\" class=\"px-4\">\n                        <img src=\"assets/images/borrower.svg\" alt=\"antim\" class=\"mb-2\">\n                        <p class=\"grey-text-color mt-2 mb-4\">Alright Borrower, Fill the below please</p>\n                        <div class=\"row mt-3\">\n                        <div class=\"form-group text-left col-lg-6\">\n                                <label for=\"name\">First Name<span class=\"red-color\"> *</span></label>\n                                <input formControlName=\"FirstName\" class=\"form-control form-control-lg\" placeholder=\"user name type here...\" type=\"text\">\n                                <div *ngIf=\"SigUpForm.controls['FirstName'].touched && !SigUpForm.controls['FirstName'].valid\" class=\"error-msg alert alert-danger text-left\">First Name required</div>\n\n                            </div>\n                            <div class=\"form-group text-left col-lg-6\">\n                                <label for=\"NID\">National ID No/Iqama<span class=\"red-color\"> *</span></label>\n                                <input formControlName=\"NID\" class=\"form-control form-control-lg\" placeholder=\"Ex : 0000\" type=\"text\">\n                                <div *ngIf=\"SigUpForm.controls['NID'].touched && !SigUpForm.controls['NID'].valid\" class=\"error-msg alert alert-danger text-left\">National ID is required</div>\n\n        \n                            </div>\n                            <div class=\"form-group text-left col-lg-12\">\n                                    <label for=\"email\">Email<span class=\"red-color\"> *</span></label>\n                                    <input formControlName=\"email\" class=\"form-control form-control-lg\" placeholder=\"user name type here...\" type=\"email\">\n                                    <div *ngIf=\"SigUpForm.controls['email'].touched && !SigUpForm.controls['email'].valid\" class=\"error-msg alert alert-danger text-left\">Email is required</div>\n\n                             </div>\n                             <div class=\"form-group text-left col-lg-12\">\n                                    <label for=\"phone\">Phone No<span class=\"red-color\"> *</span></label>\n                                    <input  formControlName=\"phone\" class=\"form-control form-control-lg\" placeholder=\"Ex : 011 XXX XXXX\" type=\"number\">\n                                    <div *ngIf=\"SigUpForm.controls['phone'].touched && !SigUpForm.controls['phone'].valid\" class=\"error-msg alert alert-danger text-left\">Phone is required</div>            \n                             </div>\n                             <div class=\"row justify-content-center align-items-center\">\n                             <div class=\"col-lg-8 col-11 text-center\">                              \n                                    <input type=\"checkbox\" id=\"box-1\">\n                                    <label for=\"box-1\">I agree on my Terms & Condtions</label>\n                             </div>\n                             <div class=\"col-lg-8 col-11 mt-4 text-center\">                                      \n                                    <input type=\"checkbox\" id=\"box-2\" checked>\n                                    <label for=\"box-2\">I agree on intime Terms & Condtions</label>\n                             </div>\n                             <div class=\"col-lg-11 mt-3 row justify-content-center align-items-center pb-4\">     \n                             <div class=\"form-group col-lg-6\">\n                                    <button class=\"btn btn-info btn-lg btn-block btn-black mt-2\" (click)=\"PrevStep()\">back</button>\n                            </div>\n                            <div class=\"form-group col-lg-4\">\n                                <button class=\"btn btn-info btn-lg btn-block btn-purple mt-2\" (click)=\"thirdStep()\" [disabled]=\"disabledSubmitButton\">Sign Up</button>\n                            </div>\n                            </div>\n                        </div>\n                        </div>\n               </div>\n\n\n               <div *ngIf=\"showSelected && sheckMobileStep && !lastStep\">\n                   <a class=\"close-icon\" (click)=\"closeBack()\"><img src=\"assets/images/close.svg\"></a>\n                    <img src=\"assets/images/mobile.svg\" alt=\"antim\" class=\"mb-2 mt-5\">\n                    <p class=\"mt-2 mb-4 text-left\">Well!<br/>\n                            just to be sure, Please enter your verification code to verify your <br/>\n                            mobile number.</p>\n                    <div class=\"row mt-3 justify-content-center align-items-center phone-number-code\">\n                        <div class=\"form-group text-left col-lg-2 col-3 text-center\">\n                            <input class=\"form-control form-control-lg\" placeholder=\"0\" type=\"number\">\n                        </div>\n                        <div class=\"form-group text-left col-lg-2 col-3 text-center\">\n                            <input class=\"form-control form-control-lg\" placeholder=\"0\" type=\"number\">\n                        </div>\n                        <div class=\"form-group text-left col-lg-2 col-3 text-center\">\n                            <input class=\"form-control form-control-lg\" placeholder=\"0\" type=\"number\">\n                        </div>\n                        <div class=\"form-group text-left col-lg-2 col-3 text-center\">\n                            <input class=\"form-control form-control-lg\" placeholder=\"0\" type=\"number\">\n                        </div>\n                        <p class=\"mt-3 col-lg-12\">The code will expire : 4:36</p>\n                         <div class=\"col-lg-11 mt-3 row justify-content-center align-items-center\">     \n                         <div class=\"form-group col-lg-6\">\n                            <button class=\"btn btn-info btn-lg btn-block btn-black mt-2\">Resend</button>\n                        </div>\n                        <div class=\"form-group col-lg-4\">\n                            <button class=\"btn btn-info btn-lg btn-block btn-purple mt-2\" (click)=\"lastStepd()\">Verify</button>\n                        </div>\n                    </div>\n                    </div>\n           </div>\n\n\n           <div *ngIf=\"lastStep\">\n                <a class=\"close-icon\" (click)=\"closeBackLast()\"><img src=\"assets/images/close.svg\"></a>\n                 <img src=\"assets/images/borrower-lg.svg\" alt=\"antim\" class=\"mb-2 mt-5\">\n                 <p class=\"grey-text-color mt-4 mb-4\">The last thing, Please approve the below</p>\n\n                 <div class=\"row mt-3 justify-content-center align-items-center phone-number-code pb-5\">\n                        <div class=\"col-lg-7 col-11 text-center mt-3\">                              \n                                <input type=\"checkbox\" id=\"box-1\">\n                                <label for=\"box-1\">I agree on my Terms & Condtions</label>\n                         </div>\n                         <div class=\"col-lg-7 col-11 mt-4 text-center mb-5\">                                      \n                                <input type=\"checkbox\" id=\"box-2\" checked>\n                                <label for=\"box-2\">I agree on intime Terms & Condtions</label>\n                         </div>\n                      <div class=\"col-lg-11 mt-3 row justify-content-center align-items-center pb-4\">     \n                      <div class=\"form-group col-lg-9 \">\n                         <button class=\"btn btn-info btn-lg btn-block btn-purple mt-2\" [routerLink]=\"[ '/dashbored' ]\">Sign Up</button>\n                     </div>\n                 </div>\n                 </div>\n        </div>\n\n            </form>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/who-we-are/who-we-are.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/who-we-are/who-we-are.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container header-inner\">\n        <div class=\"row mb-3\">\n            <div class=\"col-lg-12 d-flex justify-content-center flex-column text-center mt-min-100\">\n                <img src=\"assets/images/image-antim.svg\" class=\"wow fadeInUp\" data-wow-duration=\".8s\" data-wow-delay=\"0.5s\">\n                <h1 class=\"wow fadeInUp mt-4\" data-wow-duration=\".8s\" data-wow-delay=\"0.5s\">Who we are</h1>\n                <p class=\"wow fadeInUp\" data-wow-duration=\".8s\" data-wow-delay=\"0.5s\">We're working on elevating the Kingdom of Saudi Arabia's digital footprint in the Financial technology services sector, in pursuit of the national vision.</p>\n            </div>\n        </div>\n </div>\n\n <div class=\"container pb-3\">\n     <div class=\"row py-5\">\n         <div class=\"col-lg-6 text-center\">\n            <svg width=\"108\" height=\"109\" viewBox=\"0 0 108 109\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.0509 21.4003C24.4747 1.65994 90.9444 8.59544 66.9393 69.4567C42.9341 130.318 7.62718 41.1406 16.0509 21.4003Z\" fill=\"#39A4E9\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M50.3996 18.2053C62.6559 27.3185 98.6326 73.1854 35.508 90.6697C-27.6165 108.154 38.1433 9.09213 50.3996 18.2053Z\" fill=\"#5C20D2\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M27.7635 31.5357C41.3393 24.5311 98.3964 12.3499 86.4624 76.6666C74.5284 140.983 14.1877 38.5403 27.7635 31.5357Z\" fill=\"black\"/>\n            </svg>\n            <h2 class=\"col-lg-12 text-center font-purple font-bold mb-4 wow fadeInUp\">Our vision</h2>\n         </div>\n         <div class=\"col-lg-6 text-center mt-5\">\n             <p class=\"light-paragraph mt-5\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>\n         </div>\n\n     </div>\n     \n     <div class=\"row py-5\">\n            <div class=\"col-lg-6 text-center mt-5 order-lg-1 order-1\">\n                    <p class=\"light-paragraph mt-5\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>\n                </div>\n   \n            <div class=\"col-lg-6 text-center order-lg-1 order-0\">\n                   <svg width=\"108\" height=\"109\" viewBox=\"0 0 108 109\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.0509 21.4003C24.4747 1.65994 90.9444 8.59544 66.9393 69.4567C42.9341 130.318 7.62718 41.1406 16.0509 21.4003Z\" fill=\"#39A4E9\"/>\n                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M50.3996 18.2053C62.6559 27.3185 98.6326 73.1854 35.508 90.6697C-27.6165 108.154 38.1433 9.09213 50.3996 18.2053Z\" fill=\"#5C20D2\"/>\n                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M27.7635 31.5357C41.3393 24.5311 98.3964 12.3499 86.4624 76.6666C74.5284 140.983 14.1877 38.5403 27.7635 31.5357Z\" fill=\"black\"/>\n                   </svg>\n                   <h2 class=\"col-lg-12 text-center font-purple font-bold mb-4 wow fadeInUp\">Our Mission</h2>\n             </div>\n     </div>\n\n     <div class=\"row py-5 mb-5\">\n            <div class=\"col-lg-6 text-center\">\n               <svg width=\"108\" height=\"109\" viewBox=\"0 0 108 109\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.0509 21.4003C24.4747 1.65994 90.9444 8.59544 66.9393 69.4567C42.9341 130.318 7.62718 41.1406 16.0509 21.4003Z\" fill=\"#39A4E9\"/>\n                   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M50.3996 18.2053C62.6559 27.3185 98.6326 73.1854 35.508 90.6697C-27.6165 108.154 38.1433 9.09213 50.3996 18.2053Z\" fill=\"#5C20D2\"/>\n                   <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M27.7635 31.5357C41.3393 24.5311 98.3964 12.3499 86.4624 76.6666C74.5284 140.983 14.1877 38.5403 27.7635 31.5357Z\" fill=\"black\"/>\n               </svg>\n               <h2 class=\"col-lg-12 text-center font-purple font-bold mb-4 wow fadeInUp\">Our Promises</h2>\n            </div>\n            <div class=\"col-lg-6 text-center mt-5\">\n                <p class=\"light-paragraph mt-5\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>\n            </div>\n   \n        </div>\n     \n </div>\n<section class=\"bg-black-dark mt-5\">\n <div class=\"container\">\n        <div class=\"row mb-5\">\n             <div class=\"pattern-up\"></div>\n            <div class=\"col-lg-5 py-4 d-flex justify-content-center flex-column text-center m-auto align-self-center\" >\n                <h2 class=\"mt-5 wow fadeInUp font-purple font-bold mb-5\" data-wow-duration=\"0.6s\" data-wow-delay=\"0.4s\">The Team</h2>\n                <p class=\"wow fadeInUp\" data-wow-duration=\".8s\" data-wow-delay=\"0.5s\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>\n            </div>\n            <div class=\"row col-lg-12 justify-content-center mt-5 mb-5\">\n            <div class=\"col-lg-4 col-12 text-center py-4 mb-5\">\n                <img src=\"assets/images/team.png\">\n                <p class=\"mt-3 my-0\">Ismael AlAkhras</p>\n                <div class=\"pb-4 blue-text\">Co-Founder and COO</div>\n            </div>\n            <div class=\"col-lg-4 col-12 text-center py-4 mb-5\">\n                <img src=\"assets/images/team.png\">\n                <p class=\"mt-3 my-0\">Bashayer AlSaqir</p>\n                <div class=\"pb-4 blue-text\">Founder and CEO</div>\n             </div>\n            </div>\n            <div class=\"pattern-down\"></div>\n\n        </div>\n\n    </div>\n</section>\n <div class=\"container py-5\">\n        <div class=\"row my-3\">\n            <div class=\"col-lg-12 d-flex justify-content-center flex-column text-center my-5\">\n                <button type=\"button\" class=\"btn btn-block btn-antim btn-rounded mx-auto py-3\" (click)=\"btnClick();\">Reach to Us</button>\n            </div>\n        </div>\n    </div>\n\n <footer class=\"footer py-5 bg-black\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col col-lg-2 col-12\">\n                        <img src=\"assets/images/logo.svg\" alt=\"antim\">\n\n                </div>\n                <div class=\"col col-lg-3 col-12\">\n                    <p class=\"copy-right pt-2\">2019 .All rights reserved. Smart Encryption Co.\n                        </p>\n                </div>\n                <div class=\"col col-lg-3 col-12\">\n                    <ul class=\"inline\">\n                        <li>\n                        <a href=\"#\">\n                        <svg width=\"37px\" height=\"37px\" viewBox=\"0 0 37 37\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                            <g id=\"landing-page\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                                <g id=\"HomeV2\" transform=\"translate(-648.000000, -5987.000000)\">\n                                    <g id=\"Group-10\" transform=\"translate(648.000000, 5987.000000)\">\n                                        <g id=\"Stacked-Group-4\">\n                                            <g id=\"Group-8\">\n                                                <rect id=\"Rectangle-Copy-3\" stroke=\"#F2F2F2\" x=\"0.5\" y=\"0.5\" width=\"36\" height=\"36\" rx=\"8\"></rect>\n                                                <g id=\"twitter\" transform=\"translate(8.000000, 10.000000)\" stroke=\"#FFFFFF\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\">\n                                                    <path d=\"M22,0.0102625429 C21.042385,0.68573995 19.9821079,1.20237179 18.86,1.54026254 C17.6263595,0.121800337 15.63837,-0.375623146 13.8820815,0.294715977 C12.125793,0.965055099 10.9748003,2.66056341 11,4.54026254 L11,5.54026254 C7.43066483,5.63281494 4.05202531,3.93223305 2,1.01026254 C2,1.01026254 -2,10.0102625 7,14.0102625 C4.94052756,15.4082289 2.48715691,16.1091919 0,16.0102625 C9,21.0102625 20,16.0102625 20,4.51026254 C19.9990791,4.23171618 19.9722975,3.95385694 19.92,3.68026254 C20.9406031,2.67375562 21.6608274,1.40297533 22,0.0102625429 Z\" id=\"Shape\"></path>\n                                                </g>\n                                            </g>\n                                        </g>\n                                    </g>\n                                </g>\n                            </g>\n                        </svg>\n                        </a>\n                        </li>\n                        <li>\n                            <a href=\"#\">\n\n                        <svg width=\"37px\" height=\"37px\" viewBox=\"0 0 37 37\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                            <g id=\"landing-page\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                                <g id=\"HomeV2\" transform=\"translate(-705.000000, -5987.000000)\">\n                                    <g id=\"Group-10\" transform=\"translate(648.000000, 5987.000000)\">\n                                        <g id=\"Stacked-Group-4\">\n                                            <g id=\"Group-7\" transform=\"translate(57.000000, 0.000000)\">\n                                                <rect id=\"Rectangle-Copy-2\" stroke=\"#F2F2F2\" x=\"0.5\" y=\"0.5\" width=\"36\" height=\"36\" rx=\"8\"></rect>\n                                                <g id=\"instagram\" transform=\"translate(9.000000, 9.000000)\" stroke=\"#FFFFFF\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\">\n                                                    <rect id=\"Rectangle-path\" x=\"0\" y=\"0\" width=\"20\" height=\"20\" rx=\"5\"></rect>\n                                                    <path d=\"M14,9.37 C14.2531224,11.0769716 13.3830258,12.7538445 11.8416265,13.5296738 C10.3002272,14.3055032 8.43504857,14.0053707 7.21483896,12.785161 C5.99462934,11.5649514 5.69449683,9.69977279 6.47032616,8.15837347 C7.24615548,6.61697416 8.92302841,5.74687756 10.63,6 C12.3729768,6.25846155 13.7415384,7.62702323 14,9.37 Z\" id=\"Shape\"></path>\n                                                </g>\n                                            </g>\n                                        </g>\n                                    </g>\n                                </g>\n                            </g>\n                        </svg>\n                            </a>\n                        </li>\n                        <li>\n                            <a href=\"#\">\n                            <svg width=\"37px\" height=\"37px\" viewBox=\"0 0 37 37\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                                <g id=\"landing-page\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                                    <g id=\"HomeV2\" transform=\"translate(-762.000000, -5987.000000)\">\n                                        <g id=\"Group-10\" transform=\"translate(648.000000, 5987.000000)\">\n                                            <g id=\"Stacked-Group-4\">\n                                                <g id=\"Group-6\" transform=\"translate(114.000000, 0.000000)\">\n                                                    <rect id=\"Rectangle\" stroke=\"#F2F2F2\" x=\"0.5\" y=\"0.5\" width=\"36\" height=\"36\" rx=\"8\"></rect>\n                                                    <g id=\"facebook\" transform=\"translate(13.000000, 9.000000)\" stroke=\"#FFFFFF\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\">\n                                                        <path d=\"M11,0 L8,0 C5.23857625,0 3,2.23857625 3,5 L3,8 L0,8 L0,12 L3,12 L3,20 L7,20 L7,12 L10,12 L11,8 L7,8 L7,5 C7,4.44771525 7.44771525,4 8,4 L11,4 L11,0 Z\" id=\"Shape\"></path>\n                                                    </g>\n                                                </g>\n                                            </g>\n                                        </g>\n                                    </g>\n                                </g>\n                            </svg>\n                            </a>\n                        </li>\n                    </ul>\n                </div>\n                <div class=\"col col-lg-4 col-12\">\n                    <form class=\"subscribtion-form\">\n                        <input type=\"email\" placeholder=\"enter your email here ...\">\n                        <button type=\"submit\" class=\"btn btn-block btn-antim btn-subscribe\">Subscribe</button>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </footer>"

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./component/component.module": [
		"./src/app/component/component.module.ts",
		"component-component-module"
	],
	"./starter/starter.module": [
		"./src/app/starter/starter.module.ts",
		"starter-starter-module"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: Approutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Approutes", function() { return Approutes; });
/* harmony import */ var _layouts_full_full_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layouts/full/full.component */ "./src/app/layouts/full/full.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sign-up/sign-up.component */ "./src/app/sign-up/sign-up.component.ts");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact/contact.component */ "./src/app/contact/contact.component.ts");
/* harmony import */ var _who_we_are_who_we_are_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./who-we-are/who-we-are.component */ "./src/app/who-we-are/who-we-are.component.ts");
/* harmony import */ var _dashbored_dashbored_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashbored/dashbored.component */ "./src/app/dashbored/dashbored.component.ts");
/* harmony import */ var _create_order_create_order_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./create-order/create-order.component */ "./src/app/create-order/create-order.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _requests_requests_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./requests/requests.component */ "./src/app/requests/requests.component.ts");
/* harmony import */ var _notification_notification_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./notification/notification.component */ "./src/app/notification/notification.component.ts");










var Approutes = [
    {
        path: '',
        component: _layouts_full_full_component__WEBPACK_IMPORTED_MODULE_0__["FullComponent"],
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            {
                path: 'home',
                loadChildren: './starter/starter.module#StarterModule'
            },
            {
                path: 'component',
                loadChildren: './component/component.module#ComponentsModule'
            },
            {
                path: 'login',
                component: _login_login_component__WEBPACK_IMPORTED_MODULE_1__["LoginComponent"]
            },
            {
                path: 'signup',
                component: _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_2__["SignUpComponent"]
            },
            {
                path: 'contact',
                component: _contact_contact_component__WEBPACK_IMPORTED_MODULE_3__["ContactComponent"]
            },
            {
                path: 'who-we-are',
                component: _who_we_are_who_we_are_component__WEBPACK_IMPORTED_MODULE_4__["WhoWeAreComponent"]
            },
            {
                path: 'dashbored',
                component: _dashbored_dashbored_component__WEBPACK_IMPORTED_MODULE_5__["DashboredComponent"]
            },
            {
                path: 'create-order',
                component: _create_order_create_order_component__WEBPACK_IMPORTED_MODULE_6__["CreateOrderComponent"]
            },
            {
                path: 'profile',
                component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_7__["ProfileComponent"]
            },
            {
                path: 'requests',
                component: _requests_requests_component__WEBPACK_IMPORTED_MODULE_8__["RequestsComponent"]
            }, {
                path: 'notification',
                component: _notification_notification_component__WEBPACK_IMPORTED_MODULE_9__["NotificationComponent"]
            },
        ]
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];


/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _layouts_full_full_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./layouts/full/full.component */ "./src/app/layouts/full/full.component.ts");
/* harmony import */ var _shared_header_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shared/header-navigation/navigation.component */ "./src/app/shared/header-navigation/navigation.component.ts");
/* harmony import */ var _shared_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared/sidebar/sidebar.component */ "./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var _shared_breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shared/breadcrumb/breadcrumb.component */ "./src/app/shared/breadcrumb/breadcrumb.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _shared_spinner_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/spinner.component */ "./src/app/shared/spinner.component.ts");
/* harmony import */ var _asymmetrik_ngx_leaflet__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @asymmetrik/ngx-leaflet */ "./node_modules/@asymmetrik/ngx-leaflet/dist/index.js");
/* harmony import */ var ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-perfect-scrollbar */ "./node_modules/ngx-perfect-scrollbar/dist/ngx-perfect-scrollbar.es5.js");
/* harmony import */ var ng2_sticky_nav__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ng2-sticky-nav */ "./node_modules/ng2-sticky-nav/dist/index.js");
/* harmony import */ var ng2_sticky_nav__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(ng2_sticky_nav__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./sign-up/sign-up.component */ "./src/app/sign-up/sign-up.component.ts");
/* harmony import */ var _contact_contact_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./contact/contact.component */ "./src/app/contact/contact.component.ts");
/* harmony import */ var _who_we_are_who_we_are_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./who-we-are/who-we-are.component */ "./src/app/who-we-are/who-we-are.component.ts");
/* harmony import */ var _dashbored_dashbored_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./dashbored/dashbored.component */ "./src/app/dashbored/dashbored.component.ts");
/* harmony import */ var _create_order_create_order_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./create-order/create-order.component */ "./src/app/create-order/create-order.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _requests_requests_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./requests/requests.component */ "./src/app/requests/requests.component.ts");
/* harmony import */ var _notification_notification_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./notification/notification.component */ "./src/app/notification/notification.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// import * as $ from 'jquery';































var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true,
    wheelSpeed: 1,
    wheelPropagation: true,
    minScrollbarLength: 20
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"],
                _shared_spinner_component__WEBPACK_IMPORTED_MODULE_14__["SpinnerComponent"],
                _layouts_full_full_component__WEBPACK_IMPORTED_MODULE_8__["FullComponent"],
                _shared_header_navigation_navigation_component__WEBPACK_IMPORTED_MODULE_9__["NavigationComponent"],
                _shared_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_10__["SidebarComponent"],
                _shared_breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_11__["BreadcrumbComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_18__["LoginComponent"],
                _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_19__["SignUpComponent"],
                _contact_contact_component__WEBPACK_IMPORTED_MODULE_20__["ContactComponent"],
                _who_we_are_who_we_are_component__WEBPACK_IMPORTED_MODULE_21__["WhoWeAreComponent"],
                _dashbored_dashbored_component__WEBPACK_IMPORTED_MODULE_22__["DashboredComponent"],
                _create_order_create_order_component__WEBPACK_IMPORTED_MODULE_23__["CreateOrderComponent"],
                _profile_profile_component__WEBPACK_IMPORTED_MODULE_25__["ProfileComponent"],
                _requests_requests_component__WEBPACK_IMPORTED_MODULE_26__["RequestsComponent"],
                _notification_notification_component__WEBPACK_IMPORTED_MODULE_27__["NotificationComponent"],
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _asymmetrik_ngx_leaflet__WEBPACK_IMPORTED_MODULE_15__["LeafletModule"].forRoot(),
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_24__["MatStepperModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_24__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_24__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_24__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_24__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_24__["MatAutocompleteModule"],
                ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_16__["PerfectScrollbarModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModule"].forRoot(),
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forRoot(_app_routing_module__WEBPACK_IMPORTED_MODULE_12__["Approutes"], { useHash: false }),
                ng2_sticky_nav__WEBPACK_IMPORTED_MODULE_17__["StickyNavModule"]
            ],
            providers: [
                {
                    provide: _angular_common__WEBPACK_IMPORTED_MODULE_2__["LocationStrategy"],
                    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_2__["PathLocationStrategy"]
                },
                {
                    provide: ngx_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_16__["PERFECT_SCROLLBAR_CONFIG"],
                    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/contact/contact.component.css":
/*!***********************************************!*\
  !*** ./src/app/contact/contact.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRhY3QvY29udGFjdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/contact/contact.component.ts":
/*!**********************************************!*\
  !*** ./src/app/contact/contact.component.ts ***!
  \**********************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContactComponent = /** @class */ (function () {
    function ContactComponent(fb) {
        this.fb = fb;
        this.currentJustify = 'start';
        this.currentOrientation = 'horizontal';
        this.disabledSubmitButton = true;
        this.contactForm = fb.group({
            'contactFormName': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            'contactFormEmail': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email])],
            'contactFormSubjects': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            'contactFormMessage': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            'contactFormCopy': [''],
            'contactFormPhone': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        this.leafletLayers = [Object(leaflet__WEBPACK_IMPORTED_MODULE_2__["tileLayer"])('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 7, attribution: '...' })];
        this.mapCenter = Object(leaflet__WEBPACK_IMPORTED_MODULE_2__["latLng"])(64.805606, 9.910027);
        this.zoomLevel = 5;
    }
    ContactComponent.prototype.oninput = function () {
        if (this.contactForm.valid) {
            this.disabledSubmitButton = false;
        }
    };
    ContactComponent.prototype.beforeChange = function ($event) {
        if ($event.nextId === 'tab-preventchange2') {
            $event.preventDefault();
        }
    };
    ContactComponent.prototype.ngOnInit = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('contact');
        window.dispatchEvent(new Event('resize'));
    };
    ContactComponent.prototype.ngOnDestroy = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('contact');
    };
    ContactComponent.prototype.onSubmit = function () {
        this.contactForm.reset();
        this.disabledSubmitButton = true;
    };
    ContactComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('input'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ContactComponent.prototype, "oninput", null);
    ContactComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contact',
            template: __webpack_require__(/*! raw-loader!./contact.component.html */ "./node_modules/raw-loader/index.js!./src/app/contact/contact.component.html"),
            styles: [__webpack_require__(/*! ./contact.component.css */ "./src/app/contact/contact.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], ContactComponent);
    return ContactComponent;
}());



/***/ }),

/***/ "./src/app/create-order/create-order.component.css":
/*!*********************************************************!*\
  !*** ./src/app/create-order/create-order.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NyZWF0ZS1vcmRlci9jcmVhdGUtb3JkZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/create-order/create-order.component.ts":
/*!********************************************************!*\
  !*** ./src/app/create-order/create-order.component.ts ***!
  \********************************************************/
/*! exports provided: CreateOrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateOrderComponent", function() { return CreateOrderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CreateOrderComponent = /** @class */ (function () {
    function CreateOrderComponent(_formBuilder, modalService) {
        this._formBuilder = _formBuilder;
        this.modalService = modalService;
        this.isEditable = false;
        this.disabledSubmitButton = true;
        this.disabledSubmitButtonSecond = true;
    }
    CreateOrderComponent.prototype.oninput = function () {
        if (this.firstFormGroup.valid) {
            this.disabledSubmitButton = false;
        }
        if (this.secondFormGroup.valid) {
            this.disabledSubmitButtonSecond = false;
        }
    };
    CreateOrderComponent.prototype.ngOnInit = function () {
        this.firstFormGroup = this._formBuilder.group({
            link1: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            link2: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            link3: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            firstCtrl: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        this.lastFormGroup = this._formBuilder.group({
            numberOfProduct: [''],
            TotalPrice: [''],
            InstallmentPeriod: [''],
            InstallmentPerMonth: [''],
            FinalProduct: ['']
        });
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('dashbored');
        body.classList.add('dashbored-home');
    };
    CreateOrderComponent.prototype.ngOnDestroy = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('dashbored');
        body.classList.remove('dashbored-home');
    };
    CreateOrderComponent.prototype.openVerticallyCentered = function (content3) {
        this.modalService.open(content3, { centered: true });
    };
    CreateOrderComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('input'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CreateOrderComponent.prototype, "oninput", null);
    CreateOrderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-order',
            template: __webpack_require__(/*! raw-loader!./create-order.component.html */ "./node_modules/raw-loader/index.js!./src/app/create-order/create-order.component.html"),
            styles: [__webpack_require__(/*! ./create-order.component.css */ "./src/app/create-order/create-order.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"]])
    ], CreateOrderComponent);
    return CreateOrderComponent;
}());



/***/ }),

/***/ "./src/app/dashbored/dashbored.component.css":
/*!***************************************************!*\
  !*** ./src/app/dashbored/dashbored.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib3JlZC9kYXNoYm9yZWQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/dashbored/dashbored.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashbored/dashbored.component.ts ***!
  \**************************************************/
/*! exports provided: DashboredComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboredComponent", function() { return DashboredComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboredComponent = /** @class */ (function () {
    function DashboredComponent() {
    }
    DashboredComponent.prototype.ngOnInit = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('dashbored');
        body.classList.add('dashbored-home');
    };
    DashboredComponent.prototype.ngOnDestroy = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('dashbored');
        body.classList.remove('dashbored-home');
    };
    DashboredComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashbored',
            template: __webpack_require__(/*! raw-loader!./dashbored.component.html */ "./node_modules/raw-loader/index.js!./src/app/dashbored/dashbored.component.html"),
            styles: [__webpack_require__(/*! ./dashbored.component.css */ "./src/app/dashbored/dashbored.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DashboredComponent);
    return DashboredComponent;
}());



/***/ }),

/***/ "./src/app/layouts/full/full.component.scss":
/*!**************************************************!*\
  !*** ./src/app/layouts/full/full.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dHMvZnVsbC9mdWxsLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/layouts/full/full.component.ts":
/*!************************************************!*\
  !*** ./src/app/layouts/full/full.component.ts ***!
  \************************************************/
/*! exports provided: FullComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullComponent", function() { return FullComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FullComponent = /** @class */ (function () {
    function FullComponent(router) {
        this.router = router;
        this.config = {};
        this.showMobileMenu = false;
        this.expandLogo = false;
        this.sidebartype = 'full';
        this.navbarOpen = false;
        this.isSticky = false;
        this.btnClick = function () {
            this.router.navigateByUrl('/signup');
        };
    }
    FullComponent.prototype.Logo = function () {
        this.expandLogo = !this.expandLogo;
    };
    FullComponent.prototype.ngOnInit = function () {
        if (this.router.url === '/') {
            this.router.navigate(['/home']);
        }
        this.defaultSidebar = this.sidebartype;
        this.handleSidebar();
    };
    FullComponent.prototype.checkScroll = function () {
        this.isSticky = window.pageYOffset >= 250;
    };
    FullComponent.prototype.onResize = function (event) {
        this.handleSidebar();
    };
    FullComponent.prototype.handleSidebar = function () {
        this.innerWidth = window.innerWidth;
        if (this.innerWidth < 1170) {
            this.sidebartype = 'mini-sidebar';
        }
        else {
            this.sidebartype = this.defaultSidebar;
        }
    };
    FullComponent.prototype.toggleSidebarType = function () {
        switch (this.sidebartype) {
            case 'full':
                this.sidebartype = 'mini-sidebar';
                break;
            case 'mini-sidebar':
                this.sidebartype = 'full';
                break;
            default:
        }
    };
    FullComponent.prototype.toggleNavbar = function () {
        this.navbarOpen = !this.navbarOpen;
    };
    FullComponent.prototype.closeMenu = function () {
        var isMobile = /iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Android/i.test(navigator.userAgent);
        if (isMobile) {
            this.navbarOpen = !this.navbarOpen;
        }
    };
    FullComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FullComponent.prototype, "checkScroll", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], FullComponent.prototype, "onResize", null);
    FullComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-full-layout',
            template: __webpack_require__(/*! raw-loader!./full.component.html */ "./node_modules/raw-loader/index.js!./src/app/layouts/full/full.component.html"),
            styles: [__webpack_require__(/*! ./full.component.scss */ "./src/app/layouts/full/full.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], FullComponent);
    return FullComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoginComponent = /** @class */ (function () {
    function LoginComponent() {
    }
    LoginComponent.prototype.ngOnInit = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('log-in');
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('log-in');
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/index.js!./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/notification/notification.component.css":
/*!*********************************************************!*\
  !*** ./src/app/notification/notification.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24uY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/notification/notification.component.ts":
/*!********************************************************!*\
  !*** ./src/app/notification/notification.component.ts ***!
  \********************************************************/
/*! exports provided: NotificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationComponent", function() { return NotificationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotificationComponent = /** @class */ (function () {
    function NotificationComponent() {
    }
    NotificationComponent.prototype.ngOnInit = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('dashbored');
        body.classList.add('notification');
    };
    NotificationComponent.prototype.ngOnDestroy = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('dashbored');
        body.classList.remove('notification');
    };
    NotificationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notification',
            template: __webpack_require__(/*! raw-loader!./notification.component.html */ "./node_modules/raw-loader/index.js!./src/app/notification/notification.component.html"),
            styles: [__webpack_require__(/*! ./notification.component.css */ "./src/app/notification/notification.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], NotificationComponent);
    return NotificationComponent;
}());



/***/ }),

/***/ "./src/app/profile/profile.component.css":
/*!***********************************************!*\
  !*** ./src/app/profile/profile.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/profile/profile.component.ts":
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(fb) {
        this.fb = fb;
        this.disabledButton = true;
        this.isShown = false; // hidden by default
        this.disabledBankButton = true;
        this.EditForm = fb.group({
            'Name': ['', { disabled: true }],
            'MobileNo': ['', { disabled: true }],
            'Email': ['', { disabled: true }],
            'NID': ['', { disabled: true }],
            'Address': ['', { disabled: true }]
        });
        this.BankInfoForm = fb.group({
            'BankName': [''],
            'BankAccount': [''],
            'EmailAdd': [''],
            'Iqama': [''],
        });
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('dashbored');
        body.classList.add('profile');
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('dashbored');
        body.classList.remove('profile');
    };
    ProfileComponent.prototype.EditInfo = function () {
        this.disabledButton = false;
    };
    ProfileComponent.prototype.SaveInfo = function () {
        this.disabledButton = true;
    };
    ProfileComponent.prototype.EditBankInfo = function () {
        this.disabledBankButton = false;
    };
    ProfileComponent.prototype.SaveBankInfo = function () {
        this.disabledBankButton = true;
    };
    ProfileComponent.prototype.onChange = function (deviceValue) {
        if (deviceValue == "Bank") {
            this.isShown = !this.isShown;
        }
        else {
            this.isShown = !this.isShown;
        }
    };
    ProfileComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }
    ]; };
    ProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! raw-loader!./profile.component.html */ "./node_modules/raw-loader/index.js!./src/app/profile/profile.component.html"),
            styles: [__webpack_require__(/*! ./profile.component.css */ "./src/app/profile/profile.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/requests/requests.component.css":
/*!*************************************************!*\
  !*** ./src/app/requests/requests.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlcXVlc3RzL3JlcXVlc3RzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/requests/requests.component.ts":
/*!************************************************!*\
  !*** ./src/app/requests/requests.component.ts ***!
  \************************************************/
/*! exports provided: RequestsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestsComponent", function() { return RequestsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ELEMENT_DATA = [
    { position: 1, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Ongoing' },
    { position: 2, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Reject' },
    { position: 3, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Under Review' },
    { position: 4, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Reject' },
    { position: 5, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Under Review' },
    { position: 6, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Wating your approval' },
    { position: 7, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Reject' },
    { position: 8, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Under Review' },
    { position: 9, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Wating your approval' },
    { position: 10, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Ongoing' },
    { position: 11, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Ongoing' },
    { position: 12, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Under Review' },
    { position: 13, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Wating your approval' },
    { position: 14, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Ongoing' },
    { position: 15, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Reject' },
    { position: 16, name: 'Sony Laptop. simply dummy text of the', date: '22 December 2018', value: '1700 SAR', status: 'Ongoing' },
];
var RequestsComponent = /** @class */ (function () {
    function RequestsComponent() {
        this.displayedColumns = ['select', 'position', 'name', 'weight', 'symbol'];
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](ELEMENT_DATA);
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__["SelectionModel"](true, []);
    }
    RequestsComponent.prototype.ngOnInit = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('dashbored');
        body.classList.add('requests');
    };
    RequestsComponent.prototype.ngOnDestroy = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('dashbored');
        body.classList.remove('requests');
    };
    RequestsComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    RequestsComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    /** The label for the checkbox on the passed row */
    RequestsComponent.prototype.checkboxLabel = function (row) {
        if (!row) {
            return (this.isAllSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    RequestsComponent.prototype.onChange = function (deviceValue) {
        this.dataSource.filter = deviceValue;
    };
    RequestsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-requests',
            template: __webpack_require__(/*! raw-loader!./requests.component.html */ "./node_modules/raw-loader/index.js!./src/app/requests/requests.component.html"),
            styles: [__webpack_require__(/*! ./requests.component.css */ "./src/app/requests/requests.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], RequestsComponent);
    return RequestsComponent;
}());



/***/ }),

/***/ "./src/app/shared/breadcrumb/breadcrumb.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/shared/breadcrumb/breadcrumb.component.ts ***!
  \***********************************************************/
/*! exports provided: BreadcrumbComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbComponent", function() { return BreadcrumbComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BreadcrumbComponent = /** @class */ (function () {
    function BreadcrumbComponent(router, activatedRoute, titleService) {
        var _this = this;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.titleService = titleService;
        this.router.events
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]; }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function () { return _this.activatedRoute; }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (route) {
            while (route.firstChild) {
                route = route.firstChild;
            }
            return route;
        }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (route) { return route.outlet === 'primary'; }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mergeMap"])(function (route) { return route.data; }))
            .subscribe(function (event) {
            _this.titleService.setTitle(event['title']);
            _this.pageInfo = event;
        });
    }
    BreadcrumbComponent.prototype.ngOnInit = function () { };
    BreadcrumbComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], BreadcrumbComponent.prototype, "layout", void 0);
    BreadcrumbComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-breadcrumb',
            template: __webpack_require__(/*! raw-loader!./breadcrumb.component.html */ "./node_modules/raw-loader/index.js!./src/app/shared/breadcrumb/breadcrumb.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"]])
    ], BreadcrumbComponent);
    return BreadcrumbComponent;
}());



/***/ }),

/***/ "./src/app/shared/header-navigation/navigation.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/shared/header-navigation/navigation.component.ts ***!
  \******************************************************************/
/*! exports provided: NavigationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationComponent", function() { return NavigationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavigationComponent = /** @class */ (function () {
    function NavigationComponent() {
        this.toggleSidebar = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.showSearch = false;
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], NavigationComponent.prototype, "toggleSidebar", void 0);
    NavigationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navigation',
            template: __webpack_require__(/*! raw-loader!./navigation.component.html */ "./node_modules/raw-loader/index.js!./src/app/shared/header-navigation/navigation.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], NavigationComponent);
    return NavigationComponent;
}());



/***/ }),

/***/ "./src/app/shared/sidebar/menu-items.ts":
/*!**********************************************!*\
  !*** ./src/app/shared/sidebar/menu-items.ts ***!
  \**********************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
var ROUTES = [
    {
        path: '/starter',
        title: 'Starter Page',
        icon: 'mdi mdi-file',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '',
        title: 'UI Components',
        icon: 'mdi mdi-dots-horizontal',
        class: 'nav-small-cap',
        extralink: true,
        submenu: []
    },
    {
        path: '/component/accordion',
        title: 'Accordion',
        icon: 'mdi mdi-equal',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/alert',
        title: 'Alert',
        icon: 'mdi mdi-message-bulleted',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/carousel',
        title: 'Carousel',
        icon: 'mdi mdi-view-carousel',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/dropdown',
        title: 'Dropdown',
        icon: 'mdi mdi-arrange-bring-to-front',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/modal',
        title: 'Modal',
        icon: 'mdi mdi-tablet',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/pagination',
        title: 'Pagination',
        icon: 'mdi mdi-backburger',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/poptool',
        title: 'Popover & Tooltip',
        icon: 'mdi mdi-image-filter-vintage',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/progressbar',
        title: 'Progressbar',
        icon: 'mdi mdi-poll',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/rating',
        title: 'Ratings',
        icon: 'mdi mdi-bandcamp',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/tabs',
        title: 'Tabs',
        icon: 'mdi mdi-sort-variant',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/timepicker',
        title: 'Timepicker',
        icon: 'mdi mdi-calendar-clock',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/buttons',
        title: 'Button',
        icon: 'mdi mdi-blur-radial',
        class: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/component/card',
        title: 'Card',
        icon: 'mdi mdi-arrange-bring-forward',
        class: '',
        extralink: false,
        submenu: []
    }
];


/***/ }),

/***/ "./src/app/shared/sidebar/sidebar.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/sidebar/sidebar.component.ts ***!
  \*****************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _menu_items__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu-items */ "./src/app/shared/sidebar/menu-items.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(modalService, router, route) {
        this.modalService = modalService;
        this.router = router;
        this.route = route;
        this.showMenu = '';
        this.showSubMenu = '';
    }
    // this is for the open close
    SidebarComponent.prototype.addExpandClass = function (element) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        }
        else {
            this.showMenu = element;
        }
    };
    // End open close
    SidebarComponent.prototype.ngOnInit = function () {
        this.sidebarnavItems = _menu_items__WEBPACK_IMPORTED_MODULE_1__["ROUTES"].filter(function (sidebarnavItem) { return sidebarnavItem; });
    };
    SidebarComponent.ctorParameters = function () { return [
        { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
    ]; };
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! raw-loader!./sidebar.component.html */ "./node_modules/raw-loader/index.js!./src/app/shared/sidebar/sidebar.component.html")
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/shared/spinner.component.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/spinner.component.ts ***!
  \*********************************************/
/*! exports provided: SpinnerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpinnerComponent", function() { return SpinnerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent(router, document) {
        var _this = this;
        this.router = router;
        this.document = document;
        this.isSpinnerVisible = true;
        this.backgroundColor = 'rgba(0, 115, 170, 0.69)';
        this.router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationStart"]) {
                _this.isSpinnerVisible = true;
            }
            else if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"] ||
                event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationCancel"] ||
                event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationError"]) {
                _this.isSpinnerVisible = false;
            }
        }, function () {
            _this.isSpinnerVisible = false;
        });
    }
    SpinnerComponent.prototype.ngOnDestroy = function () {
        this.isSpinnerVisible = false;
    };
    SpinnerComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: Document, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"],] }] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], SpinnerComponent.prototype, "backgroundColor", void 0);
    SpinnerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-spinner',
            template: "<div class=\"preloader\" *ngIf=\"isSpinnerVisible\">\n        <div class=\"spinner\">\n          <div class=\"double-bounce1\"></div>\n          <div class=\"double-bounce2\"></div>\n        </div>\n    </div>",
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            Document])
    ], SpinnerComponent);
    return SpinnerComponent;
}());



/***/ }),

/***/ "./src/app/sign-up/sign-up.component.css":
/*!***********************************************!*\
  !*** ./src/app/sign-up/sign-up.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NpZ24tdXAvc2lnbi11cC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/sign-up/sign-up.component.ts":
/*!**********************************************!*\
  !*** ./src/app/sign-up/sign-up.component.ts ***!
  \**********************************************/
/*! exports provided: SignUpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpComponent", function() { return SignUpComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(fb) {
        this.fb = fb;
        this.disabledNextButton = true;
        this.disabledSubmitButton = true;
        this.showSelected = false;
        this.sheckMobileStep = false;
        this.lastStep = false;
        this.SigUpForm = fb.group({
            'FirstName': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            'NID': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            'email': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email])],
            'phone': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
    }
    SignUpComponent.prototype.oninput = function () {
        if (this.SigUpForm.valid) {
            this.disabledSubmitButton = false;
        }
    };
    SignUpComponent.prototype.ngOnInit = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('log-in');
    };
    SignUpComponent.prototype.ngOnDestroy = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('log-in');
    };
    SignUpComponent.prototype.addClass = function (id) {
        this.id = id;
        if (this.disabledNextButton) {
            this.disabledNextButton = false;
        }
    };
    SignUpComponent.prototype.Nextstep = function () {
        this.showSelected = !this.showSelected;
    };
    SignUpComponent.prototype.PrevStep = function () {
        this.showSelected = !this.showSelected;
    };
    SignUpComponent.prototype.thirdStep = function () {
        this.sheckMobileStep = !this.sheckMobileStep;
    };
    SignUpComponent.prototype.lastStepd = function () {
        this.lastStep = !this.lastStep;
    };
    SignUpComponent.prototype.closeBack = function () {
        this.showSelected = false;
        this.sheckMobileStep = false;
    };
    SignUpComponent.prototype.closeBackLast = function () {
        this.showSelected = false;
        this.sheckMobileStep = false;
        this.lastStep = false;
    };
    SignUpComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('input'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SignUpComponent.prototype, "oninput", null);
    SignUpComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sign-up',
            template: __webpack_require__(/*! raw-loader!./sign-up.component.html */ "./node_modules/raw-loader/index.js!./src/app/sign-up/sign-up.component.html"),
            styles: [__webpack_require__(/*! ./sign-up.component.css */ "./src/app/sign-up/sign-up.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], SignUpComponent);
    return SignUpComponent;
}());



/***/ }),

/***/ "./src/app/who-we-are/who-we-are.component.css":
/*!*****************************************************!*\
  !*** ./src/app/who-we-are/who-we-are.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3doby13ZS1hcmUvd2hvLXdlLWFyZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/who-we-are/who-we-are.component.ts":
/*!****************************************************!*\
  !*** ./src/app/who-we-are/who-we-are.component.ts ***!
  \****************************************************/
/*! exports provided: WhoWeAreComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhoWeAreComponent", function() { return WhoWeAreComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WhoWeAreComponent = /** @class */ (function () {
    function WhoWeAreComponent(router) {
        this.router = router;
        this.btnClick = function () {
            this.router.navigateByUrl('/contact');
        };
    }
    WhoWeAreComponent.prototype.ngOnInit = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('contact');
    };
    WhoWeAreComponent.prototype.ngOnDestroy = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('contact');
    };
    WhoWeAreComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
    ]; };
    WhoWeAreComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-who-we-are',
            template: __webpack_require__(/*! raw-loader!./who-we-are.component.html */ "./node_modules/raw-loader/index.js!./src/app/who-we-are/who-we-are.component.html"),
            styles: [__webpack_require__(/*! ./who-we-are.component.css */ "./src/app/who-we-are/who-we-are.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], WhoWeAreComponent);
    return WhoWeAreComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/rehamhabbas/Antim/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map