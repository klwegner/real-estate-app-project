import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

  export const fetchApi = async (url) => {
    const {data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '2ecf6eb44fmsh7ad802ea85c1f2cp1b03b6jsnc9014fd7bbd8',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }
    })

    return data;
  }

