import React, { useEffect, useState } from "react";
import GlobalLayout from "../../layout/GlobalLayout";
import EventData from "../../components/product/EventData";
import { useDispatch, useSelector } from "react-redux";
import { GetDefaultTournamentsBySearch } from "../../store/tournament/actions/actionsCreators";
import SkeletonCard from "../../components/SkeletonTable/SkeletonCard";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Home = () => {
  const [page, setPage] = useState(0);

  const { DefaultTournamentData, isLoading } = useSelector(
    (state) => state.tournament
  );
  const Dispatch = useDispatch();
  const fallbackImage =
    "https://media.bleacherreport.com/image/upload/c_fill,g_faces,w_3800,h_2000,q_95/v1677098974/ajakxjd0xfrxtu8ru7bo.jpg"; // Default image URL

  useEffect(() => {
    Dispatch(GetDefaultTournamentsBySearch(page));
  }, [Dispatch, page]);
  return (
    <div className="p-2 mt-2">
      <div className="mx-lg-5 search-box rounded">
        <h2 className="text-center text-uppercase py-2 fw-bold Login-btn text-white rounded-top">
          Featured Events
        </h2>
        {isLoading ? (
          <SkeletonCard />
        ) : DefaultTournamentData?.data?.length > 0 ? (
          <div className="event-grid">
            {DefaultTournamentData.data.map((item, index) => {
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
                <EventData
                  key={index}
                  id = ""
                  description = ""
                  title={item?.status}
                  subtitle={item?.venueName}
                  ranking={item?.name}
                  numberOfRegisteredTeams={item.numberOfRegisteredTeams}
                  showNumberOfRegisteredTeams={item.showNumberOfRegisteredTeams}
                  points={item?.points}
                  showWhoIsComing={item.showWhoIsComing}
                  img={image}
                  startDate={item?.startDate}
                  endDate={item?.endDate}
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

export default GlobalLayout(Home);
