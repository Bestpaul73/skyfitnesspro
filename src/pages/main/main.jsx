import { Link } from "react-router-dom";

export function Main() {
  return (
    <div>
      <Link to={`/workout/StepAirobic`}>Степ-аэробика</Link>
      <Link to={`/workout/Yoga`}>Йога</Link>
      <Link to={`/workout/Stretching`}>Стретчинг</Link>
      <Link to={`/workout/BodyFlex`}>Бодифлекс</Link>
      <Link to={`/workout/DanceFitness`}>Танцевальный фитнес</Link>
    </div>
  );
}
