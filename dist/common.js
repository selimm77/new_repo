(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/dcm/modules/administration/services/config.service.ts":
/*!***********************************************************************!*\
  !*** ./src/app/dcm/modules/administration/services/config.service.ts ***!
  \***********************************************************************/
/*! exports provided: ConfigAdminService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigAdminService", function() { return ConfigAdminService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConfigAdminService = /** @class */ (function () {
    function ConfigAdminService(http) {
        this.http = http;
    }
    ConfigAdminService.prototype.getCategories = function (lob) {
        return this.http.get(_env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endPoints.setting + '/lobs/' + lob.id + '/categories');
    };
    ConfigAdminService.prototype.getFields = function (lob) {
        return this.http.get(_env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endPoints.setting + '/lobs/' + lob.id + '/fields');
    };
    ConfigAdminService.prototype.getDatacheckforType = function (type) {
        return this.http.get(_env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endPoints.setting + '/datatypes/' + type + '/checkrules');
    };
    ConfigAdminService.prototype.getLobs = function () {
        return this.http.get(_env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endPoints.setting + '/lobs');
    };
    ConfigAdminService.prototype.getCollections = function () {
        return this.http.get(_env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endPoints.setting + '/references');
    };
    ConfigAdminService.prototype.getDatatypes = function () {
        return this.http.get(_env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endPoints.setting + '/datatypes');
    };
    ConfigAdminService.prototype.validate = function (field) {
        return this.http.post(_env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endPoints.validate + '/lobs/' + field.lob.id + '/fields', field, { observe: 'response' })
            .toPromise().then(function (response) {
            if (response.status === 400 || response.status === 200) {
                return response;
            }
        });
    };
    ConfigAdminService.prototype.validateDatcheck = function (ds) {
        return this.http.post(_env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endPoints.validate + '/checkrule', ds, { observe: 'response' })
            .toPromise().then(function (response) {
            if (response.status === 400 || response.status === 200) {
                return response;
            }
        });
    };
    ConfigAdminService.prototype.validateGroup = function (lob, group) {
        return this.http.post(_env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endPoints.validate + '/lobs/' + lob + '/categories', group, { observe: 'response' })
            .toPromise().then(function (response) {
            if (response.status === 400 || response.status === 200) {
                return response;
            }
        });
    };
    ConfigAdminService.prototype.saveGroups = function (groups, lob) {
        return this.http.post(_env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endPoints.setting + '/lobs/' + lob.id + '/bulk/categories', {
            categories: groups
        }, { observe: 'response' })
            .toPromise().then(function (response) {
            if (response.status === 400 || response.status === 200) {
                return response;
            }
        });
    };
    ConfigAdminService.prototype.saveFields = function (field, lob) {
        return this.http.post(_env_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endPoints.setting + '/lobs/' + lob.id + '/fields', {
            "fields": field
        }, { observe: 'response' })
            .toPromise().then(function (response) {
            if (response.status === 400 || response.status === 200) {
                return response;
            }
        });
    };
    ConfigAdminService.prototype.saveDatachecks = function (groups) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(true);
    };
    ConfigAdminService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ConfigAdminService);
    return ConfigAdminService;
}());



/***/ }),

/***/ "./src/app/dcm/modules/administration/store/configadmin.selectors.ts":
/*!***************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/store/configadmin.selectors.ts ***!
  \***************************************************************************/
/*! exports provided: selectConfigField, selectLob, selectDatachecks, selectFields, selectGroups, selectDone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectConfigField", function() { return selectConfigField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectLob", function() { return selectLob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDatachecks", function() { return selectDatachecks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectFields", function() { return selectFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectGroups", function() { return selectGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDone", function() { return selectDone; });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _app_dcm_store_dcm_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/dcm/store/dcm.selectors */ "./src/app/dcm/store/dcm.selectors.ts");


var selectConfigField = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(_app_dcm_store_dcm_selectors__WEBPACK_IMPORTED_MODULE_1__["selectConfigState"], function (state) { return state.field; });
var selectLob = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectConfigField, function (configadminState) { return configadminState.lob; });
var selectDatachecks = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectConfigField, function (configadminState) { return configadminState.datachecksAdded; });
var selectFields = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectConfigField, function (configadminState) { return configadminState.fieldsAdded; });
var selectGroups = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectConfigField, function (configadminState) { return configadminState.groupsAdded; });
var selectDone = Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(selectConfigField, function (configadminState) { return configadminState.doneGroup; });


/***/ }),

/***/ "./src/app/dcm/modules/locations/components/current-locations-grid/current-locations-grid.component.css":
/*!**************************************************************************************************************!*\
  !*** ./src/app/dcm/modules/locations/components/current-locations-grid/current-locations-grid.component.css ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RjbS9tb2R1bGVzL2xvY2F0aW9ucy9jb21wb25lbnRzL2N1cnJlbnQtbG9jYXRpb25zLWdyaWQvY3VycmVudC1sb2NhdGlvbnMtZ3JpZC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/dcm/modules/locations/components/current-locations-grid/current-locations-grid.component.html":
/*!***************************************************************************************************************!*\
  !*** ./src/app/dcm/modules/locations/components/current-locations-grid/current-locations-grid.component.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"height:100%\">\r\n  <div fxFlex=\"100\">\r\n    <anms-shared-location-grid [editable]=\"true\"></anms-shared-location-grid>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/dcm/modules/locations/components/current-locations-grid/current-locations-grid.component.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/app/dcm/modules/locations/components/current-locations-grid/current-locations-grid.component.ts ***!
  \*************************************************************************************************************/
/*! exports provided: CurrentLocationsGridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrentLocationsGridComponent", function() { return CurrentLocationsGridComponent; });
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

var CurrentLocationsGridComponent = /** @class */ (function () {
    function CurrentLocationsGridComponent() {
    }
    CurrentLocationsGridComponent.prototype.ngOnInit = function () {
    };
    CurrentLocationsGridComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'anms-current-locations-grid',
            template: __webpack_require__(/*! ./current-locations-grid.component.html */ "./src/app/dcm/modules/locations/components/current-locations-grid/current-locations-grid.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./current-locations-grid.component.css */ "./src/app/dcm/modules/locations/components/current-locations-grid/current-locations-grid.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CurrentLocationsGridComponent);
    return CurrentLocationsGridComponent;
}());



/***/ }),

/***/ "./src/app/dcm/modules/locations/containers/main-container/main-container.component.css":
/*!**********************************************************************************************!*\
  !*** ./src/app/dcm/modules/locations/containers/main-container/main-container.component.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RjbS9tb2R1bGVzL2xvY2F0aW9ucy9jb250YWluZXJzL21haW4tY29udGFpbmVyL21haW4tY29udGFpbmVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/dcm/modules/locations/containers/main-container/main-container.component.html":
/*!***********************************************************************************************!*\
  !*** ./src/app/dcm/modules/locations/containers/main-container/main-container.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"full-h\" fxLayout=\"column\" fxLayoutAlign=\"space-between\">\r\n      <div fxFlex=\"100\" class=\"scrollable-table mat-elevation-z1\">\r\n            <anms-current-locations-grid></anms-current-locations-grid>\r\n      </div>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/dcm/modules/locations/containers/main-container/main-container.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/dcm/modules/locations/containers/main-container/main-container.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: MainContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainContainerComponent", function() { return MainContainerComponent; });
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

var MainContainerComponent = /** @class */ (function () {
    function MainContainerComponent() {
    }
    MainContainerComponent.prototype.ngOnInit = function () {
    };
    MainContainerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'anms-main-container',
            template: __webpack_require__(/*! ./main-container.component.html */ "./src/app/dcm/modules/locations/containers/main-container/main-container.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./main-container.component.css */ "./src/app/dcm/modules/locations/containers/main-container/main-container.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MainContainerComponent);
    return MainContainerComponent;
}());



/***/ }),

/***/ "./src/app/dcm/modules/locations/locations-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/dcm/modules/locations/locations-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: LocationsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationsRoutingModule", function() { return LocationsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _containers_main_container_main_container_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./containers/main-container/main-container.component */ "./src/app/dcm/modules/locations/containers/main-container/main-container.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _containers_main_container_main_container_component__WEBPACK_IMPORTED_MODULE_2__["MainContainerComponent"],
        data: { title: 'Current Locations' }
    },
];
var LocationsRoutingModule = /** @class */ (function () {
    function LocationsRoutingModule() {
    }
    LocationsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LocationsRoutingModule);
    return LocationsRoutingModule;
}());



/***/ }),

/***/ "./src/app/dcm/modules/locations/locations.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/dcm/modules/locations/locations.component.ts ***!
  \**************************************************************/
/*! exports provided: LocationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationsComponent", function() { return LocationsComponent; });
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


var LocationsComponent = /** @class */ (function () {
    function LocationsComponent(store) {
        this.store = store;
    }
    LocationsComponent.prototype.ngOnInit = function () {
    };
    LocationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'uplaod-main',
            template: '<h1>Locations</h1>',
            //styleUrls: ['./main.component.scss'],
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_0__["Store"]])
    ], LocationsComponent);
    return LocationsComponent;
}());



/***/ }),

/***/ "./src/app/dcm/modules/locations/locations.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/dcm/modules/locations/locations.module.ts ***!
  \***********************************************************/
/*! exports provided: LocationsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationsModule", function() { return LocationsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/shared */ "./src/app/shared/index.ts");
/* harmony import */ var _locations_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./locations-routing.module */ "./src/app/dcm/modules/locations/locations-routing.module.ts");
/* harmony import */ var _locations_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./locations.component */ "./src/app/dcm/modules/locations/locations.component.ts");
/* harmony import */ var _containers_main_container_main_container_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/main-container/main-container.component */ "./src/app/dcm/modules/locations/containers/main-container/main-container.component.ts");
/* harmony import */ var _components_current_locations_grid_current_locations_grid_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/current-locations-grid/current-locations-grid.component */ "./src/app/dcm/modules/locations/components/current-locations-grid/current-locations-grid.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






// import { FeaturesComponent } from './features/features.component';
var LocationsModule = /** @class */ (function () {
    function LocationsModule() {
    }
    LocationsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_app_shared__WEBPACK_IMPORTED_MODULE_1__["SharedModule"], _locations_routing_module__WEBPACK_IMPORTED_MODULE_2__["LocationsRoutingModule"]],
            declarations: [_locations_component__WEBPACK_IMPORTED_MODULE_3__["LocationsComponent"], _containers_main_container_main_container_component__WEBPACK_IMPORTED_MODULE_4__["MainContainerComponent"], _components_current_locations_grid_current_locations_grid_component__WEBPACK_IMPORTED_MODULE_5__["CurrentLocationsGridComponent"]]
        })
    ], LocationsModule);
    return LocationsModule;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map