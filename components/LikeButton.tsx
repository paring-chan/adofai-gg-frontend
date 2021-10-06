import React from 'react'
import styled, { css } from 'styled-components'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = styled.div<{ liked: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 5px 15px;
  margin-top: 5px;
  border-radius: 100em;
  font-weight: 400;
  color: rgb(90, 90, 90);
  ${({ liked }) =>
    liked
      ? css`
          .icon {
            color: rgba(255, 77, 77);
          }
        `
      : ''}
  background-color: white;
  font-family: 'Roboto Mono', 'Quicksand', monospace;
  letter-spacing: -1px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgb(197, 197, 197);
  }

  .icon {
    margin-right: 5px;
    transition: all 0.2s ease;
  }
`

const LikeButton: React.FC<{ likes: number | { likes: number } }> = (
  {
    // likes
  }
) => {
  const [liked, setLiked] = React.useState(false)

  // likes = typeof likes === 'object' ? likes.likes : likes

  return (
    <Button liked={liked} onClick={() => setLiked(!liked)}>
      <FontAwesomeIcon
        className="icon"
        icon={faHeart}
        style={{ height: '12px' }}
      />
      {!liked ? 'To be added' : 'To be added!!'}
    </Button>
  )
}

export default LikeButton
