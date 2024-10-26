import { Link } from "@remix-run/react";
import UserHeader from "~/components/UserHeader";
import { formatDate } from "~/utils/dates";

export default function Header({ date }: { date?: string }) {
  return (
    <navbar className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand" href="#">
                {" "}
                <img src="/marker.png" alt="ADEPS logo" width="32" height="32"/>
                <span className="fs-4">
            Marches ADEPS
                    {date && !isNaN(Date.parse(date)) ? ` du ${formatDate(date)}` : ""}
          </span>
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                <UserHeader/>
            </div>
        </div>
    </navbar>
  );
}
