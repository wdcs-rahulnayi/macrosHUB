import Workout from "@/components/Workout";
import PrivateRoute from "@/Private/PrivateRoute";
const WorkoutPage = () => {
    return (
        <>
        <Workout />
        </>
    )
}
export default PrivateRoute(WorkoutPage);