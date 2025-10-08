import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { Fragment } from 'react/jsx-runtime'

type Props = {
    placeholder: string
}
const SearchInput = ({placeholder}:Props) => {
  return (
    <Fragment> <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={placeholder}
                className="w-full pl-10  border-0  border border-border placeholder:text-placeholder"
              /></Fragment>
  )
}

export default SearchInput