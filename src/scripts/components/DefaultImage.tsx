export default function DefaultImage({
  colors,
  className,
  ...props
}: {
  colors?: string[] | string
  className?: string
}) {
  let primary = 'white'
  colors = colors || []
  if (typeof colors === 'string') colors = [colors]
  colors = colors.filter((color) => color.length > 0) || []
  let [secondary = 'd3d3d3', secondary2 = null] = colors
  let amount = 0
  function luminanceIsLight(hex: string) {
    let rgb = [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ]
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2] > 0.5
  }
  for (let color of colors) {
    if (luminanceIsLight(color)) amount++
    else amount--
  }
  if (amount > 0) primary = '#000'

  return (
    <svg
      viewBox='0 0 100 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
    >
      <rect width='100' height='100' rx='12' fill={primary} />
      <ellipse
        cx='49.5'
        cy='27'
        rx='18.5'
        ry='18'
        fill={
          colors.length > 1 ? 'url(#paint0_linear_72_990)' : '#' + secondary
        }
      />
      <path
        d='M21 70C21 58.9543 29.9543 50 41 50H58C69.0457 50 78 58.9543 78 70V85C78 87.7614 75.7614 90 73 90H26C23.2386 90 21 87.7614 21 85V70Z'
        fill={
          colors.length > 1 ? 'url(#paint1_linear_72_990)' : '#' + secondary
        }
      />
      {secondary2 && (
        <defs>
          <linearGradient
            id='paint0_linear_72_990'
            x1='36.5'
            y1='14.5'
            x2='62'
            y2='40'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor={'#' + secondary} />
            <stop offset='1' stopColor={'#' + secondary2} stopOpacity='1' />
          </linearGradient>
          <linearGradient
            id='paint1_linear_72_990'
            x1='29.5'
            y1='53.5'
            x2='66'
            y2='90'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor={'#' + secondary} />
            <stop offset='1' stopColor={'#' + secondary2} stopOpacity='1' />
          </linearGradient>
        </defs>
      )}
    </svg>
  )
}
