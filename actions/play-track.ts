"use server";

import { getToken } from "./get-token";

export const playSingleTrack = async (track_id: string) => {
   try {
      const token = await getToken();
      if (token?.access_token) {
         const response = await fetch(
            `${process.env.BASE_API_URL}/me/player/play`,
            {
               method: "PUT",
               headers: {
                  Authorization: `Bearer ${token.access_token}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  uris: [`spotify:track:${track_id}`],
               }),
            }
         );
         const json = await response.json()
         console.log(json);
      }
   } catch (error) {
      console.log(error);
   }
};
