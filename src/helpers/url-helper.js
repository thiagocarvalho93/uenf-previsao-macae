import { BUCKET_URL } from 'src/constants/constants'

export const getImageUrl = (variable, formattedDate, formattedHour, grid) => {
  return `${BUCKET_URL}/${variable.TEXT}/${variable.PREFIX}_${grid}_${formattedDate}_${formattedHour}.png`
}
