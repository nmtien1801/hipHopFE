import { Box } from '@mui/material'
import { MainLoading } from 'components/Common/MainLoading'
import { useEvents } from 'hooks/Events/useEvents'
import { useNewsList } from 'hooks/News/useNewsList'
import { useSelector } from 'react-redux'
import { About } from '../components/About'
import { Events } from '../components/Events'
import { HeroBanner } from '../components/HeroBanner'
import { HotGenreList } from '../components/HotGenre'
import { News } from '../components/News'

export default function Home() {
    const language = useSelector((state) => state.global.language)
    const { data: ruleList, isLoading: ruleLoading } = useEvents({
        page: 1,
        limit: 6,
        statusID: 1,
        LanguagesID: language,
    })
    
    const { data: newsList, isLoading: newsLoading } = useNewsList({
        page: 1,
        limit: 6,
        LanguagesID: language,
    })

    return ruleLoading || newsLoading ? (
      <MainLoading />
    ) : (
      <Box>
        <Box
          sx={{
            background:
              'linear-gradient(180deg, #fffbca 35%, rgba(255, 251, 202, 0) 100%);',
          }}
        >
          <HeroBanner ruleList={ruleList} />
          <About />
        </Box>

        <Events eventList={ruleList} />
        <HotGenreList
          ruleList={
            (Array.isArray(ruleList) &&
              ruleList.length > 0 &&
              ruleList.filter((item) => item.IsHot === true)) ||
            []
          }
        />
        <News newsList={newsList} />
      </Box>
    )
}
