import React, { Reducer } from 'react'
import { NextPage } from 'next'
import ScrollButton from '../../components/ScrollButton'
import Content from '../../components/layout/Content'
import LevelSearchSection from '../../components/levelList/SearchSection'

const Levels: NextPage<{ query: string }> = ({ query }) => {
  const reduce: Reducer<any, any> = (state, action) => {
    switch (action.type) {
      case 'FETCH_RESULT':
        return {
          ...state,
          items: action.items
        }

      case 'FETCH_ERROR':
        return {
          ...state,
          error: action.error,
          isError: !!action.error
        }

      case 'HAS_MORE_ITEMS':
        return {
          ...state,
          hasMoreItems: action.hasMore
        }

      case 'ITEM_COUNT':
        return {
          ...state,
          itemCount: action.itemCount
        }

      case 'SEARCH_TERM':
        return {
          ...state,
          searchTerm: action.searchTerm
        }

      case 'SORT_BY':
        return {
          ...state,
          sortBy: action.sortBy
        }

      case 'TAG_CHANGE':
        return {
          ...state,
          tag: action.tag
        }

      case 'FILTER_INPUT':
        return {
          ...state,
          filterInput: action.filterInput
        }

      default:
        return state
    }
  }

  const [state, dispatch] = React.useReducer(reduce, {
    items: [],
    error: null,
    isError: false,
    hasMore: true,
    itemCount: 0,
    sortBy: 'RECENT_DESC',
    tag: Array.from({ length: 20 }, () => false),
    filterInput: Array.from({ length: 6 }, () => ''),
    searchTerm: query
  })

  const tagConvert = (tags: boolean[]) => {
    let tagNumbers: number[] = []
    tags.forEach((bool, index) => {
      if (bool) {
        tagNumbers.push(index + 1)
      }
    })
    return tagNumbers
  }

  const fetchParams = (offset: number) => {
    const params = new URLSearchParams()

    params.append('offset', `${offset}`)
    params.append('amount', '15')
    params.append('sort', state.sortBy)
    params.append('query', state.searchTerm)
    params.append('includeTags', tagConvert(state.tag).toString())
    params.append('minDifficulty', state.filterInput[0])
    params.append('maxDifficulty', state.filterInput[1])
    params.append('minBpm', state.filterInput[2])
    params.append('maxBpm', state.filterInput[3])
    params.append('minTiles', state.filterInput[4])
    params.append('maxTiles', state.filterInput[5])

    return params
  }

  return (
    <Content>
      <ScrollButton />
      <LevelSearchSection
        value={state.searchTerm}
        onSearch={(value) => {
          dispatch({ type: 'SEARCH_TERM', searchTerm: value })
        }}
        placeholder="Search Level Title, Song Title, Artist, Creator"
        filterContent={<></>}
        sortContent={<></>}
      />
      {state.searchTerm}
    </Content>
  )
}

Levels.getInitialProps = async (ctx) => {
  return {
    query: (ctx.query.query as string) || ''
  }
}

export default Levels
