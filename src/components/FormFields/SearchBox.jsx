import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

SearchBox.propTypes = {
    placeholder: PropTypes.string,
    onSearchChange: PropTypes.func,
}

export function SearchBox({ placeholder, onSearchChange }) {
    const { t } = useTranslation()
    const handleSearchChange = debounce((e) => {
        onSearchChange?.(e.target.value)
    }, 600)

    return (
        <TextField
            sx={{
                mr: 1,
                width: '100%',
                minWidth: '300px',
            }}
            size="small"
            placeholder={placeholder || t('search')}
            onChange={handleSearchChange}
            InputProps={{
                'aria-label': t('search'),
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    )
}
