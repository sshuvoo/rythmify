"use client";

import { playSingleTrack } from "@/actions/play-track";
import { IconPlayerPlay } from "@tabler/icons-react";

export default function TrackPlayButton({ id }: { id: string }) {
   return (
      <div>
         <button onClick={async () => await playSingleTrack(id)}>
            <IconPlayerPlay className="ring-2 ring-green-500 rounded-full text-green-500 w-10 h-10" />
         </button>
      </div>
   );
}
