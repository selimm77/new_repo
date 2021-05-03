export interface Matching {
  city: string
  geolocation : string
  other : string
}

export interface MatchingState {
  matching : Matching[];
  loaded : boolean;
  loading: boolean;
  failed: boolean;
}

