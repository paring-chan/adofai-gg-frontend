import React from 'react'
import styled from 'styled-components'
import TextField from '../TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEraser,
  faFilter,
  faSortAmountDown
} from '@fortawesome/free-solid-svg-icons'
import Tooltip from '../Tooltip'

const Container = styled.div`
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
  return (
    <Container>
      <Section>
        <SearchBar
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
        />
        <ActionButton>
          <div className="text">Filter</div>
          <FontAwesomeIcon icon={faFilter} size="lg" />
        </ActionButton>
        <ActionButton>
          <div className="text">Sort</div>
          <FontAwesomeIcon icon={faSortAmountDown} size="lg" />
        </ActionButton>
        <ActionButton>
          <div className="text">Reset Filter</div>
          <FontAwesomeIcon icon={faEraser} size="lg" />
        </ActionButton>
      </Section>
    </Container>
  )
}

export default LevelSearchSection
