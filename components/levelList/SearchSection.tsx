import React from 'react'
import styled, { css } from 'styled-components'
import TextField from '../TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEraser,
  faFilter,
  faSortAmountDown
} from '@fortawesome/free-solid-svg-icons'
import Tooltip from '../Tooltip'

const Container = styled.section`
  width: 100%;
  min-height: 32px;
  margin-top: 10px;
  padding: 10px;
`

const Section = styled.section`
  display: flex;
  gap: 10px;
`

const SearchBar = styled(TextField)`
  width: 100%;
`

const ActionButton = styled(Tooltip)`
  padding-left: 6px;
  padding-right: 6px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;

  svg {
    height: 32px;
    width: 20px !important;
  }
`

type SearchSectionProps = {
  show: boolean
}

const SearchSection = styled.section<SearchSectionProps>`
  margin-top: 10px;
  width: 100%;
  transition: all 0.2s ease;
  ${({ show }) =>
    show
      ? css`
          height: auto;
          opacity: 1;
          visibility: visible;
        `
      : css`
          opacity: 0;
          height: 0;
          margin: 0;
          visibility: hidden;
        `}
  .title {
    border-top-color: rgba(255, 255, 255, 0.4);
    border-top-width: 1px;
    border-top-style: solid;
    padding-top: 10px;
    font-size: 1.4em;
    font-weight: 700;
    margin-bottom: 5px;
    width: 100%;
  }
`

type LevelSearchSectionProps = {
  placeholder: string
  value: string
  onSearch: (value: string) => void
  filterContent: React.ReactNode
  sortContent: React.ReactNode
  resetFilter: () => void
}

const LevelSearchSection: React.FC<LevelSearchSectionProps> = ({
  value,
  placeholder,
  onSearch,
  filterContent,
  sortContent,
  resetFilter
}) => {
  const [showFilter, setShowFilter] = React.useState(false)
  const [showSort, setShowSort] = React.useState(false)

  return (
    <Container>
      <Section>
        <SearchBar
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
        />
        <ActionButton onClick={() => setShowFilter(!showFilter)}>
          <div className="text">Filter</div>
          <FontAwesomeIcon icon={faFilter} size="lg" />
        </ActionButton>
        <ActionButton onClick={() => setShowSort(!showSort)}>
          <div className="text">Sort</div>
          <FontAwesomeIcon icon={faSortAmountDown} size="lg" />
        </ActionButton>
        <ActionButton onClick={resetFilter}>
          <div className="text">Reset Filter</div>
          <FontAwesomeIcon icon={faEraser} size="lg" />
        </ActionButton>
      </Section>

      <SearchSection show={showFilter}>
        <div className="title">Filter</div>
        {filterContent}
      </SearchSection>
      <SearchSection show={showSort}>
        <div className="title">Sort by</div>
        {sortContent}
      </SearchSection>
    </Container>
  )
}

export default LevelSearchSection
