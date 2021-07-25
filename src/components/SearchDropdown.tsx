import Autocomplete from '@material-ui/lab/Autocomplete'
import { CircularProgress, TextField } from '@material-ui/core'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { GETInitSearchOptions } from '../utils/api'
const SearchDropdownStyled = styled.div``
interface SearchDropdownProps {
  fetchOptions: any
  onSearch: any
}
export default function SearchDropdown({
  fetchOptions,
  onSearch,
}: SearchDropdownProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [options, setOptions] = useState<string[]>(['Loading...'])
  const [searchValue, setSearchValue] = useState('')

  async function handleInitialization() {
    const opts = GETInitSearchOptions()
    console.log(`opts`, opts)
    setOptions(opts.map((opt) => opt.name))
    setIsLoading(false)
  }

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onSearch(searchValue)
    }
  }
  useEffect(() => {
    handleInitialization()
  }, [])
  return (
    <SearchDropdownStyled>
      <Autocomplete
        options={options}
        loading={isLoading}
        renderInput={(params) => (
          <TextField
            {...params}
            onKeyUp={handleSearch}
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
