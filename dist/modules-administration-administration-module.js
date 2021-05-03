(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-administration-administration-module"],{

/***/ "./src/app/dcm/modules/administration/administration-routing.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/administration-routing.module.ts ***!
  \*****************************************************************************/
/*! exports provided: AdministrationRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdministrationRoutingModule", function() { return AdministrationRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_dcm_modules_administration_container_setting_setting_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/dcm/modules/administration/container/setting/setting.component */ "./src/app/dcm/modules/administration/container/setting/setting.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _app_dcm_modules_administration_container_setting_setting_component__WEBPACK_IMPORTED_MODULE_2__["SettingComponent"],
        data: { title: 'Field Setting' }
    },
];
var AdministrationRoutingModule = /** @class */ (function () {
    function AdministrationRoutingModule() {
    }
    AdministrationRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AdministrationRoutingModule);
    return AdministrationRoutingModule;
}());



/***/ }),

/***/ "./src/app/dcm/modules/administration/administration.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/dcm/modules/administration/administration.module.ts ***!
  \*********************************************************************/
/*! exports provided: AdministrationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdministrationModule", function() { return AdministrationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _container_setting_setting_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./container/setting/setting.component */ "./src/app/dcm/modules/administration/container/setting/setting.component.ts");
/* harmony import */ var _app_dcm_modules_administration_administration_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/dcm/modules/administration/administration-routing.module */ "./src/app/dcm/modules/administration/administration-routing.module.ts");
/* harmony import */ var _component_general_general_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/general/general.component */ "./src/app/dcm/modules/administration/component/general/general.component.ts");
/* harmony import */ var _component_fields_fields_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/fields/fields.component */ "./src/app/dcm/modules/administration/component/fields/fields.component.ts");
/* harmony import */ var _component_group_cols_group_cols_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/group-cols/group-cols.component */ "./src/app/dcm/modules/administration/component/group-cols/group-cols.component.ts");
/* harmony import */ var _component_datachecks_datachecks_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component/datachecks/datachecks.component */ "./src/app/dcm/modules/administration/component/datachecks/datachecks.component.ts");
/* harmony import */ var _app_shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @app/shared */ "./src/app/shared/index.ts");
/* harmony import */ var _component_datacheck_create_datacheck_create_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./component/datacheck-create/datacheck-create.component */ "./src/app/dcm/modules/administration/component/datacheck-create/datacheck-create.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AdministrationModule = /** @class */ (function () {
    function AdministrationModule() {
    }
    AdministrationModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_container_setting_setting_component__WEBPACK_IMPORTED_MODULE_2__["SettingComponent"], _component_general_general_component__WEBPACK_IMPORTED_MODULE_4__["GeneralComponent"], _component_fields_fields_component__WEBPACK_IMPORTED_MODULE_5__["FieldsComponent"], _component_group_cols_group_cols_component__WEBPACK_IMPORTED_MODULE_6__["GroupColsComponent"], _component_datachecks_datachecks_component__WEBPACK_IMPORTED_MODULE_7__["DatachecksComponent"], _component_datacheck_create_datacheck_create_component__WEBPACK_IMPORTED_MODULE_9__["DatacheckCreateComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _app_dcm_modules_administration_administration_routing_module__WEBPACK_IMPORTED_MODULE_3__["AdministrationRoutingModule"], _app_shared__WEBPACK_IMPORTED_MODULE_8__["SharedModule"]
            ],
            entryComponents: [_component_datacheck_create_datacheck_create_component__WEBPACK_IMPORTED_MODULE_9__["DatacheckCreateComponent"]]
        })
    ], AdministrationModule);
    return AdministrationModule;
}());



/***/ }),

/***/ "./src/app/dcm/modules/administration/component/datacheck-create/datacheck-create.component.css":
/*!******************************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/datacheck-create/datacheck-create.component.css ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host >>> .ant-select-selection.ant-select-selection--single {\r\n  border-radius: 5px !important;\r\n  border-width: 1px;\r\n\r\n}\r\n:host >>> .ant-form-item label > .anticon {\r\n  vertical-align: middle;\r\n  font-size: 15px;\r\n}\r\n.error{\r\n  border :1px solid red\r\n}\r\n:host >>> .mat-dialog-content{\r\n  height: 55vh;\r\n  overflow: auto;\r\n}\r\n:host >>> .default-theme .mat-dialog-container{\r\n  height: 75vh;\r\n  overflow-y: auto;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGNtL21vZHVsZXMvYWRtaW5pc3RyYXRpb24vY29tcG9uZW50L2RhdGFjaGVjay1jcmVhdGUvZGF0YWNoZWNrLWNyZWF0ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNkJBQTZCO0VBQzdCLGlCQUFpQjs7QUFFbkI7QUFDQTtFQUNFLHNCQUFzQjtFQUN0QixlQUFlO0FBQ2pCO0FBQ0E7RUFDRTtBQUNGO0FBQ0E7RUFDRSxZQUFZO0VBQ1osY0FBYztBQUNoQjtBQUNBO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJzcmMvYXBwL2RjbS9tb2R1bGVzL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudC9kYXRhY2hlY2stY3JlYXRlL2RhdGFjaGVjay1jcmVhdGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0ID4+PiAuYW50LXNlbGVjdC1zZWxlY3Rpb24uYW50LXNlbGVjdC1zZWxlY3Rpb24tLXNpbmdsZSB7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4ICFpbXBvcnRhbnQ7XHJcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XHJcblxyXG59XHJcbjpob3N0ID4+PiAuYW50LWZvcm0taXRlbSBsYWJlbCA+IC5hbnRpY29uIHtcclxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxufVxyXG4uZXJyb3J7XHJcbiAgYm9yZGVyIDoxcHggc29saWQgcmVkXHJcbn1cclxuOmhvc3QgPj4+IC5tYXQtZGlhbG9nLWNvbnRlbnR7XHJcbiAgaGVpZ2h0OiA1NXZoO1xyXG4gIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcbjpob3N0ID4+PiAuZGVmYXVsdC10aGVtZSAubWF0LWRpYWxvZy1jb250YWluZXJ7XHJcbiAgaGVpZ2h0OiA3NXZoO1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/dcm/modules/administration/component/datacheck-create/datacheck-create.component.html":
/*!*******************************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/datacheck-create/datacheck-create.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"title-div\">\r\n  <h1 mat-dialog-title class=\"opacity-half title-color\"><small>Associate Datachecks to Fields</small></h1>\r\n</div>\r\n<div mat-dialog-content>\r\n  <nz-alert nzType=\"info\" *ngIf=\"message\"\r\n            [nzMessage]=\"message\" nzShowIcon></nz-alert>\r\n\r\n  <form nz-form [formGroup]=\"formDatacheck\" [nzLayout]=\"'inline'\" class=\"row\">\r\n\r\n    <div class=\"col-6\">\r\n      <nz-form-item nzFlex>\r\n        <nz-form-label [nzSm]=\"10\" [nzXs]=\"12\" nzRequired nzFor=\"type\"> Type</nz-form-label>\r\n        <nz-form-control [nzSm]=\"14\" [nzXs]=\"12\">\r\n          <nz-select style=\"width: 100%\" formControlName=\"type\" id=\"type\"\r\n                     (ngModelChange)=\"updateMessage()\"\r\n                     nzSize=\"small\">\r\n            <nz-option *ngFor=\"let ds of checks\" [nzValue]=\"ds\" [nzLabel]=\"ds.label\"></nz-option>\r\n          </nz-select>\r\n\r\n        </nz-form-control>\r\n      </nz-form-item>\r\n    </div>\r\n    <div class=\"col-6\">\r\n      <nz-form-item nzFlex>\r\n        <nz-form-label [nzSm]=\"10\" [nzXs]=\"12\" nzRequired nzFor=\"level\"> Level</nz-form-label>\r\n        <nz-form-control [nzSm]=\"14\" [nzXs]=\"12\">\r\n          <nz-select style=\"width: 100%\" formControlName=\"level\" id=\"level\"\r\n                     nzSize=\"small\">\r\n            <nz-option [nzValue]=\"'ERROR'\" [nzLabel]=\"'Error'\"></nz-option>\r\n            <nz-option [nzValue]=\"'WARNING'\" [nzLabel]=\"'Warning '\"></nz-option>\r\n          </nz-select>\r\n        </nz-form-control>\r\n      </nz-form-item>\r\n    </div>\r\n    <div class=\"col-6\">\r\n      <nz-form-item nzFlex>\r\n        <nz-form-label [nzSm]=\"10\" [nzXs]=\"12\" nzFor=\"message\"> Message</nz-form-label>\r\n        <nz-form-control [nzSm]=\"14\" [nzXs]=\"12\">\r\n          <input nz-input formControlName=\"message\" id=\"message\" nzSize=\"small\"/>\r\n\r\n        </nz-form-control>\r\n      </nz-form-item>\r\n    </div>\r\n    <div class=\"col-6\">\r\n      <nz-form-item nzFlex>\r\n        <nz-form-label [nzSm]=\"10\" [nzXs]=\"12\" nzFor=\"rel\">\r\n          <i nz-icon type=\"eye\" nz-tooltip (click)=\"reset()\"\r\n             [nzTitle]=\"'existing Fields that relate to the field'\"></i> Relations\r\n        </nz-form-label>\r\n        <nz-form-control [nzSm]=\"14\" [nzXs]=\"12\">\r\n          <div>\r\n            <input nz-input formControlName=\"selectedrel\"\r\n                   [nzAutocomplete]=\"auto\"            />\r\n            <nz-autocomplete nzBackfill #auto (selectionChange)=\"relSelected($event)\"\r\n            >\r\n              <nz-auto-option *ngFor=\"let field of fieldstoCheck\"\r\n                              [nzValue]=\"field\">\r\n                {{ field.name }}\r\n              </nz-auto-option>\r\n            </nz-autocomplete>\r\n\r\n            <div class=\"keywordData\">\r\n              <nz-tag *ngFor=\"let word of fieldRel\" [nzMode]=\" 'closeable' \"\r\n                      [nzColor]=\"'#26838f'\" (nzAfterClose)=\"removeRel(word)\">{{word.name}}</nz-tag>\r\n\r\n            </div>\r\n\r\n          </div>\r\n\r\n        </nz-form-control>\r\n      </nz-form-item>\r\n    </div>\r\n  </form>\r\n\r\n  <div class=\"row container\" *ngIf=\"formDatacheck && formDatacheck.value.type\">\r\n\r\n    <nz-divider [nzText]=\"text\" nzOrientation=\"left\" style=\"width: 90%\"\r\n                *ngIf=\"reference || properties.length>0 \">\r\n      <ng-template #text>\r\n        <div style=\"font-size: 13px\">\r\n          <i nz-icon type=\"setting\" style=\"vertical-align: middle;\"></i><span> Datacheck Properties</span></div>\r\n      </ng-template>\r\n    </nz-divider>\r\n    <div class=\"col-3 offset-9\" *ngIf=\"reference\">\r\n\r\n      <mat-slide-toggle [(ngModel)]=\"value\" color=\"accent\">\r\n        <span *ngIf=\"!value\"> dynamique References</span>\r\n        <span *ngIf=\"value\"> static References</span>\r\n      </mat-slide-toggle>\r\n    </div>\r\n    <nz-table #editRowTable [nzData]=\"properties\" [nzShowPagination]=\"false\"\r\n              *ngIf=\"properties.length>0\"\r\n              style=\"width: 90% ; margin-left: auto;margin-right: auto\">\r\n      <thead>\r\n      <tr>\r\n        <th>Property</th>\r\n        <th>Value</th>\r\n      </tr>\r\n      </thead>\r\n      <tbody>\r\n      <tr *ngFor=\"let data of editRowTable.data\" class=\"editable-row\">\r\n        <td style=\"width: 50%\"> {{ data.name }}({{data.description}})</td>\r\n        <td>\r\n          <div class=\"editable-cell\">\r\n            <input nz-input [type]=\"data.type === 'double' || data.type === 'integer' ? 'number':'text'\"\r\n                   (input)=\"checkPattern(data)\"\r\n                   [(ngModel)]=\"data.value\"/>\r\n            <span *ngIf=\"!data.valid\" style=\"color:darkred ; width: 100%\">Format is invalid</span>\r\n\r\n          </div>\r\n        </td>\r\n      </tr>\r\n      </tbody>\r\n    </nz-table>\r\n    <div *ngIf=\"reference\" style=\"width: 100%\">\r\n      <div *ngIf=\"!value\" class=\"col-12 row px-0\">\r\n        <div class=\"col-5\">\r\n          <nz-form-item nzFlex>\r\n            <nz-form-label [nzSm]=\"10\" [nzXs]=\"12\" nzFor=\"collection\"> Collection</nz-form-label>\r\n            <nz-form-control [nzSm]=\"14\" [nzXs]=\"12\">\r\n              <nz-select style=\"width: 100%\"\r\n                         [(ngModel)]=\"reference.source\" id=\"collection\"\r\n                         [ngModelOptions]=\"{standalone: true}\"\r\n                         s nzSize=\"small\">\r\n                <nz-option *ngFor=\"let collection of collections\" [nzValue]=\"collection.code\"\r\n                           [nzLabel]=\"collection.name\"></nz-option>\r\n\r\n              </nz-select>\r\n\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n        </div>\r\n\r\n\r\n      </div>\r\n\r\n      <div class=\"col-12\" *ngIf=\"value\">\r\n        <nz-form-item nzFlex>\r\n          <nz-form-label [nzSm]=\"4\" [nzXs]=\"12\" nzFor=\"values\"> Values</nz-form-label>\r\n          <nz-form-control [nzSm]=\"20\" [nzXs]=\"12\">\r\n            <nz-tag\r\n              *ngFor=\"let tag of reference?.values; let i = index\"\r\n              [nzColor]=\"'#26838f'\"\r\n              [nzMode]=\" 'closeable'\"\r\n              (nzAfterClose)=\"handleClose(tag)\"\r\n            >\r\n              {{ tag }}\r\n            </nz-tag>\r\n            <nz-tag *ngIf=\"!inputVisible\" class=\"editable-tag\" nzNoAnimation (click)=\"this.inputVisible = true;\">\r\n              <i nz-icon type=\"plus\"></i> New Value\r\n            </nz-tag>\r\n            <input\r\n              #inputElement\r\n              nz-input\r\n              nzSize=\"small\"\r\n              *ngIf=\"inputVisible\"\r\n              type=\"text\"\r\n              [(ngModel)]=\"inputValue\" [ngModelOptions]=\"{standalone: true}\"\r\n              style=\"width: 78px;\"\r\n              (keydown.enter)=\"handleInputConfirm()\"\r\n            />\r\n\r\n          </nz-form-control>\r\n        </nz-form-item>\r\n      </div>\r\n\r\n    </div>\r\n\r\n  </div>\r\n\r\n</div>\r\n<div mat-dialog-actions>\r\n  <div fxLayout=\"row\" fxLayoutAlign=\"end\" fxLayoutGap=\"7px\" class=\"full-w\">\r\n    <div class=\"col-4 offset-8\">\r\n\r\n      <button nz-button nzType=\"link\" style=\"background:transparent;float: right ; color: #16868C ;border:none\" nzSize=\"small\" class=\"ml-2\"\r\n              (click)=\"modifyData()\" [disabled]=\"!formDatacheck.valid\">\r\n        Associate\r\n      </button>\r\n      <button nz-button nzType=\"link\" style=\"background:transparent; float: right ; color : #D94938 ; border:none\"\r\n              nzSize=\"small\" (click)=\"close()\">\r\n        Clear\r\n      </button>\r\n\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/dcm/modules/administration/component/datacheck-create/datacheck-create.component.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/datacheck-create/datacheck-create.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: DatacheckCreateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatacheckCreateComponent", function() { return DatacheckCreateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd.js");
/* harmony import */ var _app_dcm_modules_administration_services_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/dcm/modules/administration/services/config.service */ "./src/app/dcm/modules/administration/services/config.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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






var DatacheckCreateComponent = /** @class */ (function () {
    function DatacheckCreateComponent(fb, modalRef, cdrf, configService, msgService, data) {
        this.fb = fb;
        this.modalRef = modalRef;
        this.cdrf = cdrf;
        this.configService = configService;
        this.msgService = msgService;
        this.data = data;
        this.inputValue = '';
        this.inputVisible = false;
        this.value = false;
        this.properties = [];
        this.fieldRel = [];
        this.formDatacheck = fb.group({
            type: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            level: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            message: [null],
            selectedrel: null
        });
    }
    DatacheckCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checks = this.data.checks;
        this.configService.getCollections().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])(function (res) { return res !== undefined; })).subscribe(function (data) {
            if (data) {
                _this.collections = data.references;
            }
        });
        this.formDatacheck.controls['type'].valueChanges.subscribe(function (type) {
            switch (type.code) {
                case 'REFDS':
                    _this.properties = [];
                    _this.reference = {
                        values: [],
                        source: null
                    };
                    break;
                default:
                    _this.properties = [];
                    if (type.properties)
                        type.properties.forEach(function (ps) {
                            _this.properties.push({
                                name: ps.name,
                                type: ps.type,
                                match: ps.match,
                                description: ps.description,
                                value: null,
                                valid: !ps.match
                            });
                        });
                    _this.reference = null;
                    break;
            }
        });
        this.formDatacheck.controls['selectedrel'].valueChanges.subscribe(function (line) { return _this.search(line); });
    };
    DatacheckCreateComponent.prototype.handleClose = function (removedTag) {
        this.reference.values = this.reference.values.filter(function (tag) { return tag !== removedTag; });
    };
    DatacheckCreateComponent.prototype.handleInputConfirm = function () {
        if (this.inputValue && this.reference.values.indexOf(this.inputValue) === -1) {
            this.reference.values = this.reference.values.concat([this.inputValue]);
        }
        this.inputValue = '';
        this.inputVisible = false;
    };
    DatacheckCreateComponent.prototype.updateMessage = function () {
        if (this.formDatacheck.value.type) {
            this.message = this.formDatacheck.value.type.description;
        }
        else
            this.message = null;
    };
    DatacheckCreateComponent.prototype.modifyData = function () {
        var _this = this;
        var checkProperties = this.properties.length > 0
            && (this.properties.filter(function (pr) { return !pr.valid; }).length > 0 || this.properties.filter(function (pr) { return pr.value !== null; }).length === 0);
        var checkReference = (this.reference && ((!this.value && !this.reference.source)
            || (this.reference.values.length == 0 && this.value)));
        if (checkProperties) {
            this.msgService.error('Please check the properties !');
        }
        else if (checkReference) {
            this.msgService.error('Please  complete the Reference !');
        }
        else {
            var propertiesCheck = void 0;
            if (this.properties.length > 0) {
                propertiesCheck = this.properties.filter(function (pr) { return pr.value !== null; });
            }
            if (this.reference) {
                if (this.value) {
                    this.reference.source = null;
                }
                else {
                    this.reference.values = [];
                }
            }
            var rel_1 = [];
            this.fieldRel.forEach(function (f) { return rel_1.push(f.code); });
            var datacheck_1 = {
                level: this.formDatacheck.value.level,
                message: this.formDatacheck.value.message ? this.formDatacheck.value.message : this.formDatacheck.value.type.defaultMessage,
                properties: propertiesCheck,
                code: this.formDatacheck.value.type.code,
                rel: rel_1
            };
            this.configService.validateDatcheck(datacheck_1).then(function (result) {
                if (result.ok) {
                    var reference = __assign({}, _this.reference);
                    if (!_this.value) {
                        delete reference.values;
                    }
                    else
                        delete reference.source;
                    datacheck_1.type = _this.formDatacheck.value.type;
                    datacheck_1.ref = _this.reference;
                    _this.modalRef.close(datacheck_1);
                }
            }, function (err) {
                var message = "";
                if (err.error.errors) {
                    Object.keys(err.error.errors).forEach(function (key) {
                        message = message.concat(key).concat(':').concat(err.error.errors[key]);
                    });
                }
                else
                    message = "ERROR while save ";
                _this.msgService.error(message);
            });
        }
    };
    DatacheckCreateComponent.prototype.close = function () {
        this.modalRef.close();
    };
    DatacheckCreateComponent.prototype.search = function (input) {
        if (input)
            this.fieldstoCheck = this.data.allFields.filter(function (fie) { return fie.name.includes(input); });
        else
            this.fieldstoCheck = [];
    };
    DatacheckCreateComponent.prototype.relSelected = function (field) {
        var _this = this;
        var value = field.nzValue;
        if (this.fieldRel.length == 0) {
            this.fieldRel.push(value);
            this.fieldstoCheck = [];
            this.cdrf.detectChanges();
        }
        else {
            if (this.fieldRel.filter(function (f) { return f.code === value.code; }).length === 0) {
                this.fieldRel.push(value);
                this.fieldstoCheck = [];
            }
            else {
                this.fieldstoCheck = [];
            }
        }
        setTimeout(function () { return _this.reset(); }, 5);
    };
    DatacheckCreateComponent.prototype.reset = function () {
        this.formDatacheck.controls['selectedrel'].patchValue(null);
    };
    DatacheckCreateComponent.prototype.removeRel = function (field) {
        this.fieldRel = this.fieldRel.filter(function (f) { return f.code !== field.code; });
    };
    DatacheckCreateComponent.prototype.checkPattern = function (data) {
        if (data.type === 'regex') {
            var regex = new RegExp(data.match);
            data.valid = regex.test(data.value);
        }
    };
    DatacheckCreateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'anms-datacheck-create',
            template: __webpack_require__(/*! ./datacheck-create.component.html */ "./src/app/dcm/modules/administration/component/datacheck-create/datacheck-create.component.html"),
            styles: [__webpack_require__(/*! ./datacheck-create.component.css */ "./src/app/dcm/modules/administration/component/datacheck-create/datacheck-create.component.css")]
        }),
        __param(5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], _app_dcm_modules_administration_services_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigAdminService"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"], Object])
    ], DatacheckCreateComponent);
    return DatacheckCreateComponent;
}());



/***/ }),

/***/ "./src/app/dcm/modules/administration/component/datachecks/datachecks.component.css":
/*!******************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/datachecks/datachecks.component.css ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RjbS9tb2R1bGVzL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudC9kYXRhY2hlY2tzL2RhdGFjaGVja3MuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/dcm/modules/administration/component/datachecks/datachecks.component.html":
/*!*******************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/datachecks/datachecks.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mt-3 container\" >\r\n<div class=\"row\" style=\"height: 400px\">\r\n  <div class=\"col-6\">\r\n    <form nz-form [formGroup]=\"formDs\" [nzLayout]=\"'vertical'\">\r\n      <nz-form-item>\r\n        <nz-form-label   nzRequired nzFor=\"description\">Description Datacheck</nz-form-label>\r\n        <nz-form-control>\r\n          <textarea rows=\"4\" nz-input formControlName=\"description\"></textarea>\r\n\r\n        </nz-form-control>\r\n      </nz-form-item>\r\n      <nz-form-item>\r\n\r\n        <nz-form-control [nzSm]=\"18\" [nzXs]=\"24\">\r\n          <button nz-button nzType=\"default\" (click)=\"adddescriptions()\" [disabled]=\"!formDs.valid\">add Datacheck Description</button>\r\n        </nz-form-control>\r\n      </nz-form-item>\r\n    </form>\r\n  </div>\r\n<div class=\"col-6\">\r\n  <mat-list style=\"width:100%\">\r\n    <h3 mat-subheader>Datachecks Description to Validate</h3>\r\n    <mat-list-item *ngFor=\"let datacheck of datacheckToAdd\" class=\"row\">\r\n      <p mat-line class=\"col-9\">{{datacheck.description}}</p>\r\n      <button mat-button color=\"primary\" style=\"float:right\" (click)=\"delete(datacheck)\">delete</button>\r\n    </mat-list-item>\r\n  </mat-list></div>\r\n\r\n</div>\r\n\r\n  <div class=\"row\" *ngIf=\"datacheckToAdd.length>0\">\r\n    <div class=\"col-8 offset-4\">\r\n      <button nz-button nzType=\"link\" style=\"float: right ; color: #16868C ;border: none ;box-shadow: 0 0 0 rgba(0, 0, 0, 0.015);background: transparent\" nzSize=\"small\"\r\n      (click)=\"validateAll()\">\r\n        Validate Datachecks Description\r\n      </button>\r\n      <button nz-button nzType=\"link\" style=\"float: right ; color : #D94938 ; border: none ;box-shadow: 0 0 0 rgba(0, 0, 0, 0.015);background: transparent \" class=\"ml-2\"\r\n              (click)=\"clearAll()\" nzSize=\"small\">\r\n        Clear Datachecks Description\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/dcm/modules/administration/component/datachecks/datachecks.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/datachecks/datachecks.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: DatachecksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatachecksComponent", function() { return DatachecksComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/dcm/modules/administration/store/configadmin.selectors */ "./src/app/dcm/modules/administration/store/configadmin.selectors.ts");
/* harmony import */ var _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/dcm/modules/administration/store/configadmin.actions */ "./src/app/dcm/modules/administration/store/configadmin.actions.ts");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DatachecksComponent = /** @class */ (function () {
    function DatachecksComponent(fb, store, cdrf, modalService) {
        this.fb = fb;
        this.store = store;
        this.cdrf = cdrf;
        this.modalService = modalService;
        this.datacheckToAdd = [];
        this.formDs = this.fb.group({
            description: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    DatachecksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select(_app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_3__["selectDatachecks"]).subscribe(function (liste) { return _this.datacheckToAdd = liste.slice(); });
    };
    DatachecksComponent.prototype.adddescriptions = function () {
        this.datacheckToAdd.push({
            description: this.formDs.value.description
        });
        this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_4__["ActionAddDatacheck"]({ datacheck: this.datacheckToAdd }));
        this.formDs.reset();
    };
    DatachecksComponent.prototype.delete = function (datacheck) {
        var _this = this;
        this.modalService.confirm({
            nzTitle: ' delete Datacheck Description',
            nzContent: 'Are you sure to continue? ',
            nzOnOk: function () {
                _this.datacheckToAdd = _this.datacheckToAdd.filter(function (gr) { return gr.description !== datacheck.description; });
                _this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_4__["ActionAddDatacheck"]({ datacheck: _this.datacheckToAdd }));
                _this.cdrf.detectChanges();
            }
        });
    };
    DatachecksComponent.prototype.clearAll = function () {
        var _this = this;
        this.modalService.confirm({
            nzTitle: ' Clear Datacheck Description',
            nzContent: 'Are you sure to continue? ',
            nzOnOk: function () {
                _this.datacheckToAdd = [];
                _this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_4__["ActionAddDatacheck"]({ datacheck: _this.datacheckToAdd }));
                _this.cdrf.detectChanges();
            }
        });
    };
    DatachecksComponent.prototype.validateAll = function () {
        this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_4__["ActionValidateDatachecks"]());
    };
    DatachecksComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'anms-datachecks',
            template: __webpack_require__(/*! ./datachecks.component.html */ "./src/app/dcm/modules/administration/component/datachecks/datachecks.component.html"),
            styles: [__webpack_require__(/*! ./datachecks.component.css */ "./src/app/dcm/modules/administration/component/datachecks/datachecks.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _ngrx_store__WEBPACK_IMPORTED_MODULE_2__["Store"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_5__["NzModalService"]])
    ], DatachecksComponent);
    return DatachecksComponent;
}());



/***/ }),

/***/ "./src/app/dcm/modules/administration/component/fields/fields.component.css":
/*!**********************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/fields/fields.component.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host >>> .ant-form-item {\r\n  margin-bottom: 16px;\r\n}\r\n\r\n:host >>> .ant-table {\r\n  font-size: 12px;\r\n}\r\n\r\n:host >>> .ant-form-item-label label {\r\n  font-size: 12px !important;\r\n}\r\n\r\n:host >>> .ant-form-inline .ant-form-item {\r\n  margin-right: 3px;\r\n}\r\n\r\n:host >>> .ant-select-selection__rendered {\r\n\r\n  width: 83%;\r\n  border-right: 1px solid #2da5b9;\r\n}\r\n\r\n.errorSpan {\r\n  color: darkred;\r\n  font-weight: 500;\r\n}\r\n\r\n.warnSpan {\r\n  color: orangered;\r\n  font-weight: 500;\r\n\r\n}\r\n\r\n:host >>> .mat-list-base .mat-list-item {\r\n  font-size: 13px;\r\n}\r\n\r\n:host >>> .mat-dialog-content{\r\n  height: 55vh;\r\n  overflow: auto;\r\n}\r\n\r\n:host >>> .default-theme .mat-dialog-container{\r\n  height: 75vh;\r\n  overflow-y: auto;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGNtL21vZHVsZXMvYWRtaW5pc3RyYXRpb24vY29tcG9uZW50L2ZpZWxkcy9maWVsZHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7O0VBRUUsVUFBVTtFQUNWLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCOztBQUVsQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBQ0E7RUFDRSxZQUFZO0VBQ1osY0FBYztBQUNoQjs7QUFDQTtFQUNFLFlBQVk7RUFDWixnQkFBZ0I7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9kY20vbW9kdWxlcy9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnQvZmllbGRzL2ZpZWxkcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3QgPj4+IC5hbnQtZm9ybS1pdGVtIHtcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG59XHJcblxyXG46aG9zdCA+Pj4gLmFudC10YWJsZSB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG59XHJcblxyXG46aG9zdCA+Pj4gLmFudC1mb3JtLWl0ZW0tbGFiZWwgbGFiZWwge1xyXG4gIGZvbnQtc2l6ZTogMTJweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG46aG9zdCA+Pj4gLmFudC1mb3JtLWlubGluZSAuYW50LWZvcm0taXRlbSB7XHJcbiAgbWFyZ2luLXJpZ2h0OiAzcHg7XHJcbn1cclxuXHJcbjpob3N0ID4+PiAuYW50LXNlbGVjdC1zZWxlY3Rpb25fX3JlbmRlcmVkIHtcclxuXHJcbiAgd2lkdGg6IDgzJTtcclxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjMmRhNWI5O1xyXG59XHJcblxyXG4uZXJyb3JTcGFuIHtcclxuICBjb2xvcjogZGFya3JlZDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG59XHJcblxyXG4ud2FyblNwYW4ge1xyXG4gIGNvbG9yOiBvcmFuZ2VyZWQ7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuXHJcbn1cclxuXHJcbjpob3N0ID4+PiAubWF0LWxpc3QtYmFzZSAubWF0LWxpc3QtaXRlbSB7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG59XHJcbjpob3N0ID4+PiAubWF0LWRpYWxvZy1jb250ZW50e1xyXG4gIGhlaWdodDogNTV2aDtcclxuICBvdmVyZmxvdzogYXV0bztcclxufVxyXG46aG9zdCA+Pj4gLmRlZmF1bHQtdGhlbWUgLm1hdC1kaWFsb2ctY29udGFpbmVye1xyXG4gIGhlaWdodDogNzV2aDtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/dcm/modules/administration/component/fields/fields.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/fields/fields.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nz-card  >\r\n\r\n  <div class=\"row\">\r\n    <form nz-form [formGroup]=\"formFields\" [nzLayout]=\"'inline'\" class=\"row\">\r\n      <div class=\" col-8 row\">\r\n        <div class=\"col-6\">\r\n          <nz-form-item nzFlex>\r\n            <nz-form-label [nzSm]=\"10\" [nzXs]=\"12\" nzRequired nzFor=\"name\"> Name</nz-form-label>\r\n            <nz-form-control [nzSm]=\"14\" [nzXs]=\"12\">\r\n              <input nz-input formControlName=\"name\" id=\"name\" nzSize=\"small\"/>\r\n\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n        </div>\r\n        <div class=\"col-6\">\r\n          <nz-form-item nzFlex>\r\n            <nz-form-label [nzSm]=\"10\" [nzXs]=\"12\" nzRequired nzFor=\"shortName\"> Short Name</nz-form-label>\r\n            <nz-form-control [nzSm]=\"14\" [nzXs]=\"12\">\r\n              <input nz-input formControlName=\"shortName\" id=\"shortName\" nzSize=\"small\"/>\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n        </div>\r\n        <div class=\"col-6\">\r\n          <nz-form-item nzFlex>\r\n            <nz-form-label [nzSm]=\"10\" [nzXs]=\"12\" nzRequired nzFor=\"category\">Column Group</nz-form-label>\r\n            <nz-form-control [nzSm]=\"14\" [nzXs]=\"12\">\r\n              <nz-select style=\"width: 100%\" formControlName=\"category\" id=\"category\"\r\n                         (ngModelChange)=\"changeCategory()\"\r\n                         nzSize=\"small\" nzPlaceHolder=\"Column Group\">\r\n                <nz-option *ngFor=\"let col of columns\" [nzValue]=\"col\" [nzLabel]=\"col.label\"></nz-option>\r\n              </nz-select>\r\n\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n        </div>\r\n        <div class=\"col-6\">\r\n          <nz-form-item nzFlex>\r\n            <nz-form-label [nzSm]=\"10\" [nzXs]=\"12\" nzRequired nzFor=\"inCategoryOrder\"> Order in Group</nz-form-label>\r\n            <nz-form-control [nzSm]=\"14\" [nzXs]=\"12\">\r\n              <input nz-input formControlName=\"inCategoryOrder\" id=\"inCategoryOrder\" nzSize=\"small\" disabled [type]=\"'number'\"/>\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n        </div>\r\n        <div class=\"col-6\">\r\n          <nz-form-item nzFlex>\r\n            <nz-form-label [nzSm]=\"10\" [nzXs]=\"12\" nzRequired nzFor=\"dataType\">Data Type</nz-form-label>\r\n            <nz-form-control [nzSm]=\"14\" [nzXs]=\"12\">\r\n              <nz-select style=\"width: 100%\" formControlName=\"dataType\" id=\"dataType\"\r\n                         nzSize=\"small\"\r\n                         (ngModelChange)=\"resetDatachecks()\"\r\n                         nzPlaceHolder=\"Data type\">\r\n                <nz-option *ngFor=\"let col of types\" [nzValue]=\"col.code\" [nzLabel]=\"col.name\"></nz-option>\r\n              </nz-select>\r\n\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n        </div>\r\n\r\n        <div class=\"col-6\">\r\n          <nz-form-item nzFlex>\r\n            <nz-form-label [nzSm]=\"10\" [nzXs]=\"12\" nzFor=\"necessity\"> Mapping necessity</nz-form-label>\r\n            <nz-form-control [nzSm]=\"14\" [nzXs]=\"12\">\r\n              <nz-select style=\"width: 100%\" formControlName=\"necessity\" id=\"necessity\"\r\n                         [nzDisabled]=\"!formFields.value.isMappable\"\r\n                         nzSize=\"small\">\r\n                <nz-option [nzValue]=\"'optional'\" [nzLabel]=\"'Optional'\"></nz-option>\r\n                <nz-option [nzValue]=\"'mandatory'\" [nzLabel]=\"'Mandatory'\"></nz-option>\r\n                <nz-option [nzValue]=\"'recommended'\" [nzLabel]=\"'Recommended'\"></nz-option>\r\n              </nz-select>\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n        </div>\r\n\r\n        <div class=\"col-3\">\r\n          <nz-form-item nzFlex>\r\n            <nz-form-label [nzSm]=\"18\" [nzXs]=\"12\" nzFor=\"isEditable\"> Editable</nz-form-label>\r\n            <nz-form-control [nzSm]=\"6\" [nzXs]=\"12\">\r\n              <nz-switch nzSize=\"small\" formControlName=\"isEditable\" id=\"isEditable\"\r\n                         [nzCheckedChildren]=\"checkedTemplate\"\r\n                         [nzUnCheckedChildren]=\"unCheckedTemplate\"></nz-switch>\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n        </div>\r\n        <div class=\"col-3\">\r\n          <nz-form-item nzFlex>\r\n            <nz-form-label [nzSm]=\"18\" [nzXs]=\"12\" nzFor=\"isMappable\">Mappable</nz-form-label>\r\n            <nz-form-control [nzSm]=\"6\" [nzXs]=\"12\">\r\n              <nz-switch nzSize=\"small\" formControlName=\"isMappable\" id=\"isMappable\"\r\n                         [nzCheckedChildren]=\"checkedTemplate\"\r\n                         [nzUnCheckedChildren]=\"unCheckedTemplate\"></nz-switch>\r\n\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n        </div>\r\n\r\n        <div class=\"col-3\">\r\n          <nz-form-item nzFlex>\r\n            <nz-form-label [nzSm]=\"18\" [nzXs]=\"12\" nzFor=\"showInCollapsed\">Always displayed</nz-form-label>\r\n            <nz-form-control [nzSm]=\"6\" [nzXs]=\"12\">\r\n              <nz-switch nzSize=\"small\" formControlName=\"showInCollapsed\" id=\"showInCollapsed\"\r\n                         [nzCheckedChildren]=\"checkedTemplate\"\r\n                         [nzUnCheckedChildren]=\"unCheckedTemplate\"></nz-switch>\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n        </div>\r\n        <div class=\"col-3\" *ngIf=\"showDigit\">\r\n          <nz-form-item nzFlex>\r\n            <nz-form-label [nzSm]=\"18\" [nzXs]=\"12\" nzFor=\"skipDigits\">Skip Digit</nz-form-label>\r\n            <nz-form-control [nzSm]=\"6\" [nzXs]=\"12\">\r\n              <nz-switch nzSize=\"small\" formControlName=\"skipDigits\" id=\"skipDigits\"\r\n                         [nzCheckedChildren]=\"checkedTemplate\"\r\n                         [nzUnCheckedChildren]=\"unCheckedTemplate\"></nz-switch>\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n        </div>\r\n\r\n\r\n      </div>\r\n      <div class=\"col-4\">\r\n        <mat-list *ngIf=\"datachecks.length>0\">\r\n          <h3 mat-subheader>Datachecks Rules for the field</h3>\r\n          <mat-list-item *ngFor=\"let ds of datachecks\" >\r\n            <div class=\"row\">\r\n              <p mat-line [className]=\"ds.level ==='ERROR'?' col-10 errorSpan':'col-10 warnSpan'\"  >\r\n                <span> {{ds?.type?.label}} : {{ds?.type?.description}}</span>\r\n                <span *ngIf=\"ds.ref && ds.ref.source\"> from {{ds.ref.source}}   </span>\r\n                <span *ngIf=\"ds.ref && ds.ref.values.length>0\"> from the liste [\r\n                <span *ngFor=\"let pr of ds.ref.values;   let i = index\">\r\n             {{pr}}  {{i === ds.ref.values.length - 1 ? '' : ';'}}\r\n\r\n            </span>]   </span>\r\n                <span *ngIf=\"ds.properties && ds.properties.length>0\">\r\n            [\r\n            <span *ngFor=\"let pr of ds.properties;   let i = index\">\r\n             <span *ngIf=\"pr.value\">{{pr.name}} : {{pr.value}} {{i === ds.properties.length - 1 ? '' : ';'}}</span>\r\n\r\n            </span>\r\n            ]\r\n          </span>\r\n              </p>\r\n              <p mat-line class=\"col-2\"> <i class=\"fas fa-trash\" (click)=\"deletedatachek(ds)\" style=\"color:#D94938\"></i></p>\r\n            </div>\r\n\r\n          </mat-list-item>\r\n\r\n        </mat-list>\r\n\r\n      </div>\r\n      <div class=\"col-12 row\">\r\n\r\n        <div class=\"col-6 offset-6\">\r\n          <nz-form-item>\r\n            <nz-form-control>\r\n              <button nz-button nzType=\"link\" (click)=\"newDatacheck()\" [disabled]=\"!formFields?.value.dataType\"\r\n                      style=\"float: right;color: #8C291D ;border: none ;box-shadow: 0 0 0 rgba(0, 0, 0, 0.015)\">\r\n                associate Data Check\r\n              </button>\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n          <nz-form-item>\r\n            <nz-form-control>\r\n              <button nz-button nzType=\"link\" (click)=\"addField()\" [nzLoading]=\"loadingadd\"\r\n                      [disabled]=\"!formFields.valid\"\r\n                      style=\"float: right ;color: #16868C ;border: none ;box-shadow: 0 0 0 rgba(0, 0, 0, 0.015)\">add field\r\n              </button>\r\n            </nz-form-control>\r\n          </nz-form-item>\r\n        </div>\r\n      </div>\r\n      <ng-template #checkedTemplate><i nz-icon type=\"check\" style=\"vertical-align: middle;\"></i></ng-template>\r\n      <ng-template #unCheckedTemplate><i nz-icon type=\"close\" style=\"vertical-align: middle;\"></i></ng-template>\r\n    </form>\r\n\r\n\r\n  </div>\r\n\r\n  <div *ngIf=\"fields.length>0\">\r\n    <nz-divider nzText=\"Fields waiting validation\" nzOrientation=\"left\" style=\"margin:5px\"></nz-divider>\r\n\r\n\r\n    <nz-table #basicTable [nzData]=\"fields\" style=\"width: 100%\" [nzShowPagination]=\"false\">\r\n      <thead>\r\n      <tr>\r\n        <th>Name</th>\r\n        <th>Column Group</th>\r\n        <th>Order in Column Group</th>\r\n        <th>Data type</th>\r\n        <th>Necessity</th>\r\n        <th>Editable</th>\r\n        <th>Mappable</th>\r\n        <th></th>\r\n\r\n      </tr>\r\n      </thead>\r\n      <tbody>\r\n      <tr *ngFor=\"let data of basicTable.data\">\r\n        <td>{{data.name }}({{data.shortName}})</td>\r\n        <td>{{data.category?.label}}</td>\r\n        <td>{{data.inCategoryOrder}}</td>\r\n        <td>{{data.dataType}}</td>\r\n        <td>{{data.necessity }}</td>\r\n        <td>{{data.isEditable ? 'X' : ''}}</td>\r\n        <td>{{data.isMappable ? 'X' : ''}}</td>\r\n\r\n        <td>\r\n          <a (click)=\"delete(data)\"> <i class=\"fas fa-trash\"></i></a>\r\n\r\n        </td>\r\n      </tr>\r\n      </tbody>\r\n    </nz-table>\r\n    <div class=\"row mt-2\">\r\n      <div class=\"col-4 offset-8\">\r\n\r\n        <button nz-button nzType=\"link\" style=\"background:transparent;float: right ; color: #16868C ;border:none\" nzSize=\"small\" class=\"ml-2\"\r\n                (click)=\"validateAll()\">\r\n          Validate Fields\r\n        </button>\r\n        <button nz-button nzType=\"link\" style=\"background:transparent;float: right ; color : #D94938 ; border:none\"\r\n                nzSize=\"small\" (click)=\"clearAll()\">\r\n          Clear Fields\r\n        </button>\r\n\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</nz-card>\r\n"

/***/ }),

/***/ "./src/app/dcm/modules/administration/component/fields/fields.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/fields/fields.component.ts ***!
  \*********************************************************************************/
/*! exports provided: FieldsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldsComponent", function() { return FieldsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/dcm/modules/administration/store/configadmin.selectors */ "./src/app/dcm/modules/administration/store/configadmin.selectors.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @app/dcm/modules/administration/store/configadmin.actions */ "./src/app/dcm/modules/administration/store/configadmin.actions.ts");
/* harmony import */ var _app_dcm_modules_administration_component_datacheck_create_datacheck_create_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @app/dcm/modules/administration/component/datacheck-create/datacheck-create.component */ "./src/app/dcm/modules/administration/component/datacheck-create/datacheck-create.component.ts");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var _app_dcm_modules_administration_services_config_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @app/dcm/modules/administration/services/config.service */ "./src/app/dcm/modules/administration/services/config.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var FieldsComponent = /** @class */ (function () {
    function FieldsComponent(fb, message, store, dialog, configService, msg, cdrf, modalService) {
        this.fb = fb;
        this.message = message;
        this.store = store;
        this.dialog = dialog;
        this.configService = configService;
        this.msg = msg;
        this.cdrf = cdrf;
        this.modalService = modalService;
        this.fields = [];
        this.columns = [];
        this.datachecks = [];
        this.types = [];
        this.loadingadd = false;
        this.showDigit = false;
        this.formFields = this.fb.group({
            name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            shortName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            dataType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            isEditable: true,
            showInCollapsed: false,
            isMappable: true,
            skipDigits: false,
            necessity: 'mandatory',
            category: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            inCategoryOrder: [1, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    FieldsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select(_app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_4__["selectLob"]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])(function (data) { return data != undefined; })).subscribe(function (lob) {
            _this.currentLob = lob;
            _this.configService.getCategories(_this.currentLob).subscribe(function (liste) { return _this.columns = liste.categories; });
            _this.configService.getFields(_this.currentLob).subscribe(function (liste) { return _this.allfields = liste.fields; });
        });
        this.configService.getDatatypes().subscribe(function (liste) { return _this.types = liste.datatypes; });
        this.formFields.controls['dataType'].valueChanges.subscribe(function (type) {
            _this.getdatachecks(type);
        });
        this.store.select(_app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_4__["selectFields"]).subscribe(function (fields) {
            _this.fields = fields.slice();
            _this.cdrf.detectChanges();
        });
    };
    FieldsComponent.prototype.getdatachecks = function (type) {
        var _this = this;
        this.configService.getDatacheckforType(type).subscribe(function (data) { return _this.datachecksValidate = data.checkRules; });
        if (type === 'DOUBLEDT') {
            this.showDigit = true;
        }
        else {
            this.showDigit = false;
        }
    };
    FieldsComponent.prototype.delete = function (field) {
        var _this = this;
        this.modalService.confirm({
            nzTitle: ' delete Field',
            nzContent: 'Are you sure to continue? ',
            nzOnOk: function () {
                _this.fields = _this.fields.filter(function (f) {
                    return f.name !== field.name;
                });
                _this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_6__["ActionAddField"]({ field: _this.fields }));
                _this.cdrf.detectChanges();
            }
        });
    };
    FieldsComponent.prototype.addField = function () {
        var _this = this;
        if (this.checkFieldsAdded()) {
            this.message.create('error', 'this Field ' + this.formFields.value.name + 'Already Existe ');
        }
        else {
            this.loadingadd = true;
            var newDatacheck = this.datachecks.slice();
            var newField_1 = {
                checkRules: newDatacheck,
                lob: this.currentLob,
                name: this.formFields.value.name,
                shortName: this.formFields.value.shortName,
                code: this.formFields.value.name.trim().split(" ").join("_").toLowerCase(),
                dataType: this.formFields.value.dataType,
                necessity: this.formFields.value.necessity,
                isEditable: this.formFields.value.isEditable,
                showInCollapsed: this.formFields.value.showInCollapsed,
                isMappable: this.formFields.value.isMappable,
                category: this.formFields.value.category,
                inCategoryOrder: Number(this.formFields.value.inCategoryOrder),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            if (newField_1.dataType === 'DOUBLEDT') {
                newField_1.skipDecimalDigits = this.formFields.value.skipDigits;
            }
            this.configService.validate(newField_1).then(function (data) {
                if (data.ok) {
                    _this.fields.push(newField_1);
                    _this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_6__["ActionAddField"]({ field: _this.fields }));
                    _this.datachecks = [];
                    _this.formFields.reset({
                        name: null,
                        shortName: null,
                        dataType: null,
                        isEditable: true,
                        showInCollapsed: false,
                        isMappable: true,
                        necessity: 'mandatory',
                        category: null,
                        inCategoryOrder: 1
                    });
                    _this.cdrf.detectChanges();
                    _this.loadingadd = false;
                }
                else {
                    if (data.error.errors)
                        _this.msg.error(data.error.errors);
                    else
                        _this.msg.error('ERROR While Validation');
                    _this.loadingadd = false;
                }
            }, function (err) {
                if (err.error.errors) {
                    _this.msg.error(err.error.errors);
                    _this.loadingadd = false;
                    _this.cdrf.detectChanges();
                }
            });
        }
    };
    FieldsComponent.prototype.checkFieldsAdded = function () {
        var _this = this;
        return this.fields.filter(function (f) { return f.name.toLowerCase() === _this.formFields.value.name.toLowerCase(); }).length > 0;
    };
    FieldsComponent.prototype.newDatacheck = function () {
        var _this = this;
        var modal = this.dialog.open(_app_dcm_modules_administration_component_datacheck_create_datacheck_create_component__WEBPACK_IMPORTED_MODULE_7__["DatacheckCreateComponent"], {
            width: '60%',
            data: { checks: this.datachecksValidate, allFields: this.allfields }
        });
        modal.afterClosed().subscribe(function (result) {
            if (result) {
                _this.datachecks = _this.datachecks.filter(function (ds) { return ds.code !== result.code; });
                _this.datachecks.push(result);
                _this.datachecks = _this.datachecks.slice();
                _this.cdrf.detectChanges();
            }
        });
    };
    FieldsComponent.prototype.clearAll = function () {
        var _this = this;
        this.modalService.confirm({
            nzTitle: ' Clear Fields',
            nzContent: 'Are you sure to continue? ',
            nzOnOk: function () {
                _this.fields = [];
                _this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_6__["ActionAddField"]({ field: _this.fields }));
                _this.cdrf.detectChanges();
            }
        });
    };
    FieldsComponent.prototype.validateAll = function () {
        this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_6__["ActionValidateFields"]());
    };
    FieldsComponent.prototype.resetDatachecks = function () {
        this.datachecks = [];
    };
    FieldsComponent.prototype.deletedatachek = function (ds) {
        this.datachecks = this.datachecks.filter(function (datacheck) { return datacheck.type.code !== ds.type.code; });
    };
    FieldsComponent.prototype.changeCategory = function () {
        if (this.formFields.value.category)
            this.formFields.controls['inCategoryOrder'].patchValue(this.formFields.value.category.fieldsCount + 1);
        else {
            this.formFields.controls['inCategoryOrder'].patchValue(1);
        }
    };
    FieldsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'anms-fields',
            template: __webpack_require__(/*! ./fields.component.html */ "./src/app/dcm/modules/administration/component/fields/fields.component.html"),
            styles: [__webpack_require__(/*! ./fields.component.css */ "./src/app/dcm/modules/administration/component/fields/fields.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__["NzMessageService"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__["MatDialog"],
            _app_dcm_modules_administration_services_config_service__WEBPACK_IMPORTED_MODULE_9__["ConfigAdminService"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__["NzMessageService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__["NzModalService"]])
    ], FieldsComponent);
    return FieldsComponent;
}());



/***/ }),

/***/ "./src/app/dcm/modules/administration/component/general/general.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/general/general.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n.form-general {\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-direction: column;\r\n      flex-direction: column;\r\n}\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGNtL21vZHVsZXMvYWRtaW5pc3RyYXRpb24vY29tcG9uZW50L2dlbmVyYWwvZ2VuZXJhbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLDBCQUFzQjtNQUF0QixzQkFBc0I7QUFDeEIiLCJmaWxlIjoic3JjL2FwcC9kY20vbW9kdWxlcy9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnQvZ2VuZXJhbC9nZW5lcmFsLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLmZvcm0tZ2VuZXJhbCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/dcm/modules/administration/component/general/general.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/general/general.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<mat-card class=\" container  col-6\" style=\"margin-top: 6vh\">\r\n  <div >\r\n    <nz-alert nzType=\"warning\" nzMessage=\"please select a Line of Business to Continue !\" nzShowIcon *ngIf=\"!lobSelected\"></nz-alert>\r\n    <nz-alert nzType=\"info\" [nzMessage]=\"'you can manage fields for the line of business '+lobSelected.name\" nzShowIcon *ngIf=\"lobSelected\"></nz-alert>\r\n    <div class=\"form-general\">\r\n\r\n      <div class=\"col-12\">\r\n        <nz-form-item  >\r\n          <nz-form-control [nzSm]=\"24\" [nzXs]=\"24\">\r\n            <nz-select style=\"width: 100%\"\r\n                       nzSize=\"small\"\r\n                       [(ngModel)]=\"lobSelected\"\r\n                       (ngModelChange)=\"selectLob()\"\r\n                       [compareWith]=\"compareFn\"\r\n                       nzPlaceHolder=\"LOB\">\r\n              <nz-option *ngFor=\"let lob of lobs\" [nzLabel]=\"lob.name\" [nzValue]=\"lob\" ></nz-option>\r\n            </nz-select>\r\n\r\n          </nz-form-control>\r\n        </nz-form-item>\r\n\r\n      </div>\r\n    </div>\r\n  </div></mat-card>\r\n"

/***/ }),

/***/ "./src/app/dcm/modules/administration/component/general/general.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/general/general.component.ts ***!
  \***********************************************************************************/
/*! exports provided: GeneralComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralComponent", function() { return GeneralComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/dcm/modules/administration/store/configadmin.selectors */ "./src/app/dcm/modules/administration/store/configadmin.selectors.ts");
/* harmony import */ var _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/dcm/modules/administration/store/configadmin.actions */ "./src/app/dcm/modules/administration/store/configadmin.actions.ts");
/* harmony import */ var _app_dcm_modules_administration_services_config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/dcm/modules/administration/services/config.service */ "./src/app/dcm/modules/administration/services/config.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GeneralComponent = /** @class */ (function () {
    function GeneralComponent(store, cdrf, configService) {
        this.store = store;
        this.cdrf = cdrf;
        this.configService = configService;
        this.lobs = [];
    }
    GeneralComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.configService.getLobs().subscribe(function (liste) {
            _this.lobs = liste.lobs;
            _this.cdrf.detectChanges();
        });
        this.store.select(_app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_2__["selectLob"]).subscribe(function (data) {
            if (data)
                _this.lobSelected = data;
            _this.cdrf.detectChanges();
        });
    };
    GeneralComponent.prototype.selectLob = function () {
        this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_3__["ActionReset"]());
        this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_3__["ActionSelectLob"]({ lob: this.lobSelected }));
    };
    GeneralComponent.prototype.compareFn = function (o1, o2) {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };
    GeneralComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'anms-general',
            template: __webpack_require__(/*! ./general.component.html */ "./src/app/dcm/modules/administration/component/general/general.component.html"),
            styles: [__webpack_require__(/*! ./general.component.css */ "./src/app/dcm/modules/administration/component/general/general.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"],
            _app_dcm_modules_administration_services_config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigAdminService"]])
    ], GeneralComponent);
    return GeneralComponent;
}());



/***/ }),

/***/ "./src/app/dcm/modules/administration/component/group-cols/group-cols.component.css":
/*!******************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/group-cols/group-cols.component.css ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "  .newGroup{\r\n  color: #1d5687 !important;\r\n}\r\n\r\n:host >>> .mat-list-base .mat-list-item.mat-list-item-with-avatar , :host >>> .mat-list-base .mat-list-item{\r\n  height:40px\r\n}\r\n\r\n:host >>> .mat-list-base .mat-list-item .mat-list-icon{\r\n  font-size: 15px;\r\n}\r\n\r\n:host >>> .mat-list-base .mat-list-item{\r\n  font-size: 14px;\r\n}\r\n\r\n:host >>> .ant-card-body{\r\n  padding: 10px;\r\n}\r\n\r\n:host >>> .ant-form label{\r\n  font-size: 12px;\r\n}\r\n\r\n:host >>> .ant-form-vertical .ant-form-item-label  {\r\n  padding: 0;\r\n  line-height: 1;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGNtL21vZHVsZXMvYWRtaW5pc3RyYXRpb24vY29tcG9uZW50L2dyb3VwLWNvbHMvZ3JvdXAtY29scy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJFQUFFO0VBQ0EseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0U7QUFDRjs7QUFDQTtFQUNFLGVBQWU7QUFDakI7O0FBQ0E7RUFDRSxlQUFlO0FBQ2pCOztBQUNBO0VBQ0UsYUFBYTtBQUNmOztBQUNBO0VBQ0UsZUFBZTtBQUNqQjs7QUFDQTtFQUNFLFVBQVU7RUFDVixjQUFjO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvZGNtL21vZHVsZXMvYWRtaW5pc3RyYXRpb24vY29tcG9uZW50L2dyb3VwLWNvbHMvZ3JvdXAtY29scy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiICAubmV3R3JvdXB7XHJcbiAgY29sb3I6ICMxZDU2ODcgIWltcG9ydGFudDtcclxufVxyXG5cclxuOmhvc3QgPj4+IC5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1pdGVtLm1hdC1saXN0LWl0ZW0td2l0aC1hdmF0YXIgLCA6aG9zdCA+Pj4gLm1hdC1saXN0LWJhc2UgLm1hdC1saXN0LWl0ZW17XHJcbiAgaGVpZ2h0OjQwcHhcclxufVxyXG46aG9zdCA+Pj4gLm1hdC1saXN0LWJhc2UgLm1hdC1saXN0LWl0ZW0gLm1hdC1saXN0LWljb257XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG59XHJcbjpob3N0ID4+PiAubWF0LWxpc3QtYmFzZSAubWF0LWxpc3QtaXRlbXtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuOmhvc3QgPj4+IC5hbnQtY2FyZC1ib2R5e1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbn1cclxuOmhvc3QgPj4+IC5hbnQtZm9ybSBsYWJlbHtcclxuICBmb250LXNpemU6IDEycHg7XHJcbn1cclxuOmhvc3QgPj4+IC5hbnQtZm9ybS12ZXJ0aWNhbCAuYW50LWZvcm0taXRlbS1sYWJlbCAge1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgbGluZS1oZWlnaHQ6IDE7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/dcm/modules/administration/component/group-cols/group-cols.component.html":
/*!*******************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/group-cols/group-cols.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nz-card class=\"listData\">\r\n  <div class=\"container mt-3  \">\r\n    <div class=\"row\">\r\n      <div class=\"col-7\">\r\n\r\n        <form nz-form [formGroup]=\"groupForm\" class=\"row\" [nzLayout]=\"'vertical'\">\r\n          <div class=\"col-5 pr-0\">\r\n            <nz-form-item class=\"mb-1\">\r\n              <nz-form-label  nzRequired nzFor=\"label\">Group Label</nz-form-label>\r\n              <nz-form-control  >\r\n                <input nz-input formControlName=\"label\" id=\"label\" [nzSize]=\"'small'\"/>\r\n                <nz-form-explain *ngIf=\"groupForm.get('label')?.dirty && groupForm.get('label')?.errors\">\r\n                  the Label is Required to add a group Column !\r\n                </nz-form-explain>\r\n              </nz-form-control>\r\n            </nz-form-item>\r\n          </div>\r\n          <div class=\"col-5 pr-0\">\r\n\r\n          </div>\r\n          <div class=\"col-2\">\r\n            <nz-form-item nz-row style=\"margin-bottom:8px;\">\r\n              <nz-form-label nzFor=\"btn\"></nz-form-label>\r\n              <nz-form-control>\r\n                <button nz-button nzType=\"link\" (click)=\"addGroup()\" [disabled]=\"!groupForm.valid\"\r\n                        class=\"mt-2\"\r\n                        [nzSize]=\"'small'\">add to List\r\n                </button>\r\n              </nz-form-control>\r\n            </nz-form-item>\r\n          </div>\r\n\r\n\r\n        </form>\r\n        <mat-list style=\"width:100%\">\r\n          <div class=\"row\">\r\n            <h3 mat-subheader  >Column Group waiting Validation</h3>\r\n\r\n          </div>\r\n          <mat-list-item *ngFor=\"let group of newGroups\" class=\"row\">\r\n            <p mat-line class=\"col-9\">{{group.label}}</p>\r\n            <button mat-button   style=\"float:right\" (click)=\"delete(group)\"\r\n            [ngStyle]=\"{color:'#D9930D'}\">cancel</button>\r\n\r\n\r\n          </mat-list-item>\r\n        </mat-list>\r\n\r\n\r\n\r\n      </div>\r\n      <nz-divider nzType=\"vertical\" style=\"height: 450px\"  ></nz-divider>\r\n\r\n      <div class=\"col-3 pl-0 container\"  >\r\n        <mat-list>\r\n          <h3 mat-subheader>Existing Column Group List</h3>\r\n          <mat-list-item *ngFor=\"let group of groups\">\r\n            <mat-icon mat-list-icon>view_column</mat-icon>\r\n            <p mat-line > {{group.label}} </p>\r\n          </mat-list-item>\r\n\r\n        </mat-list>\r\n\r\n\r\n      </div>\r\n\r\n\r\n  </div>\r\n    <div class=\"row\" *ngIf=\"newGroups.length>0\">\r\n   <div class=\"col-4 offset-8\">\r\n     <button nz-button nzType=\"link\"\r\n             style=\"float: right ; color: #16868C ;border: none ;box-shadow: 0 0 0 rgba(0, 0, 0, 0.015)\"\r\n             (click)=\"ValidateAll()\"\r\n             nzSize=\"small\">\r\n       Validate Column Group\r\n     </button>\r\n       <button nz-button nzType=\"link\" style=\"float: right ; color : #D94938 ; border: none ;box-shadow: 0 0 0 rgba(0, 0, 0, 0.015) \" class=\"ml-2\" nzSize=\"small\"\r\n       (click)=\"clearAll()\">\r\n          Clear Column Group\r\n       </button>\r\n\r\n   </div>\r\n  </div>\r\n  </div>\r\n</nz-card>\r\n"

/***/ }),

/***/ "./src/app/dcm/modules/administration/component/group-cols/group-cols.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/component/group-cols/group-cols.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: GroupColsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupColsComponent", function() { return GroupColsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/dcm/modules/administration/store/configadmin.selectors */ "./src/app/dcm/modules/administration/store/configadmin.selectors.ts");
/* harmony import */ var _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @app/dcm/modules/administration/store/configadmin.actions */ "./src/app/dcm/modules/administration/store/configadmin.actions.ts");
/* harmony import */ var _app_dcm_modules_administration_services_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @app/dcm/modules/administration/services/config.service */ "./src/app/dcm/modules/administration/services/config.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var GroupColsComponent = /** @class */ (function () {
    function GroupColsComponent(fb, message, store, configService, modalService, cdrf) {
        this.fb = fb;
        this.message = message;
        this.store = store;
        this.configService = configService;
        this.modalService = modalService;
        this.cdrf = cdrf;
        this.newGroups = [];
        this.groupForm = this.fb.group({
            label: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    GroupColsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select(_app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_4__["selectGroups"]).subscribe(function (liste) {
            _this.newGroups = liste.slice();
            _this.cdrf.detectChanges();
        });
        this.store.select(_app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_4__["selectLob"]).subscribe(function (lob) {
            _this.currentLob = lob;
            _this.configService.getCategories(lob).subscribe(function (liste) {
                if (liste)
                    _this.groups = liste.categories;
            });
        });
        this.store.select(_app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_4__["selectDone"]).subscribe(function (done) {
            if (done) {
                _this.configService.getCategories(_this.currentLob).subscribe(function (liste) {
                    if (liste)
                        _this.groups = liste.categories;
                    _this.cdrf.detectChanges();
                });
            }
        });
    };
    GroupColsComponent.prototype.addGroup = function () {
        var _this = this;
        var group = {
            code: this.groupForm.value.label.trim().split(" ").join("_").toLowerCase(),
            label: this.groupForm.value.label,
            name: this.groupForm.value.label
        };
        this.configService.validateGroup(this.currentLob.id, group).then(function (result) {
            if (result.ok) {
                _this.newGroups.push(group);
                _this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_5__["ActionAddGroup"]({ group: _this.newGroups }));
                _this.groupForm.reset();
            }
        }, function (err) {
            var message = "";
            if (err.error.errors) {
                message = err.error.errors;
            }
            else
                message = "ERROR with Input  ";
            _this.message.error(message);
        });
    };
    GroupColsComponent.prototype.delete = function (group) {
        var _this = this;
        this.modalService.confirm({
            nzTitle: ' delete Group Column',
            nzContent: 'Are you sure to continue? ',
            nzOnOk: function () {
                _this.newGroups = _this.newGroups.filter(function (gr) { return gr.label !== group.label; });
                _this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_5__["ActionAddGroup"]({ group: _this.newGroups }));
                _this.cdrf.detectChanges();
            }
        });
    };
    GroupColsComponent.prototype.clearAll = function () {
        var _this = this;
        this.modalService.confirm({
            nzTitle: ' Clear group Columns',
            nzContent: 'Are you sure to continue? ',
            nzOnOk: function () {
                _this.newGroups = [];
                _this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_5__["ActionAddGroup"]({ group: _this.newGroups }));
                _this.cdrf.detectChanges();
            }
        });
    };
    GroupColsComponent.prototype.ValidateAll = function () {
        this.store.dispatch(new _app_dcm_modules_administration_store_configadmin_actions__WEBPACK_IMPORTED_MODULE_5__["ActionValidateGroups"]());
        this.cdrf.detectChanges();
    };
    GroupColsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'anms-group-cols',
            template: __webpack_require__(/*! ./group-cols.component.html */ "./src/app/dcm/modules/administration/component/group-cols/group-cols.component.html"),
            styles: [__webpack_require__(/*! ./group-cols.component.css */ "./src/app/dcm/modules/administration/component/group-cols/group-cols.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__["NzMessageService"],
            _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"], _app_dcm_modules_administration_services_config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigAdminService"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_2__["NzModalService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], GroupColsComponent);
    return GroupColsComponent;
}());



/***/ }),

/***/ "./src/app/dcm/modules/administration/container/setting/setting.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/container/setting/setting.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "::ng-deep .listData{\r\n  height: 520px !important;\r\n  overflow-x: auto !important;\r\n}\r\n:host >>> .ant-select-selection.ant-select-selection--single {\r\n  border-radius: 5px !important;\r\n  border-color: #7ccdcf;\r\n  border-width: 1px;\r\n}\r\n:host >>> .mat-tab-body-content{\r\n  overflow-x: hidden;\r\n}\r\n:host >>> .ant-card{\r\n  background: #ffffff73;\r\n  min-height: 90vh !important;\r\n}\r\n:host >>> .ant-select-dropdown-menu-item {\r\n  color: #1fa6b8 !important;\r\n  text-align: center !important;\r\n}\r\n:host >>> .ant-select-selection__rendered{\r\n  width: 93%;\r\n  text-align: center;\r\n  border-right :1px solid #2da5b9 !important;\r\n}\r\n:host >>> .ant-btn .anticon {\r\n  vertical-align: middle;\r\n  line-height: 0;\r\n}\r\n:host >>> .ant-btn > .anticon + span {\r\n  margin-left: 1px;\r\n}\r\n:host >>> .ant-btn[disabled], :host >>> .ant-btn[disabled]:hover{\r\n  background: transparent;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGNtL21vZHVsZXMvYWRtaW5pc3RyYXRpb24vY29udGFpbmVyL3NldHRpbmcvc2V0dGluZy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usd0JBQXdCO0VBQ3hCLDJCQUEyQjtBQUM3QjtBQUNBO0VBQ0UsNkJBQTZCO0VBQzdCLHFCQUFxQjtFQUNyQixpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UscUJBQXFCO0VBQ3JCLDJCQUEyQjtBQUM3QjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLDZCQUE2QjtBQUMvQjtBQUNBO0VBQ0UsVUFBVTtFQUNWLGtCQUFrQjtFQUNsQiwwQ0FBMEM7QUFDNUM7QUFDQTtFQUNFLHNCQUFzQjtFQUN0QixjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLHVCQUF1QjtBQUN6QiIsImZpbGUiOiJzcmMvYXBwL2RjbS9tb2R1bGVzL2FkbWluaXN0cmF0aW9uL2NvbnRhaW5lci9zZXR0aW5nL3NldHRpbmcuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIjo6bmctZGVlcCAubGlzdERhdGF7XHJcbiAgaGVpZ2h0OiA1MjBweCAhaW1wb3J0YW50O1xyXG4gIG92ZXJmbG93LXg6IGF1dG8gIWltcG9ydGFudDtcclxufVxyXG46aG9zdCA+Pj4gLmFudC1zZWxlY3Qtc2VsZWN0aW9uLmFudC1zZWxlY3Qtc2VsZWN0aW9uLS1zaW5nbGUge1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweCAhaW1wb3J0YW50O1xyXG4gIGJvcmRlci1jb2xvcjogIzdjY2RjZjtcclxuICBib3JkZXItd2lkdGg6IDFweDtcclxufVxyXG46aG9zdCA+Pj4gLm1hdC10YWItYm9keS1jb250ZW50e1xyXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcclxufVxyXG46aG9zdCA+Pj4gLmFudC1jYXJke1xyXG4gIGJhY2tncm91bmQ6ICNmZmZmZmY3MztcclxuICBtaW4taGVpZ2h0OiA5MHZoICFpbXBvcnRhbnQ7XHJcbn1cclxuOmhvc3QgPj4+IC5hbnQtc2VsZWN0LWRyb3Bkb3duLW1lbnUtaXRlbSB7XHJcbiAgY29sb3I6ICMxZmE2YjggIWltcG9ydGFudDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXIgIWltcG9ydGFudDtcclxufVxyXG46aG9zdCA+Pj4gLmFudC1zZWxlY3Qtc2VsZWN0aW9uX19yZW5kZXJlZHtcclxuICB3aWR0aDogOTMlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBib3JkZXItcmlnaHQgOjFweCBzb2xpZCAjMmRhNWI5ICFpbXBvcnRhbnQ7XHJcbn1cclxuOmhvc3QgPj4+IC5hbnQtYnRuIC5hbnRpY29uIHtcclxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gIGxpbmUtaGVpZ2h0OiAwO1xyXG59XHJcbjpob3N0ID4+PiAuYW50LWJ0biA+IC5hbnRpY29uICsgc3BhbiB7XHJcbiAgbWFyZ2luLWxlZnQ6IDFweDtcclxufVxyXG46aG9zdCA+Pj4gLmFudC1idG5bZGlzYWJsZWRdLCA6aG9zdCA+Pj4gLmFudC1idG5bZGlzYWJsZWRdOmhvdmVye1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/dcm/modules/administration/container/setting/setting.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/container/setting/setting.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"full-h\" fxLayout=\"column\" fxLayoutAlign=\"start\">\r\n\r\n  <div style=\"width: calc(100% - 155px);\r\n    margin-left: 140px;\r\n    margin-right: 5px;\r\n\"  >\r\n <mat-tab-group class=\"demo-tab-group\">\r\n    <mat-tab label=\"General\">\r\n      <ng-template matTabContent>\r\n        <anms-general></anms-general>\r\n      </ng-template>\r\n    </mat-tab>\r\n    <mat-tab label=\"Column Group\" [disabled]=\"!lobSelected\">\r\n      <ng-template matTabContent>\r\n        <anms-group-cols></anms-group-cols>\r\n      </ng-template>\r\n    </mat-tab>\r\n    <mat-tab label=\"Field Informations\" [disabled]=\"!lobSelected\" >\r\n      <ng-template matTabContent>\r\n        <anms-fields></anms-fields>\r\n      </ng-template>\r\n    </mat-tab>\r\n    <mat-tab label=\"Datacheck\" [disabled]=\"!lobSelected\">\r\n      <ng-template matTabContent>\r\n        <anms-datachecks></anms-datachecks>\r\n      </ng-template>\r\n    </mat-tab>\r\n  </mat-tab-group>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/dcm/modules/administration/container/setting/setting.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/dcm/modules/administration/container/setting/setting.component.ts ***!
  \***********************************************************************************/
/*! exports provided: SettingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingComponent", function() { return SettingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm5/store.js");
/* harmony import */ var _app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/dcm/modules/administration/store/configadmin.selectors */ "./src/app/dcm/modules/administration/store/configadmin.selectors.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingComponent = /** @class */ (function () {
    function SettingComponent(store) {
        this.store = store;
    }
    SettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select(_app_dcm_modules_administration_store_configadmin_selectors__WEBPACK_IMPORTED_MODULE_2__["selectLob"]).subscribe(function (data) {
            _this.lobSelected = data !== null && data !== undefined;
        });
    };
    SettingComponent.prototype.ngOnDestroy = function () {
    };
    SettingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'anms-setting',
            template: __webpack_require__(/*! ./setting.component.html */ "./src/app/dcm/modules/administration/container/setting/setting.component.html"),
            styles: [__webpack_require__(/*! ./setting.component.css */ "./src/app/dcm/modules/administration/container/setting/setting.component.css")]
        }),
        __metadata("design:paramtypes", [_ngrx_store__WEBPACK_IMPORTED_MODULE_1__["Store"]])
    ], SettingComponent);
    return SettingComponent;
}());



/***/ })

}]);
//# sourceMappingURL=modules-administration-administration-module.js.map