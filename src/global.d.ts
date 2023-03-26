import {SvgIconWrapperProps} from './components/SvgIconWrapper';

export type IconProps = SvgIconWrapperProps & {
  size: number;
  color: string;
};

type officialCommon = {
  official: string;
  common: string;
};

type nameSymbol = {
  name: string;
  symbol: string;
};

type Flags = {
  png: string;
  svg: string;
  alt: string;
};

type Name = {
  common: string;
  official: string;
  nativeName: Record<string, officialCommon>;
};

export type CountryDetails = {
  name: Name;
  cca2: string;
  cca3: string;
  independent?: boolean;
  currencies?: Record<string, nameSymbol>;
  capital: string[];
  region: string;
  subregion?: string;
  languages?: Record<string, string>;
  latlng?: number[];
  borders?: string[];
  area?: number;
  population: bigint;
  timezones?: string[];
  continents?: string[];
  flags: Flags;
  // for optimization
  isComplete: boolean;
};
