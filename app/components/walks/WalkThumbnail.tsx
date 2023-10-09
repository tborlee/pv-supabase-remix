import React from "react";
import * as process from "process";
import type {Tables} from "~/database.types";

const mapboxAccessToken = process? process.env.MAPBOX_TOKEN : "";
const mapboxUsername = process ? process.env.MAPBOX_USERNAME : ""
const mapStyle: string | undefined = process ? process.env.MAPBOX_STYLE : "";
const res = "";

const WalkThumbnail = ({walk}: { walk: Tables<'walks'> }) => {
  const position = `${walk.longitude},${walk.latitude}`;
  return (
    <img
      className="img-thumbnail"
      loading="lazy"
      width={150}
      height={150}
      aria-hidden={true}
      src={`https://api.mapbox.com/styles/v1/${mapboxUsername}/${mapStyle}/static/pin-s(${position})/${position},6,0,0/150x150${res}?access_token=${mapboxAccessToken}`}
      alt={`Carte de ${walk.locality}`}
      title={`Carte de ${walk.locality}`}
    />
  );
};

export default WalkThumbnail;
