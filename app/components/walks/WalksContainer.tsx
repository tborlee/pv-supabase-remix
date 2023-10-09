import Header from "~/components/Header";
import {ClientOnly} from "~/components/walks/client-only";
import {Map} from "~/components/walks/map.client";
import WalkCard from "~/components/walks/WalkCard";
import React from "react";
import type {Tables, Views} from "~/database.types";
import {formatDate} from "~/utils/dates";
import {Link} from "@remix-run/react";

function findDateIndex(dates: any[] | null, currentDate: string) {
  if (!dates) return -1;
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    if (date.date === currentDate) {
      return i;
    }
  }
  return -1;
}

export default function WalksContainer({ walks, dates }: { walks: Tables<'walks'>[] | Views<'next_walks'>[] | null, dates: Views<'distinct_walk_dates'>[] | null  }) {
  if (walks === null || walks.length === 0) {
    return (
      <>
        <Header/>
        <div>Il n'y a pas de marches planifiées à la date choisie.</div>
      </>
    )
  }

  const currentIndex = findDateIndex(dates, walks[0].date!);
  const previousDate = dates && currentIndex >= 1 ? dates[currentIndex - 1].date : null;
  const nextDate = dates && currentIndex !== -1 && currentIndex < dates?.length - 1 ? dates[currentIndex + 1].date : null;

  return (
    <>
      <Header date={walks[0].date!} />
      <div className="d-flex justify-content-between my-2">
        <div>
          {previousDate && <Link to={`/${previousDate}`} className="btn btn-outline-primary">{formatDate(previousDate)}</Link>}
        </div>
        <div>
          {nextDate && <Link to={`/${nextDate}`} className="btn btn-outline-primary">{formatDate(nextDate)}</Link>}
        </div>
      </div>
      <ClientOnly
        fallback={
          <div className="d-flex justify-content-center align-items-center leaflet-container">
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        {() => <Map walks={walks}/>}
      </ClientOnly>
      {walks.map((walk, i) => <WalkCard key={i} walk={walk}/>)}
    </>
  )
}