import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '@mui/material'
import styled, { css } from 'styled-components'
import TextField from '../TextField'

const tagDescription = [
  {
    tagName: 'Short',
    tagDescription: 'Levels that are under a minute.'
  },
  {
    tagName: 'Triplet',
    tagDescription: 'This level contains triplets.'
  },
  {
    tagName: 'No Speed Change',
    tagDescription: 'The tile bpm remains constant throughout this level.'
  },
  {
    tagName: 'Medium',
    tagDescription: 'Levels that are under 4 minutes.'
  },
  {
    tagName: 'Memorization',
    tagDescription: 'This level requires memorization.'
  },
  {
    tagName: 'No Swirls',
    tagDescription: 'This level has no swirls.'
  },
  {
    tagName: 'Acceleration / Deceleration',
    tagDescription: 'This level uses a song that changes BPM.'
  },
  {
    tagName: 'Magic Shape',
    tagDescription: 'This level contains magic shapes.'
  },
  {
    tagName: 'Septuplet',
    tagDescription: 'This level contains septuplets.'
  },
  {
    tagName: '64+ Beat',
    tagDescription: 'This level contains beats higher than 64.'
  },
  {
    tagName: 'Long',
    tagDescription: 'Levels that are over 4 minutes.'
  },
  {
    tagName: 'Funky Beat',
    tagDescription: 'This level contains funky beats.'
  },
  {
    tagName: 'Pseudo',
    tagDescription:
      'This level contains parts where you have to press two fingers at once.'
  },
  {
    tagName: 'Gallop',
    tagDescription: 'This level contains parts where you do fast streams.'
  },
  {
    tagName: 'Pseudo +2',
    tagDescription:
      'This level contains parts where you have to press multiple fingers at once.'
  },
  {
    tagName: 'Swing',
    tagDescription: 'This level contains swing rhythms.'
  },
  {
    tagName: 'Slow',
    tagDescription: "This level's BPM is under 300."
  },
  {
    tagName: 'Polyrhythm',
    tagDescription: 'This level contains polyrhythms.'
  },
  {
    tagName: 'Quintuplet',
    tagDescription: 'This level contains quintuplets.'
  },
  {
    tagName: 'Subjective',
    tagDescription: "This level's difficulty can vary by person."
  },
  {
    tagName: 'Tresillo',
    tagDescription: 'This level contains tresillos.'
  }
]

type SearchContentItemProps = {
  title: string
  isLv?: boolean
  stretchContent?: boolean
}

const ItemContainer = styled.div<{ stretchContent: boolean }>`
  margin-right: 20px;
  ${({ stretchContent }) =>
    stretchContent
      ? css`
          @media (max-width: 512px) {
            width: 100%;
          }
        `
      : ''}
`

const ItemContent = styled.div<{ stretchContent: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  @media (max-width: 512px) {
    ${({ stretchContent }) =>
      stretchContent
        ? css`
            & > * {
              flex-grow: 1;
            }
          `
        : ''}
  }
`

const SearchContentItem: React.FC<SearchContentItemProps> = ({
  title,
  isLv,
  children,
  stretchContent
}) => {
  return (
    <ItemContainer stretchContent={stretchContent || false}>
      <div style={{ display: 'flex' }}>
        <h4 style={{ margin: '5px 0' }}>{title}</h4>
        {isLv && (
          <Tooltip
            style={{
              marginLeft: 5
            }}
            arrow
            title={
              <span style={{ whiteSpace: 'pre-line', fontSize: 14 }}>
                {'Add 0.5 instead of +\nex) 18+ -> 18.5'}
              </span>
            }
          >
            <span>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                style={{ height: 16 }}
                size="lg"
              />
            </span>
          </Tooltip>
        )}
      </div>
      <ItemContent stretchContent={stretchContent || false}>
        {children}
      </ItemContent>
    </ItemContainer>
  )
}

const CheckboxContainer = styled.div`
  height: 32px;
  cursor: pointer;
  img {
    cursor: pointer;
  }
  label {
    opacity: 0.5;
    transition: all 0.2s ease;
  }
  input:checked + label {
    opacity: 1;
  }
`

export const SearchContentCheckbox: React.FC<{
  onSelect: (id: string) => void
  tooltip: string
  img: string
  isDefault?: boolean
}> = ({ img, tooltip, isDefault, onSelect }) => {
  return (
    <CheckboxContainer>
      <Tooltip
        arrow
        title={
          <>
            <span style={{ whiteSpace: 'pre-line', fontSize: 14 }}>
              {tagDescription[Number(tooltip) - 1].tagName.toString() +
                '\n' +
                tagDescription[Number(tooltip) - 1].tagDescription.toString()}
            </span>
          </>
        }
      >
        <span>
          <input
            defaultChecked={isDefault}
            type="checkbox"
            id={`tag_${tooltip}`}
            style={{ display: 'none' }}
            onChange={() => {
              onSelect(tooltip)
            }}
          />
          <label htmlFor={`tag_${tooltip}`}>
            <img src={img} alt={tooltip} width={28} />
          </label>
        </span>
      </Tooltip>
    </CheckboxContainer>
  )
}

export const SearchContentInput: React.FC<{
  onInput: (value: string) => void
  placeholder: string
}> = ({ onInput, placeholder }) => {
  return (
    <TextField
      type="number"
      placeholder={placeholder}
      onChange={(e) => onInput(e.target.value)}
      style={{ width: 100 }}
    />
  )
}

export const SearchContentRadio: React.FC<{
  onSelect: (id: string) => void
  tooltip: string
  img: string
  isDefault?: boolean
}> = ({ tooltip, onSelect, img, isDefault }) => {
  return (
    <CheckboxContainer>
      <input
        type="radio"
        id={`tag_${tooltip}`}
        onChange={() => onSelect(tooltip)}
        style={{ display: 'none' }}
        defaultChecked={isDefault}
        name="radio"
      />
      <label htmlFor={`tag_${tooltip}`}>
        <img src={img} alt={tooltip} width={32} />
      </label>
    </CheckboxContainer>
  )
}

export default SearchContentItem
