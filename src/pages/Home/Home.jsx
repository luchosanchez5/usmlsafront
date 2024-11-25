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
  const dummyData = [
    {
      status: "Ongoing",
      venueName: "Madison Square Garden",
      name: "Basketball Championship",
      points: 120,
      img: "https://via.placeholder.com/150", // Placeholder image URL
      startDate: "2024-11-20",
      endDate: "2024-11-25",
    },
    {
      status: "Upcoming",
      venueName: "Staples Center",
      name: "Football League Finals",
      points: 80,
      img: "https://via.placeholder.com/150", // Placeholder image URL
      startDate: "2024-12-01",
      endDate: "2024-12-05",
    },
    {
      status: "Completed",
      venueName: "Wembley Stadium",
      name: "Cricket World Cup",
      points: 200,
      img: "https://via.placeholder.com/150", // Placeholder image URL
      startDate: "2024-10-10",
      endDate: "2024-10-20",
    },
    {
      status: "Ongoing",
      venueName: "Rod Laver Arena",
      name: "Tennis Grand Slam",
      points: 150,
      img: "https://via.placeholder.com/150", // Placeholder image URL
      startDate: "2024-11-22",
      endDate: "2024-11-30",
    },
    {
      status: "Upcoming",
      venueName: "Yankee Stadium",
      name: "Baseball League Match",
      points: 95,
      img: "https://via.placeholder.com/150", // Placeholder image URL
      startDate: "2024-12-15",
      endDate: "2024-12-20",
    },
  ];
  return (
    <>
      {dummyData?.map((item, index) => {
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
      {/* {DefaultTournamentData?.data?.map((item, index) => {
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
      })} */}

     
    </>
  );
};

export default GlobalLayout(Home);
