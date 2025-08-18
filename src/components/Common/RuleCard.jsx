import titleBg from 'assets/images/title-bg.png'
import { Box, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { Button } from './Button'
import { useTranslation } from 'react-i18next'

RuleCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    onClick: PropTypes.func,
}

export function RuleCard({ title, description, imageUrl, onClick }) {
    const { t } = useTranslation()
    return (
        <Stack
            spacing={1}
            sx={{
                height: '100%',
                '&:hover': {
                    cursor: 'pointer',

                    img: {
                        transform: 'scale(1.1)',
                    },
                    '.title-wrapper': {
                        filter: 'drop-shadow(0px 0px 5px #ffba00)',
                    },

                    transition: '0.35s',
                },
            }}
        >
            <Box>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    className="title-wrapper"
                    sx={{
                        width: '100%',
                        backgroundImage: `url(${titleBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        aspectRatio: '507/193',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            fontFamily: 'BlowBrush',
                            color: '#ffba00',
                            textAlign: 'center',
                            transition: '0.35s',
                        }}
                    >
                        {title}
                    </Typography>
                </Stack>

                <Box
                    boxShadow={3}
                    sx={{
                        borderRadius: '4px',
                        overflow: 'hidden',
                        aspectRatio: '373/524',
                    }}
                >
                    <Box
                        component="img"
                        width="100%"
                        height="100%"
                        alt={title}
                        src={imageUrl}
                        sx={{
                            verticalAlign: 'middle',
                            objectFit: 'cover',
                            transition: '0.35s',
                        }}
                    />
                </Box>
            </Box>

            <Box
                flexGrow={1}
                dangerouslySetInnerHTML={{ __html: description }}
            />

            <Box>
                <Button
                    onClick={onClick}
                    className="button"
                    sx={{
                        maxWidth: 200,
                        width: '100%',
                        mx: 'auto',
                        transition: '0.35s',
                    }}
                >
                    {t('see-more')}
                </Button>
            </Box>
        </Stack>
    )
}
