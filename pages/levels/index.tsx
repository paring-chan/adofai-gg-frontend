import React, { Reducer } from 'react'
import { NextPage } from 'next'
import ScrollButton from '../../components/ScrollButton'
import Content from '../../components/layout/Content'
import LevelSearchSection from '../../components/levelList/SearchSection'
import Head from 'next/head'
import SearchContentItem, {
  SearchContentCheckbox,
  SearchContentInput,
  SearchContentRadio
} from '../../components/levelList/SearchContentItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import { api } from '../../utils/request'

const Levels: NextPage<{ query: string }> = ({ query }) => {
  const getInitialState = () => ({
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
      case 'RESET_FILTER':
        return getInitialState()

      default:
        return state
    }
  }

  const [state, dispatch] = React.useReducer(reduce, getInitialState())

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

  const tagChange = (t: string) => {
    const value = Number(t)
    const newTag = state.tag
    newTag[value - 1] = !state.tag[value - 1]
    dispatch({ type: 'TAG_CHANGE', tag: [...newTag] })
  }

  const numberChange = (index: number, value: string) => {
    let newNumbers = state.filterInput
    newNumbers[index] = Number(value)
    dispatch({ type: 'FILTER_INPUT', filterInput: [...newNumbers] })
  }

  const tagIcon = (id: string) => require(`@assets/tag/${id}.svg`).default.src
  const sortIcon = (id: string) =>
    require(`@assets/sort_icons/${id}.svg`).default.src

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_ERROR', error: null })
        dispatch({ type: 'HAS_MORE_ITEMS', hasMore: true })

        const params = fetchParams(0)
        const response = await api.get<any>('/api/v1/levels', { params })

        dispatch({ type: 'FETCH_RESULT', items: response.data.results })
        dispatch({ type: 'ITEM_COUNT', itemCount: response.data.count })
      } catch (e) {
        dispatch({ type: 'FETCH_ERROR', error: e })
      }
    }

    fetchData()
    // eslint-disable-next-line
  }, [state.searchTerm, state.sortBy, state.filterInput])

  const fetchMoreData = async () => {
    if (state.items.length >= state.itemCount) {
      dispatch({ type: 'HAS_MORE_ITEMS', hasMore: false })
      return
    }

    try {
      dispatch({ type: 'FETCH_ERROR', error: null })

      const params = fetchParams(state.items.length)
      const response = await api.get<any>('/api/v1/levels', { params })

      dispatch({
        type: 'FETCH_RESULT',
        items: state.items.concat(response.data.results)
      })
    } catch (e) {
      dispatch({ type: 'FETCH_ERROR', error: e })
    }
  }

  return (
    <Content>
      <Head>
        <title>Levels - Adofai.gg</title>
      </Head>
      <ScrollButton />
      <LevelSearchSection
        value={state.searchTerm}
        onSearch={(value) => {
          dispatch({ type: 'SEARCH_TERM', searchTerm: value })
        }}
        placeholder="Search Level Title, Song Title, Artist, Creator"
        filterContent={
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <SearchContentItem title="Chart Related">
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="20"
                  img={tagIcon('20')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="13"
                  img={tagIcon('13')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="15"
                  img={tagIcon('15')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="14"
                  img={tagIcon('14')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="8"
                  img={tagIcon('8')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="5"
                  img={tagIcon('5')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="3"
                  img={tagIcon('3')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="6"
                  img={tagIcon('6')}
                />
              </SearchContentItem>
              <SearchContentItem title="Rhythm Related">
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="2"
                  img={tagIcon('2')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="19"
                  img={tagIcon('19')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="9"
                  img={tagIcon('9')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="18"
                  img={tagIcon('18')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="16"
                  img={tagIcon('16')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="21"
                  img={tagIcon('21')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="12"
                  img={tagIcon('12')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="10"
                  img={tagIcon('10')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="7"
                  img={tagIcon('7')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="17"
                  img={tagIcon('17')}
                />
              </SearchContentItem>
              <SearchContentItem title="Length">
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="1"
                  img={tagIcon('1')}
                />
                <SearchContentCheckbox
                  onSelect={(value) => tagChange(value)}
                  tooltip="11"
                  img={tagIcon('11')}
                />
              </SearchContentItem>
            </div>
            <div
              style={{ display: 'flex', marginTop: '10px', flexWrap: 'wrap' }}
            >
              <SearchContentItem title="Lv." isLv stretchContent>
                <SearchContentInput
                  onInput={(value) => numberChange(0, value)}
                  placeholder="Min Lv."
                />
                <SearchContentInput
                  onInput={(value) => numberChange(1, value)}
                  placeholder="Max Lv."
                />
              </SearchContentItem>
              <SearchContentItem title="BPM" stretchContent>
                <SearchContentInput
                  onInput={(value) => numberChange(2, value)}
                  placeholder="Min BPM"
                />
                <SearchContentInput
                  onInput={(value) => numberChange(3, value)}
                  placeholder="Max BPM"
                />
              </SearchContentItem>
              <SearchContentItem title="Tiles" stretchContent>
                <SearchContentInput
                  onInput={(value) => numberChange(4, value)}
                  placeholder="Min Tiles"
                />
                <SearchContentInput
                  onInput={(value) => numberChange(5, value)}
                  placeholder="Max Tiles"
                />
              </SearchContentItem>
            </div>
          </>
        }
        sortContent={
          <form style={{ display: 'flex', flexWrap: 'wrap' }}>
            <SearchContentItem title="Difficulty">
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: 'SORT_BY', sortBy: value })
                }
                tooltip="DIFFICULTY_DESC"
                img={sortIcon('difficulty_up')}
              />
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: 'SORT_BY', sortBy: value })
                }
                tooltip="DIFFICULTY_ASC"
                img={sortIcon('difficulty_down')}
              />
            </SearchContentItem>
            <SearchContentItem title="Likes">
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: 'SORT_BY', sortBy: value })
                }
                tooltip="LIKE_DESC"
                img={sortIcon('heart_up')}
              />
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: 'SORT_BY', sortBy: value })
                }
                tooltip="LIKE_ASC"
                img={sortIcon('heart_down')}
              />
            </SearchContentItem>
            <SearchContentItem title="Recent">
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: 'SORT_BY', sortBy: value })
                }
                tooltip="RECENT_DESC"
                img={sortIcon('created_at_up')}
                isDefault
              />
              <SearchContentRadio
                onSelect={(value) =>
                  dispatch({ type: 'SORT_BY', sortBy: value })
                }
                tooltip="RECENT_ASC"
                img={sortIcon('created_at_down')}
              />
            </SearchContentItem>
          </form>
        }
      />
      <InfiniteScroll
        next={fetchMoreData}
        hasMore={state.hasMore}
        loader={<div>Loading...</div>}
        dataLength={state.items.length}
        scrollThreshold={0.8}
      >
        {(state.items as any[]).map((x, i) => (
          <div key={i}>{x.title}</div>
        ))}
      </InfiniteScroll>
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
