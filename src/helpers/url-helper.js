import { BUCKET_URL, FILE_PREFIX_MAP } from 'src/constants/constants'

export const getImageUrl = (variable, formattedDate, formattedHour, grid) => {
  return `${BUCKET_URL}/${variable}/${FILE_PREFIX_MAP.get(variable)}_${grid}_${formattedDate}_${formattedHour}.png`
}
