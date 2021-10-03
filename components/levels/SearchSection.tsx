import React from 'react'
import styled, { css } from 'styled-components'
import TextField from '../TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEraser,
  faFilter,
  faSortAmountDown
} from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '@mui/material'

const Container = styled.section`
  width: 100%;
  min-height: 32px;
  margin-top: 20px;
  margin-bottom: 10px;
`

const Section = styled.section`
  display: flex;
  gap: 10px;
  @media (max-width: 512px) {
    flex-direction: column;
  }
  .actions {
    gap: 10px;
    display: flex;
    justify-content: space-between;
    & > * {
      width: 100%;
      justify-content: center;
      display: flex;
    }
  }
`

const SearchBar = styled(TextField)`
  width: 100%;
`

const ActionButton = styled.div<{ active?: boolean }>`
  padding-left: 6px;
  padding-right: 6px;
  border-radius: 5px;
  background: ${({ active }) =>
    active ? 'rgba(255,255,255,.5)' : 'rgba(255, 255, 255, 0.3)'};
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
}

const LevelSearchSection: React.FC<LevelSearchSectionProps> = ({
  value,
  placeholder,
  onSearch,
  filterContent,
  sortContent
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
        <div className="actions">
          <Tooltip title={<div style={{ fontSize: 14 }}>Filter</div>}>
            <ActionButton
              active={showFilter}
              onClick={() => setShowFilter(!showFilter)}
            >
              <FontAwesomeIcon icon={faFilter} size="lg" />
            </ActionButton>
          </Tooltip>
          <Tooltip title={<div style={{ fontSize: 14 }}>Sort</div>}>
            <ActionButton
              onClick={() => setShowSort(!showSort)}
              active={showSort}
            >
              <FontAwesomeIcon icon={faSortAmountDown} size="lg" />
            </ActionButton>
          </Tooltip>
          <Tooltip title={<div style={{ fontSize: 14 }}>Reset Filter</div>}>
            <ActionButton onClick={() => window.location.reload()}>
              <FontAwesomeIcon icon={faEraser} size="lg" />
            </ActionButton>
          </Tooltip>
        </div>
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
