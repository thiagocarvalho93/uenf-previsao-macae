export const BUCKET_URL =
  'https://uenf-previsao-macae-582cc1c5-be96-433d-986b-0973a3ba64c6.s3.us-east-1.amazonaws.com'

export const HOURS = ['00Z', '03Z', '06Z', '09Z', '12Z', '15Z', '18Z', '21Z']
export const HOURS_RADIATION = ['12Z', '15Z', '18Z']
export const HOURS_PRECIPITATION = ['03Z', '06Z', '09Z', '12Z', '15Z', '18Z', '21Z']
export const GRIDS = ['g1', 'g2', 'g3']

// variaveis
export const FILE_PREFIX_MAP = new Map([
  ['Temperatura', 'temp'],
  ['Precipitacao', 'prec'],
  ['Radiacao', 'solar'],
  ['Pressao', 'slp'],
])
// export const VARIABLES = [...FILE_PREFIX_MAP.keys()]
export const VARIABLES = {
  TEMPERATURE: {
    TEXT: 'Temperatura',
    PREFIX: 'temp',
    ICON: 'thermostat',
  },
  PRECIPITATION: {
    TEXT: 'Precipitacao',
    PREFIX: 'prec',
    ICON: 'water_drop',
  },
  SOLAR: {
    TEXT: 'Radiacao',
    PREFIX: 'solar',
    ICON: 'wb_sunny',
  },
  PRESSURE: {
    TEXT: 'Pressao',
    PREFIX: 'slp',
    ICON: 'compress',
  },
}
