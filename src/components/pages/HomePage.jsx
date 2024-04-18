import TaxisTable from "../displays/TaxisTable.jsx";
import UserCard from "../displays/UserCard.jsx";

const HomePage = () => {
    return (<div style={{ minHeight: 360}}>
            <TaxisTable  />
            <UserCard
                name="Χρυσα Δημητροπούλου"
                email={"test@test.com"}
                password="s3cr3tP@ssw0rd"
        />
    </div>)
}

export default HomePage;
