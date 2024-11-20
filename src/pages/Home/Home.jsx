import React from 'react'
import GlobalLayout from '../../layout/GlobalLayout'
import EventData from '../../components/product/EventData';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/store';
const Home = () => {
  const tournaments = [
    {
      title: "Global Champions Cup",
      subtitle: "Top teams from around the world compete.",
      ranking: 1,
      points: 'from around the world compete',
      img: "https://www.bettingpros.com/img/Tristen_Newton_Uconn_1470x650-1.jpg/1470x650.webp"
    },
    {
      title: "Eastern Regional Clash",
      subtitle: "Regional rivalry heats up.",
      ranking: 3,
      points: 'from around the world compete',
      img: "https://images-ext-1.discordapp.net/external/WGI7AGZ-WH_KJJj7cOxbYIBtIRO7bxa70B_XnzA8uEc/%3Fve%3D1%26tl%3D1/https/a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2024/07/1294/728/Louisville-Cardinals.jpg?format=webp&width=1111&height=625"
    },
    {
      title: "Southern Cup",
      subtitle: "A showcase of the best southern teams.",
      ranking: 5,
      points: 'from around the world compete',
      img: "https://media.bleacherreport.com/image/upload/c_fill,g_faces,w_3800,h_2000,q_95/v1677098974/ajakxjd0xfrxtu8ru7bo.jpg"
    }
  ];

  return <>
    {tournaments.map((item, index) => {
      return (
        <EventData title={item.title} key={index} subtitle={item.subtitle} ranking={item.ranking} points={item.points} img={item.img} />
      )
    })}

    {/* <EventData title='' img={''}/>
<EventData title='' img={''}/> */}
  </>
}

export default GlobalLayout(Home)