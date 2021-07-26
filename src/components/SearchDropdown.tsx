import Autocomplete from '@material-ui/lab/Autocomplete'
import { CircularProgress, TextField } from '@material-ui/core'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { GETInitSearchOptions } from '../utils/api'
const TextFieldStyled = styled(TextField)``
const SearchDropdownStyled = styled.div``
interface SearchDropdownProps {
  fetchOptions: any
  onSearch: any
  className?: string
}
export default function SearchDropdown({
  fetchOptions,
  onSearch,
  className,
}: SearchDropdownProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [options, setOptions] = useState<string[]>(['Loading...'])
  const [searchValue, setSearchValue] = useState('')

  async function handleInitialization() {
    const opts = GETInitSearchOptions()
    setOptions(opts.map((opt) => opt.name))
    setIsLoading(false)
  }

  function handleSearch(e: React.KeyboardEvent<HTMLDivElement>, params: any) {
    if (e.key === 'Enter') {
      onSearch(searchValue)
      params.ref.current.blur()
    }
  }
  useEffect(() => {
    handleInitialization()
  }, [])
  return (
    <SearchDropdownStyled>
      <Autocomplete
        className={className}
        options={options}
        loading={isLoading}
        freeSolo
        renderInput={(params) => (
          <TextFieldStyled
            {...params}
            onKeyUp={(e) => handleSearch(e, params.inputProps)}
            label='Search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            variant='outlined'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </SearchDropdownStyled>
  )
}
