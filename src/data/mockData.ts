export type LegalEntity = '11' | '12'; // Europe = '11', South America = '12'
export type Version = 'Actual' | 'Budget';
export type Currency = 'BRL' | 'USD' | 'EUR';

export interface Filters {
  legalEntity: LegalEntity;
  version: Version;
  currency: Currency;
}

export interface Metrics {
  [key: string]: {
    [region: string]: number;
  };
}

export interface DataItem {
  article: string;
  legalEntity?: LegalEntity;  // Making these optional for nested items
  version?: Version;
  currency?: Currency;
  metrics: Metrics;
  originalMetrics?: Metrics;
  nestedRows?: DataItem[];
}

export interface MockData {
  regions: {
    [key in LegalEntity]: string[];
  };
  data: DataItem[];
}

export const mockData: MockData = {
  regions: {
    '11': ['Europe', 'Germany', 'Italy'],
    '12': ['South America', 'Brazil', 'Argentina'],
  },
  data: [
    {
      article: "Bikes",
      legalEntity: '11',
      version: 'Actual',
      currency: 'BRL',
      metrics: {
        Units: { Germany: 100, Italy: 150, Europe: 250 },
        'Unit Price': { Germany: 500, Italy: 400, Europe: 450 },
        'Gross Revenue': { Germany: 50000, Italy: 60000, Europe: 110000 },
      },
      nestedRows: [
        {
          article: "Mountain Bikes",
          legalEntity: '11',
          version: 'Actual',
          currency: 'BRL',
          metrics: {
            Units: { Germany: 60, Italy: 90 },
            "Unit Price": { Germany: 800, Italy: 700 },
            "Gross Revenue": { Germany: 48000, Italy: 63000 }
          }
        },
        {
          article: "Road Bikes",
          legalEntity: '11',
          version: 'Actual',
          currency: 'BRL',
          metrics: {
            Units: { Germany: 40, Italy: 60 },
            "Unit Price": { Germany: 1000, Italy: 900 },
            "Gross Revenue": { Germany: 40000, Italy: 54000 }
          }
        }
      ]
    },
    {
      article: "Complementary Products",
      legalEntity: '11',
      version: 'Actual',
      currency: 'BRL',
      metrics: {
        Units: { Germany: 80, Italy: 50, Europe: 130 },
        'Unit Price': { Germany: 50, Italy: 60, Europe: 55 },
        'Gross Revenue': { Germany: 4000, Italy: 3000, Europe: 7000 },
      },
      nestedRows: [
        {
          article: "Helmets",
          legalEntity: '11',
          version: 'Actual',
          currency: 'BRL',
          metrics: {
            Units: { Germany: 50, Italy: 40 },
            "Unit Price": { Germany: 200, Italy: 250 },
            "Gross Revenue": { Germany: 10000, Italy: 10000 }
          }
        },
        {
          article: "Gloves",
          legalEntity: '11',
          version: 'Actual',
          currency: 'BRL',
          metrics: {
            Units: { Germany: 30, Italy: 10 },
            "Unit Price": { Germany: 100, Italy: 80 },
            "Gross Revenue": { Germany: 3000, Italy: 800 }
          }
        }
      ]
    },
    {
      article: "Bikes",
      legalEntity: '12',
      version: 'Actual',
      currency: 'BRL',
      metrics: {
        Units: { Brazil: 200, Argentina: 180, "South America": 380 },
        'Unit Price': { Brazil: 600, Argentina: 550, "South America": 575 },
        'Gross Revenue': { Brazil: 120000, Argentina: 99000, "South America": 219000 },
      },
      nestedRows: [
        {
          article: "Mountain Bikes",
          legalEntity: '12',
          version: 'Actual',
          currency: 'BRL',
          metrics: {
            Units: { Brazil: 120, Argentina: 110 },
            "Unit Price": { Brazil: 800, Argentina: 750 },
            "Gross Revenue": { Brazil: 96000, Argentina: 82500 }
          }
        },
        {
          article: "Road Bikes",
          legalEntity: '12',
          version: 'Actual',
          currency: 'BRL',
          metrics: {
            Units: { Brazil: 80, Argentina: 70 },
            "Unit Price": { Brazil: 1000, Argentina: 900 },
            "Gross Revenue": { Brazil: 80000, Argentina: 63000 }
          }
        }
      ]
    },
    {
      article: "Complementary Products",
      legalEntity: '12',
      version: 'Actual',
      currency: 'BRL',
      metrics: {
        Units: { Brazil: 90, Argentina: 85, "South America": 175 },
        'Unit Price': { Brazil: 50, Argentina: 60, "South America": 55 },
        'Gross Revenue': { Brazil: 4500, Argentina: 5100, "South America": 9600 },
      },
      nestedRows: [
        {
          article: "Helmets",
          legalEntity: '12',
          version: 'Actual',
          currency: 'BRL',
          metrics: {
            Units: { Brazil: 60, Argentina: 50 },
            "Unit Price": { Brazil: 200, Argentina: 220 },
            "Gross Revenue": { Brazil: 12000, Argentina: 11000 }
          }
        },
        {
          article: "Gloves",
          legalEntity: '12',
          version: 'Actual',
          currency: 'BRL',
          metrics: {
            Units: { Brazil: 30, Argentina: 35 },
            "Unit Price": { Brazil: 100, Argentina: 80 },
            "Gross Revenue": { Brazil: 3000, Argentina: 2800 }
          }
        }
      ]
    },
  ],
};


export const currencyConversionRates: Record<string, number> = {
  BRL: 1,
  USD: 0.19,
  EUR: 0.17,
};
