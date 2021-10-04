import React from 'react'
import { Tooltip } from '@mui/material'

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
  },
  {
    tagName: 'Gimmick',
    tagDescription: 'This level contains gimmicks.'
  },
  {
    tagName: 'NSFW',
    tagDescription: 'This level contains NSFW content.'
  }
]

const idConvert = (id: string) => {
  id = id.toString()
  while (id.length < 6) id = '0' + id
  return id
}

const LevelTags: React.FC<{ tag: string; id: string; styleClass?: string }> = ({
  tag: _tag,
  id,
  styleClass
}) => {
  const tag = Number(_tag)
  if (tagDescription[tag - 1] === undefined) return null

  const getImageOrFail = (mod: string) => {
    try {
      return require(`@assets/tag/${mod}.svg`).default.src
    } catch (e: any) {
      return ''
    }
  }

  return (
    <>
      <Tooltip
        title={
          <span style={{ whiteSpace: 'pre-line' }}>
            {tagDescription[tag - 1].tagName.toString() +
              '\n' +
              tagDescription[tag - 1].tagDescription.toString()}
          </span>
        }
      >
        <img
          data-for={'tag_' + tag + '_' + idConvert(id)}
          className={styleClass}
          src={getImageOrFail(`${tag}`)}
          alt=""
        />
      </Tooltip>
    </>
  )
}

export default LevelTags
