import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined'
import { Box, Container, IconButton, Stack, Typography } from '@mui/material'
import facebook from 'assets/images/FB_icon.png'
import footerBg from 'assets/images/footer-bg.png'
import instagram from 'assets/images/instagram.png'
import logo from 'assets/images/logo-footer.png'
import tiktok from 'assets/images/tiktok.png'
import youtube from 'assets/images/youtube.png'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Register } from './Register'

const hotNavList = [
    'Clips Biểu Diễn',
    'Showcase Performance',
    'Clips Thi Đấu',
    'All Style',
    ' Breaking',
    ' Showcase',
    'Tin tức',
    'Báo chí – Truyền thông',
]
const socialList = [
    {
        icon: youtube,
        link: 'https://youtube.com/@hipfesttv?si=ey77dilgjt635MG1',
    },
    { icon: facebook, link: 'https://www.facebook.com/hipfest' },
    {
        icon: instagram,
        link: 'https://www.instagram.com/hipfestvn?igsh=b3k3bnltM3doZjEy&utm_source=qr',
    },
    {
        icon: tiktok,
        link: 'https://www.tiktok.com/@hipfestvn?_t=8qWZrxbQ5Ky&_r=1',
    },
]

export function Footer() {
    const { t } = useTranslation()

    const contactList = [
        {
            key: `${t('address')}:`,
            label: t('address-content'),
            icon: <LocationOnOutlinedIcon />,
        },
        {
            key: 'E-Mail:',
            label: 'E-Mail: hipfestvn@gmail.Com',
            icon: <MailOutlinedIcon />,
        },
        {
            key: `${t('phone')}:`,
            label: t('phone-content'),
            icon: <PhoneAndroidOutlinedIcon />,
        },
    ]
    return (
        <Fragment>
            <Box sx={{ overlowX: 'hidden' }}>
                <Register />
            </Box>
            <Box
                component="footer"
                sx={{
                    backgroundImage: `url(${footerBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat-x',
                }}
            >
                <Box>
                    <Container maxWidth="xl">
                        <Stack
                            direction="row"
                            alignItems="flex-end"
                            flexWrap="wrap"
                            sx={{ py: { xs: 5, md: 8 }, mx: -2 }}
                        >
                            <Box sx={{ width: { xs: '100%', lg: 2 / 5 } }}>
                                <Box sx={{ p: 2 }}>
                                    <Stack spacing={3}>
                                        <Box sx={{ width: 239 }}>
                                            <Box
                                                component="img"
                                                alt="logo"
                                                src={logo}
                                                width="100%"
                                            />
                                        </Box>

                                        <Typography
                                            variant="h5"
                                            fontWeight={600}
                                            color="white"
                                        >
                                            Hipfest Entertaiment
                                        </Typography>

                                        <Box>
                                            <Stack spacing={1}>
                                                {contactList.map(
                                                    (item, idx) => (
                                                        <Stack
                                                            key={idx}
                                                            direction="row"
                                                            alignItems="center"
                                                            spacing={1}
                                                            sx={{
                                                                color: 'white',
                                                            }}
                                                        >
                                                            {item.icon}
                                                            <Typography>
                                                                <strong>
                                                                    {item.key}
                                                                </strong>{' '}
                                                                {item.label}
                                                            </Typography>
                                                        </Stack>
                                                    ),
                                                )}
                                            </Stack>
                                        </Box>

                                        <Box
                                            component="iframe"
                                            name="f14d41e2838f6ce0c"
                                            data-testid="fb:page Facebook Social Plugin"
                                            title="fb:page Facebook Social Plugin"
                                            allowFullScreen
                                            allow="encrypted-media"
                                            src="https://www.facebook.com/v2.8/plugins/page.php?adapt_container_width=true&amp;app_id=376344886070765&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Dfdb85305aeb8342b9%26domain%3Dhipfestvn.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fhipfestvn.com%252Ffb2b3948f6c44a276%26relation%3Dparent.parent&amp;container_width=710&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2Fhipfest%2F&amp;locale=vi_VN&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false&amp;tabs=messages&amp;width="
                                            sx={{
                                                border: 0,
                                                visibility: 'visible',
                                                width: '100%',
                                                height: '130px',
                                            }}
                                        />

                                        <Stack direction="row">
                                            {socialList.map((item, idx) => (
                                                <IconButton key={idx}>
                                                    <Box
                                                        component="a"
                                                        target="_blank"
                                                        referrerPolicy="no-referrer"
                                                        href={item.link}
                                                    >
                                                        <Box
                                                            component="img"
                                                            sx={{
                                                                width: 40,
                                                                aspectRatio:
                                                                    '1/1',
                                                                verticalAlign:
                                                                    'middle',
                                                            }}
                                                            src={item.icon}
                                                            alt=""
                                                        />
                                                    </Box>
                                                </IconButton>
                                            ))}
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    width: { xs: '100%', lg: 'auto' },
                                    minWidth: 2 / 5,
                                }}
                            >
                                <Box sx={{ p: 2 }}>
                                    <Box>
                                        <Box
                                            component="iframe"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.217134660734!2d106.6861079759475!3d10.79467498935527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528cdfaf4e5b3%3A0x6add3b71c72dd83b!2zY2h1bmcgY8awIDEwQSBUcuG6p24gTmjhuq10IER14bqtdCwgMTBBIMSQLiBUcuG6p24gTmjhuq10IER14bqtdCwgUGjGsOG7nW5nIFTDom4gxJDhu4tuaCwgUXXhuq1uIDEsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1723259365532!5m2!1svi!2s"
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            sx={{
                                                border: 0,
                                                visibility: 'visible',
                                                width: '100%',
                                                height: '100%',
                                                aspectRatio: 16 / 10,
                                            }}
                                        ></Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ width: { xs: '100%', lg: 1 / 5 } }}>
                                <Box sx={{ p: 2 }}>
                                    <Stack spacing={2.5}>
                                        <Typography
                                            variant="h5"
                                            fontWeight={600}
                                            color="white"
                                        >
                                            {t('quick-view')}
                                        </Typography>
                                        {hotNavList.map((item, idx) => (
                                            <Typography
                                                key={idx}
                                                variant="body2"
                                                color="white"
                                            >
                                                {item}
                                            </Typography>
                                        ))}
                                    </Stack>
                                </Box>
                            </Box>
                        </Stack>
                    </Container>
                </Box>

                <Box sx={{ bgcolor: '#1f1f1f' }}>
                    <Container maxWidth="xl">
                        <Stack
                            justifyContent="center"
                            alignContent="center"
                            sx={{ py: 2 }}
                        >
                            {' '}
                            <Typography
                                color="white"
                                textAlign="center"
                                variant="caption"
                            >
                                Copyright © {new Date().getFullYear()} Hipfest
                                Entertaiment Co.,LTD. All Rights Reserved.
                                Powered by{' '}
                                <Typography
                                    component="a"
                                    href="http://gvbsoft.vn"
                                    target="_blank"
                                    rel="noreferrer"
                                    color="primary"
                                >
                                    gvbsoft.vn
                                </Typography>
                            </Typography>
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </Fragment>
    )
}
