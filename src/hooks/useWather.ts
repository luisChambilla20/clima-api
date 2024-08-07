import Axios from "axios";
import { SearchType } from "../types";
import { z } from "zod";
import { useMemo, useState } from "react";

const Wather = z.object({
  lat: z.string(),
  lon: z.string(),
  elevation: z.number(),
  timezone: z.string(),
  units: z.string(),
  current: z.object({
    icon: z.string(),
    icon_num: z.number(),
    summary: z.string(),
    temperature: z.number(),
  }),
  daily: z.object({
    data: z.array(
      z.object({
        day: z.string(),
        weather: z.string(),
        icon: z.number(),
        summary: z.string(),
        all_day: z.object({
          weather: z.string(),
          icon: z.number(),
          temperature: z.number(),
          temperature_min: z.number().optional(),
          temperature_max: z.number().optional(),
          date: z.string().optional(),
          summary: z.string().optional(),
        }),
      })
    ),
  }),
});

export const initialWather = {
  lat: "",
  lon: "",
  elevation: 0,
  timezone: "",
  units: "",
  current: {
    icon: "",
    icon_num: 0,
    summary: "",
    temperature: 0,
  },
  daily: {
    data: [
      {
        day: "",
        weather: "",
        icon: 0,
        summary: "",
        all_day: {
          weather: "",
          icon: 0,
          temperature: 0,
          temperature_min: 0,
          temperature_max: 0,
          date: "",
          summary: "",
        },
      },
    ],
  },
};

export type Wather = z.infer<typeof Wather>;

export const useWather = () => {
  const [whater, setWhater] = useState<Wather>(initialWather);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWather = async (searching: SearchType) => {
    try {
      setIsLoading(true);
      setWhater(initialWather);

      const apiKey = import.meta.env.VITE_API_KEY;

      const { data } = await Axios.get(
        `https://www.meteosource.com/api/v1/free/point?place_id=${searching.city}&sections=all&timezone=UTC&language=en&units=metric&key=${apiKey}`
      );

      const result = Wather.safeParse(data);

      if (result.success) {
        console.log(result.data);
        setWhater(result.data);
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasData = useMemo(() => whater.lat, [whater]);

  return { fetchWather, whater, isLoading, hasData };
};
