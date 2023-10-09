import React from "react";
import type {Tables, Views} from "~/database.types";
import {useOutletContext} from "react-router";

const WalkThumbnail = ({walk}: { walk: Tables<'walks'> | Views<'next_walks'> }) => {
  const { env } = useOutletContext<{ env: {[key: string]: string} }>()
  
  const position = `${walk.longitude},${walk.latitude}`;
  return (
    <img
      className="img-thumbnail"
      loading="lazy"
      width={150}
      height={150}
      aria-hidden={true}
      src={`https://api.mapbox.com/styles/v1/${env.MAPBOX_USERNAME}/${env.MAPBOX_STYLE}/static/pin-s(${position})/${position},6,0,0/150x150?access_token=${env.MAPBOX_TOKEN}`}
      alt={`Carte de ${walk.locality}`}
      title={`Carte de ${walk.locality}`}
    />
  );
};

export default WalkThumbnail;
