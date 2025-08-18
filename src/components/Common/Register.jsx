import { Button } from 'components/Common/Button'
import { Title } from 'components/Common/Title'
import { InputField } from 'components/FormFields/InputField'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function Register() {
  const { t } = useTranslation()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
    },
  })

  const handleFormSubmit = handleSubmit((formValues) => {
    console.log(formValues)
  })

  return (
    <Box sx={{ pt: 5, pb: { xs: 5, md: 12.5 } }} id="contact">
      <Container maxWidth="xl">
        <Stack direction="row" flexWrap="wrap" sx={{ mx: -2 }}>
          <Box
            sx={{ width: { xs: '100%', md: 1 / 2 } }}
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            <Box sx={{ p: 2 }}>
              <Box>
                <Title type={2}>
                  <Typography
                    variant="h6"
                    textTransform="uppercase"
                    color="white"
                    fontWeight={600}
                  >
                    {t('register-to-play')}
                  </Typography>
                </Title>

                <Box
                  sx={{
                    ml: { xs: 0, sm: 25 },
                    mt: { xs: 0, sm: -10 },
                  }}
                >
                  <Typography>
                    <strong> {t('step')} 1:</strong>
                  </Typography>
                  <Typography>*** HIPFEST ” SHOWCASE CREW”</Typography>
                  <Link to="/auth/player-register">
                    <Typography color="primary">
                      {t('click-register')}
                    </Typography>
                  </Link>
                  <br />
                  <Typography>*** HIPFEST: ” BREAKING BATTLE” </Typography>
                  <Link to="/auth/player-register">
                    <Typography color="primary">
                      {t('click-register')}
                    </Typography>
                  </Link>
                  <br />
                  <Typography>
                    <strong>{t('step')} 2:</strong> {t('tep2-content')}
                  </Typography>

                  <Typography>
                    <strong>{t('step')} 3:</strong> {t('tep3-content')}
                  </Typography>
                  <br />
                  <Typography>
                    <strong>{t('contact-title')}</strong>
                    <br />
                    <strong>Hotline:</strong> 0911.136.336 hỗ Trợ Thông Tin
                    Chương Trình
                    <br />
                    <strong>{t('Address')}:</strong> 10A, Trần Nhật Duật, P. Tân
                    Định, Quận 1, TP. HCM
                    <br />
                    <strong>E-Mail:</strong> hipfestvn@gmail.Com
                    <br />
                    <strong>{t('Phone')}: </strong>
                    0908.431.959
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{ width: { xs: '100%', md: 1 / 2 } }}
            data-aos="fade-left"
            data-aos-duration="2000"
          >
            <Box sx={{ p: 2 }}>
              <Box>
                <Title type={3}>
                  <Typography
                    variant="h6"
                    color="white"
                    textTransform="uppercase"
                    fontWeight={600}
                    sx={{ maxWidth: 210 }}
                  >
                    {t('register-clip')}
                  </Typography>
                </Title>

                <Box
                  sx={{
                    ml: { sx: 0, sm: 20 },
                    mt: { xs: 0, sm: -5 },
                  }}
                >
                  <Box
                    sx={{
                      '& a': { color: 'primary.main' },
                    }}
                    dangerouslySetInnerHTML={{
                      __html: t('promote-content'),
                    }}
                  />

                  <br />
                  <Typography>
                    <strong>Address:</strong> 10A, Trần Nhật Duật, Phường Tân
                    Định, Quận 1, TP. HCM
                    <br />
                    <strong>E-mail:</strong> hipfesttv@gmail.com
                    <br />
                    <strong>Phone:</strong> 08.9845.2394
                  </Typography>
                </Box>

                <br />

                <Stack component="form" noValidate onSubmit={handleFormSubmit}>
                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    sx={{ mx: -1 }}
                  >
                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          md: 1 / 2,
                        },
                      }}
                    >
                      <Box sx={{ p: 1 }}>
                        <InputField
                          label={t('Name')}
                          name="name"
                          control={control}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          md: 1 / 2,
                        },
                      }}
                    >
                      <Box sx={{ p: 1 }}>
                        <InputField
                          label={t('Group Name')}
                          name="group-name"
                          control={control}
                        />
                      </Box>
                    </Box>
                  </Stack>

                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    sx={{ mx: -1 }}
                  >
                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          md: 1 / 2,
                        },
                      }}
                    >
                      <Box sx={{ p: 1 }}>
                        <InputField
                          label={t('School Name')}
                          name="school-name"
                          control={control}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          md: 1 / 2,
                        },
                      }}
                    >
                      <Box sx={{ p: 1 }}>
                        <InputField
                          label={t('Amount')}
                          name="amount"
                          control={control}
                        />
                      </Box>
                    </Box>
                  </Stack>

                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    sx={{ mx: -1 }}
                  >
                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          md: 1 / 2,
                        },
                      }}
                    >
                      <Box sx={{ p: 1 }}>
                        <InputField
                          label={t('Email')}
                          name="email"
                          control={control}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          md: 1 / 2,
                        },
                      }}
                    >
                      <Box sx={{ p: 1 }}>
                        <InputField
                          label={t('Phone')}
                          name="phone"
                          control={control}
                        />
                      </Box>
                    </Box>
                  </Stack>
                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    sx={{ mx: -1 }}
                  >
                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          md: 1 / 2,
                        },
                      }}
                    >
                      <Box sx={{ p: 1 }}>
                        <InputField
                          label={t('Title')}
                          name="Title"
                          control={control}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          md: 1 / 2,
                        },
                      }}
                    >
                      <Box sx={{ p: 1 }}>
                        <InputField
                          label={t('Link')}
                          name="Link"
                          control={control}
                        />
                      </Box>
                    </Box>
                  </Stack>

                  <Stack
                    flexDirection="row"
                    alignItems="flex-end"
                    sx={{ mx: -1 }}
                  >
                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          md: 1 / 2,
                        },
                      }}
                    >
                      <Box sx={{ p: 1 }}>
                        <InputField
                          multiline
                          rows={5}
                          label={t('Description')}
                          name="Description"
                          control={control}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        width: {
                          xs: '100%',
                          md: 1 / 2,
                        },
                      }}
                    >
                      <Stack justifyContent="flex-end" sx={{ p: 1 }}>
                        <Button
                          type="submit"
                          sx={{
                            maxWidth: 200,
                            mx: 'auto',
                          }}
                        >
                          {t('Upload')}
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
