import { BUCKET_URL, FILE_PREFIX_MAP } from 'src/constants/constants'

export const getImageUrl = (variable, formattedDate, formattedHour) => {
  return `${BUCKET_URL}/${variable}/${FILE_PREFIX_MAP.get(variable)}_g1_${formattedDate}_${formattedHour}.png`
}
