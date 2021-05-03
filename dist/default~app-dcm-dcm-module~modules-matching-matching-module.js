(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~app-dcm-dcm-module~modules-matching-matching-module"],{

/***/ "./src/app/dcm/modules/matching/components/matching-grid.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/dcm/modules/matching/components/matching-grid.component.ts ***!
  \****************************************************************************/
/*! exports provided: MatchingGridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchingGridComponent", function() { return MatchingGridComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_dcm_modules_matching_popups_search_matching_popup_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/dcm/modules/matching/popups/search-matching-popup.component */ "./src/app/dcm/modules/matching/popups/search-matching-popup.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MatchingGridComponent = /** @class */ (function () {
    function MatchingGridComponent(dialog) {
        this.dialog = dialog;
    }
    MatchingGridComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(_app_dcm_modules_matching_popups_search_matching_popup_component__WEBPACK_IMPORTED_MODULE_2__["SearchMatchingPopupComponent"], {
            width: '98%',
            data: {},
            position: { top: '80px' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    MatchingGridComponent.prototype.ngOnInit = function () {
        this.datasource = [{
                name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
                currency: 'EUR', occupancy: '', note: '', status: ''
            }, {
                name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
                currency: 'EUR', occupancy: '', note: '', status: ''
            }, {
                name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
                currency: 'EUR', occupancy: '', note: '', status: ''
            }, {
                name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
                currency: 'EUR', occupancy: '', note: '', status: ''
            }, {
                name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
                currency: 'EUR', occupancy: '', note: '', status: ''
            }, {
                name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
                currency: 'EUR', occupancy: '', note: '', status: ''
            }, {
                name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
                currency: 'EUR', occupancy: '', note: '', status: ''
            }, {
                name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
                currency: 'EUR', occupancy: '', note: '', status: ''
            }, {
                name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
                currency: 'EUR', occupancy: '', note: '', status: ''
            }, {
                name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
                currency: 'EUR', occupancy: '', note: '', status: ''
            }, {
                name: 'test', country: 'France', address: 'Paris', distance: '5km', accuracy: '',
                currency: 'EUR', occupancy: '', note: '', status: ''
            }];
        this.totalRecords = this.datasource.length;
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'country', header: 'Country' },
            { field: 'address', header: 'Address' },
            { field: 'distance', header: 'Distance' },
            { field: 'accuracy', header: 'Accuracy' },
            { field: 'pd', header: 'PD' },
            { field: 'currency', header: 'Currency' },
            { field: 'occupancy', header: 'Occupancy' },
            { field: 'note', header: 'Note' },
        ];
        this.scrollableCols = [
            { field: 'name', header: 'Name' },
            { field: 'country', header: 'Country' },
            { field: 'address', header: 'Address' },
            { field: 'distance', header: 'Distance' },
            { field: 'accuracy', header: 'Accuracy' },
            { field: 'pd', header: 'PD' },
            { field: 'currency', header: 'Currency' },
            { field: 'occupancy', header: 'Occupancy' },
            { field: 'note', header: 'Note' },
        ];
        this.frozenCols = [];
        this.loading = false;
    };
    MatchingGridComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'matching-grid-component',
            template: "\n    <p-table [columns]=\"scrollableCols\" [value]=\"datasource\" [scrollable]=\"true\"\n             scrollHeight=\"380px\">\n      <ng-template pTemplate=\"colgroup\" let-columns>\n        <colgroup>\n          <col *ngFor=\"let col of columns\">\n        </colgroup>\n      </ng-template>\n      <ng-template pTemplate=\"header\" let-columns>\n        <tr>\n          <th class=\"td-th-center\"></th>\n          <th class=\"td-th-center\"></th>\n          <th *ngFor=\"let col of columns\">\n            {{col.header}}\n          </th>\n          <th class=\"td-th-center\">Status</th>\n        </tr>\n      </ng-template>\n      <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n\n        <tr>\n          <td class=\"td-th-center\"><label nz-checkbox [(ngModel)]=\"checked\"></label></td>\n          <td class=\"td-th-center\"><i class=\"fas fa-plus\" style=\"color: deepskyblue;\"></i></td>\n          <td *ngFor=\"let col of columns\" style=\"text-align: center;\">\n            {{rowData[col.field]}}\n          </td>\n          <td class=\"td-th-center\"><a (click)=\"openDialog()\"><i class=\"fas fa-globe\"\n                                                                style=\"color: deepskyblue;\"></i></a></td>\n        </tr>\n      </ng-template>\n    </p-table>\n  ",
            styles: ["\n    .td-th-center {\n      width: 40px;\n      text-align: center;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], MatchingGridComponent);
    return MatchingGridComponent;
}());



/***/ }),

/***/ "./src/app/dcm/modules/matching/matching-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/dcm/modules/matching/matching-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: MatchingRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchingRoutingModule", function() { return MatchingRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _matching_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./matching.component */ "./src/app/dcm/modules/matching/matching.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _matching_component__WEBPACK_IMPORTED_MODULE_2__["MatchingComponent"],
        data: { title: 'Matching' }
    },
];
var MatchingRoutingModule = /** @class */ (function () {
    function MatchingRoutingModule() {
    }
    MatchingRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], MatchingRoutingModule);
    return MatchingRoutingModule;
}());



/***/ }),

/***/ "./src/app/dcm/modules/matching/matching.component.ts":
/*!************************************************************!*\
  !*** ./src/app/dcm/modules/matching/matching.component.ts ***!
  \************************************************************/
/*! exports provided: MatchingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchingComponent", function() { return MatchingComponent; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MatchingComponent = /** @class */ (function () {
    function MatchingComponent(store, cdrf) {
        this.store = store;
        this.cdrf = cdrf;
        this.indicators = [
            { value: 'Not in escape', color: '#c48888' },
            { value: 'Hidden', color: '#a6a6a6' },
            { value: 'Manuel', color: '#ffa500' },
            { value: 'Auto', color: '#b1ffb1' },
            { value: 'Matched', color: '#008200' }
        ];
    }
    MatchingComponent.prototype.ngOnInit = function () {
    };
    MatchingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'uplaod-main',
            template: "\n    <div class=\"row mt-1 ml-1 mr-1 mb-1\">\n      <div class=\"col-md-12\">\n        <div class=\"row\">\n\n          <div class=\"col-md-6\">\n            <div class=\"row\">\n              <div class=\"col-md-4\" style=\"font-weight: bold; font-size: small;\">\n                Matching parameters\n              </div>\n              <div class=\"col-md-8\">\n                <table style=\"float: left; margin-left: -64px;\">\n                  <tr>\n                    <td *ngFor=\"let indicator of indicators\">\n                      <table>\n                        <tr>\n                          <td>\n                            <div [style.background]=\"indicator.color\" class=\"div-color\"></div>\n                          </td>\n                          <td> {{indicator.value}}\n                          </td>\n                        </tr>\n                      </table>\n                    </td>\n                  </tr>\n                </table>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"col-md-6\" style=\"font-weight: bold;\">\n            Matching Algorithm Result\n          </div>\n        </div>\n        <br>\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            Matching scope ( Number of location ) /\n          </div>\n          <div class=\"col-md-6\">\n            Insured value (%)\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            <nz-row>\n              <nz-col nzSpan=\"16\">\n                <nz-slider [nzMin]=\"1\" [nzMax]=\"100\" [(ngModel)]=\"value1\"></nz-slider>\n              </nz-col>\n              <div nz-col nzSpan=\"3\">\n                <nz-input-number [nzMin]=\"1\" [nzMax]=\"100\" [ngStyle]=\"{ 'marginLeft': '16px' }\"\n                                 [(ngModel)]=\"value1\" [nzSize]=\"'small'\"></nz-input-number>\n              </div>\n            </nz-row>\n          </div>\n          <div class=\"col-md-6\">\n            <nz-row>\n              <nz-col nzSpan=\"24\">\n                <nz-slider [nzDefaultValue]=\"100\" [nzDisabled]=\"true\"></nz-slider>\n              </nz-col>\n            </nz-row>\n          </div>\n        </div>\n        <br>\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            Matching acceptance criteria (%)\n          </div>\n          <div class=\"col-md-6\">\n            Number of location (%)\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            <nz-row>\n              <nz-col nzSpan=\"16\">\n                <nz-slider nzRange [nzDefaultValue]=\"[20, 50]\"></nz-slider>\n              </nz-col>\n            </nz-row>\n          </div>\n          <div class=\"col-md-6\">\n            <nz-row>\n              <nz-col nzSpan=\"12\">\n                <nz-slider [nzDefaultValue]=\"100\" [nzDisabled]=\"true\"></nz-slider>\n              </nz-col>\n            </nz-row>\n          </div>\n        </div>\n        <div class=\"row mt-2 mb-2\">\n          <div class=\"col-md-3\">\n            <button nz-button nzType=\"primary\" [nzSize]=\"'omitted'\"><i class=\"fas fa-retweet\"></i> Restart matching\n            </button>\n\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <nz-divider style=\"font-weight: bold;\"></nz-divider>\n      </div>\n    </div>\n\n    <div class=\"row mb-1\">\n      <div class=\"col-md-6\"></div>\n      <div class=\"col-md-2\">Percent of scope matched</div>\n      <div class=\"col-md-2\">Number of locations</div>\n      <div class=\"col-md-2\">TIV</div>\n    </div>\n    <div class=\"row ml-0 mr-0\">\n      <div class=\"col-md-12\">\n        <matching-grid-component></matching-grid-component>\n      </div>\n    </div>\n  ",
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: ["\n    .ant-btn-primary {\n      color: #fff;\n      background-color: #005373;\n      border-color: #005373;\n    }\n\n    nz-divider.ant-divider.ant-divider-horizontal {\n      height: 2px !important;\n    }\n\n    .div-color {\n      width: 10px;\n      height: 10px;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["Store"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]])
    ], MatchingComponent);
    return MatchingComponent;
}());



/***/ }),

/***/ "./src/app/dcm/modules/matching/matching.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/dcm/modules/matching/matching.module.ts ***!
  \*********************************************************/
/*! exports provided: MatchingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatchingModule", function() { return MatchingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/shared */ "./src/app/shared/index.ts");
/* harmony import */ var _matching_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./matching-routing.module */ "./src/app/dcm/modules/matching/matching-routing.module.ts");
/* harmony import */ var _matching_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./matching.component */ "./src/app/dcm/modules/matching/matching.component.ts");
/* harmony import */ var _app_dcm_modules_matching_components_matching_grid_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/dcm/modules/matching/components/matching-grid.component */ "./src/app/dcm/modules/matching/components/matching-grid.component.ts");
/* harmony import */ var _app_dcm_modules_matching_popups_search_matching_popup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/dcm/modules/matching/popups/search-matching-popup.component */ "./src/app/dcm/modules/matching/popups/search-matching-popup.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// import { FeaturesComponent } from './features/features.component';
var MatchingModule = /** @class */ (function () {
    function MatchingModule() {
    }
    MatchingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_matching_component__WEBPACK_IMPORTED_MODULE_3__["MatchingComponent"], _app_dcm_modules_matching_components_matching_grid_component__WEBPACK_IMPORTED_MODULE_4__["MatchingGridComponent"], _app_dcm_modules_matching_popups_search_matching_popup_component__WEBPACK_IMPORTED_MODULE_5__["SearchMatchingPopupComponent"]],
            imports: [_app_shared__WEBPACK_IMPORTED_MODULE_1__["SharedModule"], _matching_routing_module__WEBPACK_IMPORTED_MODULE_2__["MatchingRoutingModule"]],
            exports: [_app_dcm_modules_matching_popups_search_matching_popup_component__WEBPACK_IMPORTED_MODULE_5__["SearchMatchingPopupComponent"]],
            entryComponents: [
                _app_dcm_modules_matching_popups_search_matching_popup_component__WEBPACK_IMPORTED_MODULE_5__["SearchMatchingPopupComponent"]
            ]
        })
    ], MatchingModule);
    return MatchingModule;
}());



/***/ }),

/***/ "./src/app/dcm/modules/matching/popups/search-matching-popup.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/dcm/modules/matching/popups/search-matching-popup.component.ts ***!
  \********************************************************************************/
/*! exports provided: SearchMatchingPopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchMatchingPopupComponent", function() { return SearchMatchingPopupComponent; });
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchMatchingPopupComponent = /** @class */ (function () {
    function SearchMatchingPopupComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    SearchMatchingPopupComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    SearchMatchingPopupComponent.prototype.ngOnInit = function () {
        this.datasource = [];
        this.totalRecords = this.datasource.length;
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'externalKey', header: 'External Key' },
            { field: 'country', header: 'Country' },
            { field: 'address', header: 'Address' },
            { field: 'distance', header: 'Distance (m)' },
            { field: 'pd', header: 'PD(USD)' },
            { field: 'occupancy', header: 'Occupancy' },
            { field: 'pricingCategory', header: 'Pricing Category' },
        ];
        this.scrollableCols = [
            { field: 'name', header: 'Name' },
            { field: 'externalKey', header: 'External Key' },
            { field: 'country', header: 'Country' },
            { field: 'address', header: 'Address' },
            { field: 'distance', header: 'Distance (m)' },
            { field: 'pd', header: 'PD(USD)' },
            { field: 'occupancy', header: 'Occupancy' },
            { field: 'pricingCategory', header: 'Pricing Category' },
        ];
        this.frozenCols = [];
        this.loading = false;
    };
    SearchMatchingPopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'dialog-overview-example-dialog',
            template: "\n    <div style=\"font-size: small;\">\n      <div class=\"row\">\n        <div class=\"col-md-3\">\n          <span style=\"font-weight: bold;\">Search Matching</span>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-2\">\n          <nz-divider style=\"margin-top: 8px;\" class=\"ant-divider-horizontal-first\"></nz-divider>\n        </div>\n      </div>\n      <br>\n      <div class=\"row\" style=\"margin-top: -10px;\">\n        <div class=\"col-md-1\">\n          Name:\n        </div>\n        <div class=\"col-md-2\">\n          <input nz-input placeholder=\"Name\" [nzSize]=\"'small'\">\n        </div>\n        <div class=\"col-md-1\">\n          Country:\n        </div>\n        <div class=\"col-md-2\">\n          <nz-select style=\"width: 100%;\" [nzSize]=\"'small'\" nzShowSearch nzAllowClear nzPlaceHolder=\"Country\"\n                     [(ngModel)]=\"selectedValue\">\n            <nz-option nzLabel=\"FRANCE\" nzValue=\"FRANCE\"></nz-option>\n            <nz-option nzLabel=\"US\" nzValue=\"US\"></nz-option>\n          </nz-select>\n        </div>\n        <div class=\"col-md-1\">\n          PD Value:\n        </div>\n        <div class=\"col-md-1\">\n          <nz-input-number [nzSize]=\"'small'\" [(ngModel)]=\"y\" [nzMin]=\"1\" [nzMax]=\"10\" [nzStep]=\"1\"\n                           nzPlaceHolder=\"Min\"></nz-input-number>\n        </div>\n        <div class=\"col-md-1\">\n          <nz-input-number [nzSize]=\"'small'\" [(ngModel)]=\"x\" [nzMin]=\"1\" [nzMax]=\"10\" [nzStep]=\"1\"\n                           nzPlaceHolder=\"Max\"></nz-input-number>\n        </div>\n        <div class=\"col-md-1\">\n          Currency:\n        </div>\n        <div class=\"col-md-2\">\n          <nz-select style=\"width: 100%;\" [nzSize]=\"'small'\" nzShowSearch nzAllowClear nzPlaceHolder=\"Currency\"\n                     [(ngModel)]=\"selectedValue\">\n            <nz-option nzLabel=\"EUR\" nzValue=\"EUR\"></nz-option>\n            <nz-option nzLabel=\"USD\" nzValue=\"USD\"></nz-option>\n          </nz-select>\n        </div>\n      </div>\n\n      <div class=\"row mt-2\">\n        <div class=\"col-md-1\">\n          Occupancy:\n        </div>\n        <div class=\"col-md-2\">\n          <input nz-input placeholder=\"Name\" [nzSize]=\"'small'\">\n        </div>\n        <div class=\"col-md-1\" style=\"white-space: nowrap;\">\n          Pricing category:\n        </div>\n        <div class=\"col-md-2\">\n          <nz-select style=\"width: 100%;\" [nzSize]=\"'small'\" nzShowSearch nzAllowClear nzPlaceHolder=\"Country\"\n                     [(ngModel)]=\"selectedValue\">\n            <nz-option nzLabel=\"FRANCE\" nzValue=\"FRANCE\"></nz-option>\n            <nz-option nzLabel=\"US\" nzValue=\"US\"></nz-option>\n          </nz-select>\n        </div>\n        <div class=\"col-md-2\">\n          Pricing sub category:\n        </div>\n        <div class=\"col-md-4\">\n          <nz-select style=\"width: 100%;\" [nzSize]=\"'small'\" nzShowSearch nzAllowClear nzPlaceHolder=\"Currency\"\n                     [(ngModel)]=\"selectedValue\">\n            <nz-option nzLabel=\"EUR\" nzValue=\"EUR\"></nz-option>\n            <nz-option nzLabel=\"USD\" nzValue=\"USD\"></nz-option>\n          </nz-select>\n        </div>\n      </div>\n      <div class=\"row mt-2\">\n        <div class=\"col-md-1\">\n          Name:\n        </div>\n        <div class=\"col-md-2\">\n          <input nz-input placeholder=\"Name\" [nzSize]=\"'small'\">\n        </div>\n      </div>\n      <div class=\"row mt-2\">\n        <div class=\"col-md-10\">\n        </div>\n        <div class=\"col-md-1\" style=\"float: right;\">\n          <button style=\"background-color: #FF6666; border-color: #FF6666;\"\n                  [nzSize]=\"'small'\" nz-button nzType=\"primary\"><i class=\"fas fa-retweet\"></i> Reset\n          </button>\n        </div>\n        <div class=\"col-md-1\">\n          <button style=\"background-color: #005373; border-color: #005373;\"\n                  [nzSize]=\"'small'\" nz-button nzType=\"primary\"><i class=\"fas fa-search\"></i> Search\n          </button>\n        </div>\n      </div>\n      <nz-divider></nz-divider>\n      <p-table [columns]=\"scrollableCols\" [value]=\"datasource\" [scrollable]=\"true\"\n               scrollHeight=\"380px\">\n        <ng-template pTemplate=\"colgroup\" let-columns>\n          <colgroup>\n            <col *ngFor=\"let col of columns\">\n          </colgroup>\n        </ng-template>\n        <ng-template pTemplate=\"header\" let-columns>\n          <tr>\n            <th *ngFor=\"let col of columns\">\n              {{col.header}}\n            </th>\n          </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n\n          <tr>\n            <td *ngFor=\"let col of columns\" style=\"text-align: center;\">\n              {{rowData[col.field]}}\n            </td>\n          </tr>\n        </ng-template>\n      </p-table>\n      <div class=\"row mt-2\">\n        <div class=\"col-md-10\">\n        </div>\n        <div class=\"col-md-1\" style=\"float: right;\">\n          <button style=\"background-color: #FF6666; border-color: #FF6666;\"\n                  [nzSize]=\"'small'\" nz-button nzType=\"primary\">\n            <i class=\"fas fa-times\"></i> Cancel\n          </button>\n        </div>\n        <div class=\"col-md-1\">\n          <button style=\"background-color: #005373; border-color: #005373;\" [nzSize]=\"'small'\" nz-button\n                  nzType=\"primary\">\n            <i class=\"fas fa-fingerprint\"></i> Match\n          </button>\n        </div>\n      </div>\n    </div>\n  ",
            styles: ["\n    ::ng-deep .ant-divider-horizontal-first {\n      display: block;\n      height: 1px;\n      width: 80%;\n      min-width: 80%;\n      margin: 24px 0;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"]])
    ], SearchMatchingPopupComponent);
    return SearchMatchingPopupComponent;
}());



/***/ })

}]);
//# sourceMappingURL=default~app-dcm-dcm-module~modules-matching-matching-module.js.map