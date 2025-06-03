import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetDefaultTournamentsBySearch } from "../../store/tournament/actions/actionsCreators";
import SkeletonCard from "../../components/SkeletonTable/SkeletonCard";
import { PaginationControl } from "react-bootstrap-pagination-control";
import ActiveEventData from "./ActiveEventData";

const ActiveEvents = ({ setDivisionValue, setTournamentId,SetDivisionDetailsBySearch }) => {
  const [page, setPage] = useState(0);

  const { DefaultTournamentData, isLoading } = useSelector(
    (state) => state.tournament
  );

  console.log(DefaultTournamentData);
  const Dispatch = useDispatch();
  const fallbackImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSODrOmJ3WpjTw4bF7GJOhMXehYvpJO8H7PvA&s"; // Default image URL

  useEffect(() => {
    Dispatch(GetDefaultTournamentsBySearch(page));
  }, [Dispatch, page]);
  return (
    <div className="p-2 mt-2">
      <div className="mx-lg-5 search-box rounded">
        <h2 className="text-center text-uppercase py-2 fw-bold Login-btn text-white rounded-top">
          Registered Tournament
        </h2>
        {isLoading ? (
          <SkeletonCard />
        ) : DefaultTournamentData?.data?.length > 0 ? (
          <div className="event-grid">
            {DefaultTournamentData?.data?.map((item, index) => {
              let image = fallbackImage;
              if (item.picture) {
                try {
                  const binaryData = atob(item.picture);
                  const bytes = new Uint8Array(binaryData.length);
                  for (let i = 0; i < binaryData.length; i++) {
                    bytes[i] = binaryData.charCodeAt(i);
                  }
                  const blob = new Blob([bytes], { type: "image/jpeg" });
                  image = URL.createObjectURL(blob);
                } catch (e) {
                  console.error("Error decoding image", e);
                }
              }

              return (
                <ActiveEventData
                SetDivisionDetailsBySearch={SetDivisionDetailsBySearch}
                  key={index}
                  status={item?.status}
                  subtitle={item?.venueName}
                  ranking={item?.name}
                  points={item?.points}
                  img={image}
                  startDate={item?.startDate}
                  endDate={item?.endDate}
                  tournamentId={item?.tournamentId}
                  setTournamentId={setTournamentId}
                  setDivisionValue={setDivisionValue}
                />
              );
            })}
          </div>
        ) : (
          <div className="d-flex justify-content-center flex-grow-1">
            <h2 className="text-center text-danger mt-5">No Records Found.</h2>
          </div>
        )}
      </div>
      <div className="my-4">
        {DefaultTournamentData.totalRecords > 10 && (
          <PaginationControl
            page={page + 1}
            between={3}
            limit={10}
            total={DefaultTournamentData.totalRecords}
            changePage={(page) => setPage(page - 1)}
            ellipsis={1}
          />
        )}
      </div>
    </div>
  );
};

export default ActiveEvents;
