import NewHabit from "../../components/ModalNewHabit";
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/main.json";
import FilterCategory from "../../components/Filter";
import { useState, useEffect, useContext } from "react";
import { useHabit } from "../../providers/Habit";

import {
  CardsList,
  DashboardContainer,
  FiltersAndButtonsWrapper,
  ImageMainCard,
  MainCard,
  NewProfile,
} from "./styles";
import HabitCard from "../../components/HabitCard";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../providers/User";
import Button from "../../components/Button";
/* import InsigniaCard from "../../components/InsigniaCard"; */

const Dashboard = () => {
  const { authenticated, user } = useContext(UserContext);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { habits, habitsAchieved, loadHabits } = useHabit();
  const [myHabits, setMyHabits] = useState(habits);
  const [myHabitsCompleted, setMyHabitsCompleted] = useState();
  const lastCategory = JSON.parse(
    localStorage.getItem(`@Habitare:dashboardLastCategory`)
  );
  const [allHabits, setAllHabits] = useState(
    lastCategory === "displayAll" || lastCategory === null ? true : false
  );

  const [displayHabitsAchieved, setDisplayHabitsAchieved] = useState(false);

  useEffect(() => {
    loadHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const lastCategory = JSON.parse(
      localStorage.getItem(`@Habitare:dashboardLastCategory`)
    );

    lastCategory === "displayAll"
      ? setMyHabits(habits)
      : setMyHabits(habits.filter((habit) => habit.category === lastCategory));
  }, [habits, habitsAchieved]);

  const handleFilter = (category) => {
    if (!displayHabitsAchieved) {
      if (category === "displayAll") {
        setMyHabits(habits);
      } else if (myHabits) {
        const filteredHabits = habits.filter(
          (habit) => habit.category === category
        );
        setMyHabits(filteredHabits);

        setAllHabits(false);
      }
    } else {
      if (category === "displayAll") {
        setMyHabitsCompleted(habitsAchieved);
      } else if (myHabitsCompleted) {
        const filteredHabitsCompleted = habitsAchieved.filter(
          (habit) => habit.category === category
        );
        setMyHabitsCompleted(filteredHabitsCompleted);

        setAllHabits(false);
      }
    }
  };
  const handleDisplayHabitsAchieved = () => {
    setMyHabitsCompleted(habitsAchieved);
    displayHabitsAchieved
      ? setDisplayHabitsAchieved(false)
      : setDisplayHabitsAchieved(true);
  };

  if (!authenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <DashboardContainer>
        <MainCard>
          <h1>Olá, {user.username}!</h1>
          <h3>Qual hábito quer começar hoje?</h3>
          <ImageMainCard>
            <Lottie options={lottieOptions} />
          </ImageMainCard>
        </MainCard>
        <FiltersAndButtonsWrapper>
          <div>
            <FilterCategory handleFilter={handleFilter} page="dashboard" />
          </div>
          <div>
            <Button onClickFunc={handleDisplayHabitsAchieved} whiteSchema>
              {displayHabitsAchieved ? "Não Concluídos" : "Concluídos"}
            </Button>
            <NewHabit />
          </div>
        </FiltersAndButtonsWrapper>

        <CardsList>
          {displayHabitsAchieved ? (
            habitsAchieved.map((habit) => (
              <HabitCard habit={habit} key={habit.id} />
            ))
          ) : habits.length > 0 && !allHabits ? (
            myHabits.map((habit) => <HabitCard habit={habit} key={habit.id} />)
          ) : habits.length > 0 && allHabits ? (
            habits.map((habit) => <HabitCard habit={habit} key={habit.id} />)
          ) : (
            <NewProfile>
              <h1>Queremos te ajudar a praticar novos hábitos!</h1>
              <h2> Comece agora clicando em NOVO HÁBITO</h2>
            </NewProfile>
          )}
        </CardsList>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
