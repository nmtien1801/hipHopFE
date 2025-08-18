import { USER_TYPE } from 'constants/common'
import { useCountries, useCountry } from 'hooks/common/useCountry'
// import { useUserRegister } from 'hooks/useUserRegister'
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import { useAuth } from 'hooks/Auth/auth'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { UserInfo } from '../components/UserInfo'
import EditIcon from '@mui/icons-material/Edit'
import { AddEditUserForm } from '../components/AddEditUserForm'
import { useMutationUser } from 'hooks/User/useMutationUser'
import { useSnackbar } from 'notistack'
import { usePhoneCode } from 'hooks/common/usePhoneCode'
// import { UserRegisterList } from '../components/UserRegisterList'

export function Profile() {
    const language = useSelector((state) => state.global.language)
    const [showEdit, setShowEdit] = useState(false)
    const [params, setParams] = useState({
        page: 1,
        limit: 6,
        LanguagesID: language,
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: profile, refetch } = useAuth(id)
    const { edit } = useMutationUser()
    const { enqueueSnackbar } = useSnackbar()

    const { data: country } = useCountry({
        countryID: profile?.CountryID,
        LanguagesID: language,
    })

    const { data: countryList } = useCountries({
        page: 1,
        limit: 10000,
    })

    const { data: phoneCodeList } = usePhoneCode({ page: 1, limit: 10000 })

    // const {
    //     data: userRegisterList,
    //     isLoading,
    //     pagination,
    // } = useUserRegister({
    //     ...params,
    // })

    useEffect(() => {
        setParams({
            ...params,
            LanguagesID: language,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    // function handleFilterChange(params) {
    //     setParams({ ...params })
    // }

    function handleSubmit(formValues) {
        formValues.auth = {
            UserID: profile?.UserID,
            UUSerID: profile?.UserName,
        }
        edit.mutateAsync(formValues)
            .then((res) => {
                if (res) {
                    enqueueSnackbar('Update success', { variant: 'success' })
                    refetch()
                    setShowEdit(false)
                }
            })
            .catch((error) => {
                enqueueSnackbar(`${error}`, { variant: 'error' })
            })
    }

    return (
        <Box sx={{ pt: 2.5, pb: { xs: 5, md: 12.5 } }}>
            <Container>
                <Box>
                    <Box
                        boxShadow={3}
                        sx={{
                            position: 'relative',
                            height: '400px',
                            my: 2,
                            borderRadius: '8px',
                            backgroundImage: `url('https://picsum.photos/1152/400/?blur=1')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            marginBottom: 5,
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: 'rgba(0, 0, 0, 0.5)',
                                width: '100%',
                                height: '100%',
                                borderRadius: '8px',
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 32,

                                    borderRadius: '50%',
                                    transform: 'translateY(15%)',
                                }}
                            >
                                <Box
                                    component={Avatar}
                                    boxShadow={3}
                                    src={profile?.ImagesPaths}
                                    alt={profile?.UserName}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                    }}
                                />

                                <Box>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        sx={{
                                            fontWeight: 600,
                                            color: 'white',
                                        }}
                                    >
                                        {profile?.UserName}
                                    </Typography>

                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                        color="white"
                                    >
                                        <IconButton
                                            color="inherit"
                                            onClick={() => setShowEdit(true)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <Chip
                                            color="success"
                                            label={
                                                USER_TYPE[profile?.TypeUserID]
                                            }
                                            sx={{
                                                borderRadius: '8px',
                                                height: 30,
                                                '& span': { px: 1 },
                                            }}
                                        />
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>

                    <Box>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            sx={{ my: 3 }}
                            spacing={1}
                        >
                            <Button
                                variant="contained"
                                onClick={() =>
                                    navigate('/auth/change-password')
                                }
                                color="error"
                            >
                                Change Password
                            </Button>
                            {profile?.TypeUserID === 3 && (
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        navigate('/auth/player-register-again')
                                    }
                                >
                                    Đăng ký thi
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => navigate('/auth/welcome')}
                            >
                                Go to dashboard
                            </Button>
                        </Stack>
                        <Stack direction="row" sx={{ mx: -2 }}>
                            <Box sx={{ width: 1 / 3 }}>
                                <Box sx={{ p: 2 }}>
                                    <Paper
                                        elevation={3}
                                        sx={{ p: 2, borderRadius: '8px' }}
                                    >
                                        <UserInfo
                                            profile={profile}
                                            country={country || null}
                                        />
                                    </Paper>
                                </Box>
                            </Box>

                            <Box sx={{ width: 2 / 3 }}>
                                {/* <Box sx={{ p: 2 }}>
                                    <Stack spacing={2}>
                                        <Paper
                                            elevation={3}
                                            sx={{ p: 2, borderRadius: '8px' }}
                                        >
                                            <Stack spacing={2}>
                                                <UserRegisterList
                                                    params={params}
                                                    isLoading={isLoading}
                                                    pagination={pagination}
                                                    data={userRegisterList}
                                                    onPaginationModelChange={
                                                        handleFilterChange
                                                    }
                                                />
                                            </Stack>
                                        </Paper>
                                    </Stack>
                                </Box> */}
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Container>

            <Dialog
                fullWidth
                maxWidth="md"
                open={showEdit}
                onClose={() => setShowEdit(false)}
            >
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <AddEditUserForm
                        onSubmit={handleSubmit}
                        onCancel={() => setShowEdit(false)}
                        data={profile}
                        phoneCodeList={
                            phoneCodeList
                                ?.map((item) => ({
                                    PhoneNumber: item.PhoneNumber,
                                    Flag: item.PhoneCode,
                                }))
                                ?.filter(
                                    (value, index, self) =>
                                        index ===
                                        self.findIndex(
                                            (t) =>
                                                t.PhoneNumber ===
                                                value.PhoneNumber,
                                        ),
                                ) || []
                        }
                        countryList={
                            countryList?.map((item) => ({
                                CountryID: item.CountryID,
                                CountryName: item.CountryName,
                                Flag: item.Flag,
                            })) || []
                        }
                    />
                </DialogContent>
            </Dialog>
        </Box>
    )
}
