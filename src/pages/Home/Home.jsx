import React, { useEffect } from "react";
import GlobalLayout from "../../layout/GlobalLayout";
import EventData from "../../components/product/EventData";
import { useDispatch, useSelector } from "react-redux";
import { GetDefaultTournamentsBySearch } from "../../store/tournament/actions/actionsCreators";
const Home = () => {
  const { DefaultTournamentData } = useSelector((state) => state.tournament);
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(GetDefaultTournamentsBySearch());
  }, [Dispatch]);
  return (
    <>
      {DefaultTournamentData?.data?.map((item, index) => {
        return (
          <EventData
            title={item?.status}
            key={index}
            subtitle={item?.venueName}
            ranking={item?.name}
            points={item.points}
            img="https://media.bleacherreport.com/image/upload/c_fill,g_faces,w_3800,h_2000,q_95/v1677098974/ajakxjd0xfrxtu8ru7bo.jpg"
            startDate={item.startDate}
            endDate={item.endDate}
          />
        );
      })}

     
    </>
  );
};

export default GlobalLayout(Home);
