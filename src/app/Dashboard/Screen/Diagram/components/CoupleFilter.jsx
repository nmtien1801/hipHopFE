import { Box, Stack } from '@mui/material'
import { SortBox } from 'components/FormFields/SortBox'
import { useTranslation } from 'react-i18next'
import { mapCoupleCount } from 'utils/mapping'

export function CoupleFilter({ params, onFilterChange, total }) {
    const { t } = useTranslation()
    function handleNumberRoundChange(value) {
        onFilterChange({ ...params, NumberRound: value })
    }
    const optionList =
        total > 0
            ? [
                  ...mapCoupleCount(total).map((item, idx) => ({
                      label: `Confrontation ${idx + 1}`,
                      value: `${idx + 1}`,
                  })),
                  {
                      label: `Final`,
                      value: `${mapCoupleCount(total).length + 1}`,
                  },
              ]
            : []

    return (
        <Stack
            direction="row"
            justifyContent="flex-end"
            flexWrap="wrap"
            sx={{ mx: -1 }}
        >
            <Box sx={{ width: { xs: '100%', sm: 1 / 3 } }}>
                <Box sx={{ p: 1 }}>
                    <SortBox
                        defaultValue={'1'}
                        label={`${t('sort_by_round')}`}
                        hideOptionAll
                        onChange={handleNumberRoundChange}
                        optionList={optionList}
                    />
                </Box>
            </Box>
        </Stack>
    )
}
