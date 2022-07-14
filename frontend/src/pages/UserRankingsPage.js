import { withAuthenticationRequired } from "@auth0/auth0-react";
import RankingsPage from "./RankingsPage"

const UserRankingsPage = (props) => {
    return RankingsPage(props);
}

export default withAuthenticationRequired(UserRankingsPage);