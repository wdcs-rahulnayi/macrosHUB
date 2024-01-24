import BMI from "@/components/BMI"
import PrivateRoute from "@/Private/PrivateRoute"
const BMIPage = () => {
    return (
        <>
        
        <BMI />
        </>
    )
}
export default PrivateRoute(BMIPage);