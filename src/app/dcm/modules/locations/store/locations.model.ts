export interface Locations {
  city: string
  geolocation : string
  other : string
}

export interface LocationsState {
  Locations : Locations[];
  loaded : boolean;
  loading: boolean;
  failed: boolean;
}
