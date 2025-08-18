import { Box } from '@mui/material'

export function Flag({ code, sx }) {
    return (
        <Box
            component="img"
            loading="lazy"
            sx={{
                width: '100%',
                objectFit: 'cover',
                aspectRatio: '26/20',
                verticalAlign: 'middle',
                ...sx,
            }}
            src={
                code === 'TW'
                    ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Flag_of_Chinese_Taipei_for_Olympic_games.svg/1200px-Flag_of_Chinese_Taipei_for_Olympic_games.svg.png'
                    : `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`
            }
            alt=""
        />
    )
}
// /`https://flagcdn.com/w20/.png`
