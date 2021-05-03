
export const columnDefsStructure = [
    {
        headerName: '#',
        width: 37,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        resizable: false,
        sortable: false,
        filter: false,
        editable: false,
        menuTabs: false,
        scrollable: false,
        paginator: false,
        suppressMenu: true,
        cellStyle: { 'border-left': '0px' },
        // fixed left side
        pinned: true
    },
    {
        headerName: '',
        field: 'edit_buttons',
        children: [
            {
                headerName: '',
                field: 'edit',
                width: 32,
                resizable: false,
                sortable: false,
                filter: false,
                editable: false,
                menuTabs: false,
                scrollable: false,
                paginator: false,
                headerComponent: 'headerEditComponent',
                // fixed left side
                pinned: true,
                cellRenderer: (data) => {
                    return `
                    <div class="center-buttons">
                        <span class="ms-2"><i class="fas fa-edit" (click)="invokeEditMethod()" style="color: gray"></i> </span>
                    </div>
                    `;
                }
            },
            {
                headerName: '',
                field: 'locatio',
                width: 32,
                resizable: false,
                sortable: false,
                menuTabs: false,
                filter: false,
                editable: false,
                scrollable: false,
                paginator: false,
                headerComponent: 'headerGeocodeComponent',
                // fixed left side
                pinned: true,
                cellRenderer: (data) => {
                    return `
                    <div class="center-buttons">
                        <span class="ms-2"><i class="fas fa-map-marked" (click)="invokeGeocodeMethod()" style="color: #0292AB"></i></span>
                    </div>
                    `;
                }
            },
            {
                headerName: '',
                field: 'suppr',
                width: 40,
                resizable: true,
                sortable: false,
                filter: false,
                headerComponent: 'headerSuppComponent',
                // menuTabs: false,
                // headerComponent: 'sortableHeaderComponent',
                editable: false,
                scrollable: false,
                paginator: false,
                // fixed left side
                pinned: true,
                cellRenderer: (data) => {
                    return `
                    <div class="center-buttons">
                      <span class="ms-2"><i class="fas fa-trash-alt" (click)="showModal()" style="color: red"></i></span>
                    </div>
                    `;
                }
            }
        ],
    },
    {
        headerName: 'Site',
        scrollable: false,
        headerGroupComponent: 'headerGroupComponent',
        children: [
            {
                headerName: 'Name',
                field: this.prefix + 'locationName',
                expanded: false,
                enableRowGroup: true,
                enablePivot: true,
                cellStyle: { 'border-left': '0px' },
                // filter: 'agTextColumnFilter'
            },
            {
                headerName: 'Division',
                field: this.prefix + 'division',
                expanded: false,
                enableRowGroup: true,
                enablePivot: true,
                columnGroupShow: 'open'
            }
        ]
    },
    {
        headerName: 'Geographical',
        scrollable: true,
        collapsable: true,
        headerGroupComponent: 'headerGroupComponent',
        children: [
            {
                headerName: 'Country',
                field: this.prefix + 'country',
                expanded: false,
                // cellRenderer: 'deltaIndicator',
                // cellStyle: {color: 'dark'},
                with: 160,
                enableRowGroup: true,
                enablePivot: true,
                // filter: true
            },

            {
                headerName: 'State',
                field: this.prefix + 'state',
                expanded: true,
                filter: true,
                menuTabs: ['filterMenuTab', 'generalMenuTab'],
                with: 160,
                enableRowGroup: true,
                enablePivot: true,
            },

            {
                headerName: 'County',
                field: this.prefix + 'county',
                expanded: true,
                enableRowGroup: true,
                enablePivot: true,
                columnGroupShow: 'open'
            },

            {
                headerName: 'City',
                field: this.prefix + 'city',
                expanded: true,
                enableRowGroup: true,
                enablePivot: true,
                columnGroupShow: 'open'
            },

            {
                headerName: 'Street',
                field: this.prefix + 'street',
                expanded: true,
                columnGroupShow: 'open',
                enableRowGroup: true,
                enablePivot: true,
            },

            {
                headerName: 'ZipCode',
                field: this.prefix + 'zipCode',
                expanded: true,
                columnGroupShow: 'open'
            },

            {
                headerName: 'OriginalAddress',
                field: this.prefix + 'originalAddress',
                expanded: true,
                columnGroupShow: 'open'
            },

            {
                headerName: 'Latitude',
                field: this.prefix + 'latitude',
                expanded: true,
                columnGroupShow: 'open'
            },

            {
                headerName: 'Longitude',
                field: this.prefix + 'longitude',
                expanded: true,
                columnGroupShow: 'open'
            },

            {
                headerName: 'Accuracy',
                field: this.prefix + 'accuracy',
                expanded: false,
                columnGroupShow: 'open'
            },

            {
                headerName: 'Geocode',
                field: this.prefix + 'geocode',
                expanded: true,
                columnGroupShow: 'open'
            },

            {
                headerName: 'Geocoder',
                field: this.prefix + 'geocoder',
                expanded: true,
                columnGroupShow: 'open'
            },

            {
                headerName: 'GeocodingValidated',
                field: this.prefix + 'geocodingValidated',
                expanded: true,
                columnGroupShow: 'open'

            }
        ]
    },
    {
        headerName: 'Insured Values',
        scrollable: true,
        collapsable: true,
        headerGroupComponent: 'headerGroupComponent',
        children: [
            {
                headerName: 'SiteCurrency',
                field: this.prefix + 'siteCurrency',
                with: 160,
                enableRowGroup: true,
                enablePivot: true,
                expanded: false
            },
            {
                headerName: 'Tiv',
                field: this.prefix + 'tiv',
                with: 160,
                enableRowGroup: true,
                enablePivot: true,
                expanded: false
            },
            {
                headerName: 'Building',
                field: this.prefix + 'building',
                expanded: true,
                columnGroupShow: 'open'
            },
            {
                headerName: 'Stock',
                field: this.prefix + 'stock',
                expanded: true,
                columnGroupShow: 'open'
            },
            {
                headerName: 'Machinery',
                field: this.prefix + 'machinery',
                expanded: true,
                columnGroupShow: 'open'
            },
            {
                headerName: 'Content',
                field: this.prefix + 'content',
                expanded: true,
                columnGroupShow: 'open'
            },
            {
                headerName: 'PbValue',
                field: this.prefix + 'pbValue',
                expanded: true,
                columnGroupShow: 'open'
            },
            {
                headerName: 'BiType',
                field: this.prefix + 'biType',
                expanded: true,
                columnGroupShow: 'open'
            },
            {
                headerName: 'Eip',
                field: this.prefix + 'eip',
                expanded: true,
                columnGroupShow: 'open'
            },
            {
                headerName: 'DeclarationPeriod',
                field: this.prefix + 'declarationPeriod',
                expanded: true,
                columnGroupShow: 'open'
            },
            {
                headerName: 'BiValue',
                field: this.prefix + 'biValue',
                expanded: true,
                columnGroupShow: 'open'
            },
            {
                headerName: 'ForInterest',
                field: this.prefix + 'forInterest',
                expanded: true,
                columnGroupShow: 'open'
            },
            {
                headerName: 'Interest',
                field: this.prefix + 'interest',
                expanded: true,
                columnGroupShow: 'open'
            },
        ]
    },
    {
        headerName: 'Primary Characteristics',
        scrollable: true,
        collapsable: true,
        headerGroupComponent: 'headerGroupComponent',
        children: [
            {
                headerName: 'OccupancySource', field: 'occupancySource', with: 160, expanded: false, enableRowGroup: true,
                enablePivot: true
            },
            {
                headerName: 'OccupancyClass', field: 'occupancyClass', with: 160, expanded: true, enableRowGroup: true,
                enablePivot: true
            },
            {
                headerName: 'OccupancySubClass', field: 'occupancySubClass', with: 160, expanded: true, enableRowGroup: true,
                enablePivot: true
            },
            {
                headerName: 'OccupancyCode', field: 'occupancyCode', with: 160, expanded: false, enableRowGroup: true,
                enablePivot: true
            },
            { headerName: 'OccupancyScheme', field: 'occupancyScheme', expanded: true, columnGroupShow: 'open' },
            { headerName: 'ConstructionSource', field: 'constructionSource', expanded: false, columnGroupShow: 'open' },
            { headerName: 'ConstructionClass', field: 'constructionClass', expanded: true, columnGroupShow: 'open' },
            { headerName: 'ConstructionCode', field: 'constructionCode', expanded: false, columnGroupShow: 'open' },
            { headerName: 'ConstructionScheme', field: 'constructionScheme', expanded: true, columnGroupShow: 'open' },
        ]
    },
    {
        headerName: 'Secondary Characteristics',
        scrollable: true,
        collapsable: true,
        headerGroupComponent: 'headerGroupComponent',
        children: [
            {
                headerName: 'YearBuilt', field: 'yearBuilt', with: 160, expanded: false, enableRowGroup: true,
                enablePivot: true
            },
            {
                headerName: 'NumberOfStories', field: 'numberOfStories', with: 160, expanded: true, enableRowGroup: true,
                enablePivot: true
            },
            {
                headerName: 'LargestUnitCapacity', field: 'largestUnitCapacity', expanded: true, columnGroupShow: 'open', enableRowGroup: true,
                enablePivot: true
            },
            { headerName: 'IsAggregation', field: 'isAggregation', expanded: true, columnGroupShow: 'open' },
            { headerName: 'NumberOfBuilding', field: 'numberOfBuilding', expanded: false, columnGroupShow: 'open' },
        ]
    }
];