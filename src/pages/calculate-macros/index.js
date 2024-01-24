import CalculateMacros from "@/components/CalculateMacros"
import PrivateRoute from "@/Private/PrivateRoute"
const CalculateMacrosPage = () => {
    return (
        <>
        <CalculateMacros />
        </>
    )
}
export default PrivateRoute(CalculateMacrosPage);