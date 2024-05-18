import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {LatLng} from 'react-native-maps';

function useSearchLocation(keyword: string, location: LatLng) {
  const [pageParams, setPageParams] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&y=${location.latitude}&x=${location.longitude}&page=${pageParams}`,
          {
            headers: {
              Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
            },
          },
        );
      } catch (error) {}
    })();
  }, []);
}

export {useSearchLocation};
